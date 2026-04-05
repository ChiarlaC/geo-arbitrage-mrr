"""
update_data.py
--------------
Automated data pipeline for Subpricing Next.js app.
Fetches exchange rates and updates public/data.json

Usage:
  python scripts/update_data.py
"""

import json
import requests
from datetime import datetime
from pathlib import Path

# Configuration
EXCHANGE_RATE_URL = "https://open.er-api.com/v6/latest/USD"
REQUEST_TIMEOUT = 5
OUTPUT_FILE = Path(__file__).parent.parent / "public" / "data.json"

# Fallback exchange rates (updated 2026-Q2)
FALLBACK_RATES = {
    "TRY": 32.50,
    "ARS": 890.00,
    "NGN": 1520.00,
    "EGP": 48.50,
    "PKR": 278.00,
    "PHP": 56.00,
    "INR": 83.50,
    "BRL": 5.20,
    "PLN": 4.10,
    "COP": 4100.00,
    "USD": 1.00,
}

# Baseline prices (local currency)
SUBSCRIPTION_PRICES = {
    "Netflix": {
        "US": (15.49, "$", "Standard HD"),
        "Turkey": (149.99, "₺", "Standard HD"),
        "Argentina": (1199.00, "ARS", "Standard HD"),
        "Nigeria": (2900.00, "₦", "Standard HD"),
        "Egypt": (100.00, "EGP", "Standard HD"),
        "Pakistan": (250.00, "PKR", "Standard HD"),
        "Philippines": (149.00, "₱", "Standard HD"),
        "India": (199.00, "₹", "Mobile"),
        "Brazil": (32.90, "R$", "Standard"),
        "Poland": (43.00, "zł", "Standard"),
        "Colombia": (16900.00, "COP", "Standard"),
    },
    "Spotify": {
        "US": (11.99, "$", "Individual"),
        "Turkey": (59.99, "₺", "Individual"),
        "Argentina": (750.00, "ARS", "Individual"),
        "Nigeria": (900.00, "₦", "Individual"),
        "Egypt": (25.00, "EGP", "Individual"),
        "Pakistan": (159.00, "PKR", "Individual"),
        "Philippines": (129.00, "₱", "Individual"),
        "India": (119.00, "₹", "Individual"),
        "Brazil": (21.90, "R$", "Individual"),
        "Poland": (19.99, "zł", "Individual"),
        "Colombia": (14900.00, "COP", "Individual"),
    },
    "YouTube Premium": {
        "US": (13.99, "$", "Individual"),
        "Turkey": (47.99, "₺", "Individual"),
        "Argentina": (549.00, "ARS", "Individual"),
        "Nigeria": (1490.00, "₦", "Individual"),
        "Egypt": (39.99, "EGP", "Individual"),
        "Pakistan": (219.00, "PKR", "Individual"),
        "Philippines": (99.00, "₱", "Individual"),
        "India": (89.00, "₹", "Individual"),
        "Brazil": (20.90, "R$", "Individual"),
        "Poland": (23.99, "zł", "Individual"),
        "Colombia": (13900.00, "COP", "Individual"),
    },
    "Disney+": {
        "US": (13.99, "$", "Standard"),
        "Turkey": (89.99, "₺", "Standard"),
        "Argentina": (599.00, "ARS", "Standard"),
        "Nigeria": (2100.00, "₦", "Standard"),
        "Egypt": (59.00, "EGP", "Standard"),
        "Pakistan": (300.00, "PKR", "Standard"),
        "Philippines": (149.00, "₱", "Standard"),
        "India": (299.00, "₹", "Standard"),
        "Brazil": (33.90, "R$", "Standard"),
        "Poland": (37.99, "zł", "Standard"),
        "Colombia": (18900.00, "COP", "Standard"),
    },
    "HBO Max": {
        "US": (15.99, "$", "With Ads"),
        "Turkey": (119.99, "₺", "Standard"),
        "Argentina": (999.00, "ARS", "Standard"),
        "Brazil": (39.90, "R$", "Standard"),
        "Poland": (29.99, "zł", "Standard"),
        "Colombia": (21900.00, "COP", "Standard"),
    },
    "Apple Music": {
        "US": (10.99, "$", "Individual"),
        "Turkey": (34.99, "₺", "Individual"),
        "Argentina": (599.00, "ARS", "Individual"),
        "India": (99.00, "₹", "Individual"),
        "Brazil": (21.90, "R$", "Individual"),
        "Poland": (19.99, "zł", "Individual"),
    }
}

# Country to currency mapping
COUNTRY_CURRENCY = {
    "US": "USD",
    "Turkey": "TRY",
    "Argentina": "ARS",
    "Nigeria": "NGN",
    "Egypt": "EGP",
    "Pakistan": "PKR",
    "Philippines": "PHP",
    "India": "INR",
    "Brazil": "BRL",
    "Poland": "PLN",
    "Colombia": "COP",
}


def fetch_exchange_rates():
    """Fetch live exchange rates, fallback on error"""
    try:
        print(f"Fetching exchange rates from {EXCHANGE_RATE_URL}")
        resp = requests.get(EXCHANGE_RATE_URL, timeout=REQUEST_TIMEOUT)
        resp.raise_for_status()

        data = resp.json()
        if data.get("result") == "success":
            rates = data["rates"]
            print(f"[OK] Fetched live rates for {len(rates)} currencies")
            return rates
    except Exception as e:
        print(f"[WARN] Failed to fetch rates: {e}")

    print("→ Using fallback exchange rates")
    return FALLBACK_RATES


def calculate_usd_price(local_price, currency_code, rates):
    """Convert local currency to USD"""
    rate = rates.get(currency_code, FALLBACK_RATES.get(currency_code, 1.0))
    return round(local_price / rate, 2)


def calculate_savings(usd_price, us_baseline):
    """Calculate savings percentage vs US price"""
    if us_baseline == 0:
        return 0
    savings = ((us_baseline - usd_price) / us_baseline) * 100
    return round(max(0, savings), 0)


def generate_data():
    """Generate subscription data with live exchange rates"""
    rates = fetch_exchange_rates()
    output_data = []

    for service, countries in SUBSCRIPTION_PRICES.items():
        # Get US baseline for savings calculation
        us_price = countries.get("US", (0, "$", ""))[0]
        us_baseline_usd = us_price

        for country, (local_price, symbol, plan) in countries.items():
            currency = COUNTRY_CURRENCY.get(country, "USD")
            usd_price = calculate_usd_price(local_price, currency, rates)
            savings = calculate_savings(usd_price, us_baseline_usd)

            output_data.append({
                "service": service,
                "country": country,
                "plan": plan,
                "localPrice": local_price,
                "localCurrency": currency,
                "priceUSD": usd_price,
                "savingsPercent": savings,
                "symbol": symbol
            })

    return output_data


def main():
    """Main execution"""
    print("=" * 60)
    print("Subpricing Data Update Pipeline")
    print("=" * 60)

    # Generate data
    data = generate_data()

    # Add metadata
    output = {
        "lastUpdated": datetime.utcnow().isoformat() + "Z",
        "subscriptions": data
    }

    # Write to file
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    print(f"\n[OK] Generated {len(data)} subscription records")
    print(f"[OK] Written to {OUTPUT_FILE}")
    print(f"[OK] Last updated: {output['lastUpdated']}")
    print("\n" + "=" * 60)


if __name__ == "__main__":
    main()
