"""
data_engine.py
--------------
Automated data pipeline for the Geo-Arbitrage Dashboard.

Execution flow:
  1. Fetch real-time USD exchange rates from open.er-api.com
     └─ Fallback: hardcoded rates if API is unreachable
  2. Attempt to scrape live subscription prices per region
     └─ Fallback: hardcoded baseline prices if scraping is blocked/fails
  3. Calculate Converted_USD_Price and Saving_Percentage
  4. Export clean DataFrame to data.csv

Run standalone:
  python data_engine.py
"""

import requests
import pandas as pd
from bs4 import BeautifulSoup
from datetime import datetime, timezone
import logging
import sys

# ── Logging ──────────────────────────────────────────────────────────────────

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-7s  %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger(__name__)

# ── Constants ─────────────────────────────────────────────────────────────────

EXCHANGE_RATE_URL = "https://open.er-api.com/v6/latest/USD"
REQUEST_TIMEOUT   = 8          # seconds before giving up on any HTTP call
OUTPUT_FILE       = "data.csv"

# Realistic browser User-Agent to reduce bot detection probability
HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "en-US,en;q=0.9",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
}

# ── Fallback Exchange Rates (USD → local currency) ───────────────────────────
# Updated: 2025-Q2.  Refresh manually if rates drift significantly.

FALLBACK_RATES = {
    "TRY": 32.50,   # Turkish lira
    "ARS": 890.00,  # Argentine peso
    "NGN": 1520.00, # Nigerian naira
    "USD": 1.00,
}

# ── Fallback Subscription Prices (local currency) ────────────────────────────
# Structure: FALLBACK_PRICES[service][country_key] = (local_price_float, display_symbol, plan_name)

FALLBACK_PRICES = {
    "Netflix": {
        "US (Baseline)": (15.49,   "$",   "Standard HD"),
        "Turkey":         (149.99,  "₺",   "Standard HD"),
        "Argentina":      (1199.00, "ARS", "Standard HD"),
        "Nigeria":        (2900.00, "₦",   "Standard HD"),
    },
    "YouTube Premium": {
        "US (Baseline)": (13.99,  "$",   "Individual"),
        "Turkey":         (47.99,  "₺",   "Individual"),
        "Argentina":      (549.00, "ARS", "Individual"),
        "Nigeria":        (1490.00,"₦",   "Individual"),
    },
    "Spotify": {
        "US (Baseline)": (11.99,  "$",   "Individual"),
        "Turkey":         (34.99,  "₺",   "Individual"),
        "Argentina":      (399.00, "ARS", "Individual"),
        "Nigeria":        (900.00, "₦",   "Individual"),
    },
}

# Map country names → ISO currency codes (for exchange rate lookup)
COUNTRY_CURRENCY = {
    "US (Baseline)": "USD",
    "Turkey":         "TRY",
    "Argentina":      "ARS",
    "Nigeria":        "NGN",
}


# ── Step 1: Exchange Rates ────────────────────────────────────────────────────

def fetch_exchange_rates() -> dict:
    """
    Fetch live USD exchange rates from open.er-api.com.
    Returns a dict: { 'TRY': 32.5, 'ARS': 890.0, ... }
    Falls back to FALLBACK_RATES on any error.
    """
    try:
        log.info("Fetching exchange rates from %s", EXCHANGE_RATE_URL)
        resp = requests.get(EXCHANGE_RATE_URL, timeout=REQUEST_TIMEOUT, headers=HEADERS)
        resp.raise_for_status()
        payload = resp.json()

        if payload.get("result") != "success":
            raise ValueError(f"API returned non-success result: {payload.get('result')}")

        rates = payload["rates"]
        needed = {k: rates[k] for k in FALLBACK_RATES if k in rates}
        log.info("Exchange rates fetched live: %s", needed)
        return needed

    except requests.exceptions.Timeout:
        log.warning("Exchange rate API timed out — using fallback rates")
    except requests.exceptions.ConnectionError:
        log.warning("Exchange rate API unreachable — using fallback rates")
    except requests.exceptions.HTTPError as e:
        log.warning("Exchange rate API HTTP error %s — using fallback rates", e)
    except Exception as e:
        log.warning("Unexpected error fetching rates (%s) — using fallback rates", e)

    return FALLBACK_RATES.copy()


# ── Step 2: Subscription Price Scraper ───────────────────────────────────────
# NOTE: Major streaming platforms (Netflix, Spotify, YouTube) actively block
#       automated scrapers with CAPTCHAs, geo-redirects, and JS-rendered pages.
#       The scrape functions below make a best-effort attempt; all fall through
#       to fallback data on any failure — the pipeline never crashes.

def _scrape_netflix_prices() -> dict | None:
    """
    Attempt to parse Netflix help page for pricing hints.
    Returns dict matching FALLBACK_PRICES['Netflix'] structure, or None on failure.
    """
    # Netflix pricing pages are JS-rendered and geo-locked.
    # A raw requests fetch will return the marketing shell, not prices.
    # This is intentionally a best-effort pass; fallback is always available.
    try:
        url = "https://help.netflix.com/en/node/24926"
        log.info("Scraping Netflix pricing page...")
        resp = requests.get(url, headers=HEADERS, timeout=REQUEST_TIMEOUT)

        if resp.status_code == 403:
            log.warning("Netflix scrape blocked (403) — using fallback")
            return None
        if resp.status_code != 200:
            log.warning("Netflix scrape returned HTTP %s — using fallback", resp.status_code)
            return None

        soup = BeautifulSoup(resp.text, "html.parser")
        # Look for price pattern in page text (heuristic — breaks if page layout changes)
        text = soup.get_text(separator=" ")
        if "$15" not in text and "$13" not in text:
            log.warning("Netflix page didn't contain expected price tokens — using fallback")
            return None

        # Page is US-only from this URL; can't extract multi-region data reliably.
        # Return None to let fallback fill in all regions.
        log.info("Netflix page fetched but multi-region data not parseable — using fallback")
        return None

    except requests.exceptions.Timeout:
        log.warning("Netflix scrape timed out — using fallback")
    except requests.exceptions.ConnectionError:
        log.warning("Netflix scrape connection error — using fallback")
    except Exception as e:
        log.warning("Netflix scrape unexpected error (%s) — using fallback", e)

    return None


def _scrape_spotify_prices() -> dict | None:
    """
    Attempt to fetch Spotify pricing page.
    Returns structured dict or None on failure.
    """
    try:
        url = "https://www.spotify.com/us/premium/"
        log.info("Scraping Spotify pricing page...")
        resp = requests.get(url, headers=HEADERS, timeout=REQUEST_TIMEOUT)

        if resp.status_code in (403, 429):
            log.warning("Spotify scrape blocked (HTTP %s) — using fallback", resp.status_code)
            return None
        if resp.status_code != 200:
            log.warning("Spotify scrape returned HTTP %s — using fallback", resp.status_code)
            return None

        soup = BeautifulSoup(resp.text, "html.parser")
        # Spotify renders prices via React; static HTML rarely contains them.
        text = soup.get_text(separator=" ")
        if "$11.99" not in text and "$9.99" not in text:
            log.info("Spotify prices not found in static HTML — using fallback")
            return None

        log.info("Spotify page fetched but multi-region extraction not reliable — using fallback")
        return None

    except requests.exceptions.Timeout:
        log.warning("Spotify scrape timed out — using fallback")
    except requests.exceptions.ConnectionError:
        log.warning("Spotify scrape connection error — using fallback")
    except Exception as e:
        log.warning("Spotify scrape unexpected error (%s) — using fallback", e)

    return None


def _scrape_youtube_prices() -> dict | None:
    """
    Attempt to fetch YouTube Premium pricing page.
    Returns structured dict or None on failure.
    """
    try:
        url = "https://www.youtube.com/premium"
        log.info("Scraping YouTube Premium pricing page...")
        resp = requests.get(url, headers=HEADERS, timeout=REQUEST_TIMEOUT)

        if resp.status_code in (403, 429):
            log.warning("YouTube scrape blocked (HTTP %s) — using fallback", resp.status_code)
            return None
        if resp.status_code != 200:
            log.warning("YouTube scrape returned HTTP %s — using fallback", resp.status_code)
            return None

        soup = BeautifulSoup(resp.text, "html.parser")
        text = soup.get_text(separator=" ")
        if "$13.99" not in text and "$14" not in text:
            log.info("YouTube prices not found in static HTML — using fallback")
            return None

        log.info("YouTube page fetched but multi-region extraction not reliable — using fallback")
        return None

    except requests.exceptions.Timeout:
        log.warning("YouTube scrape timed out — using fallback")
    except requests.exceptions.ConnectionError:
        log.warning("YouTube scrape connection error — using fallback")
    except Exception as e:
        log.warning("YouTube scrape unexpected error (%s) — using fallback", e)

    return None


def fetch_subscription_prices() -> dict:
    """
    Orchestrate scraping for all services.
    Returns a prices dict identical in structure to FALLBACK_PRICES,
    using scraped data where available and fallback data everywhere else.
    """
    scrapers = {
        "Netflix":         _scrape_netflix_prices,
        "YouTube Premium": _scrape_youtube_prices,
        "Spotify":         _scrape_spotify_prices,
    }

    prices = {}
    for service, scraper in scrapers.items():
        result = scraper()
        if result is not None:
            log.info("%s: using scraped prices", service)
            prices[service] = result
        else:
            log.info("%s: using fallback prices", service)
            prices[service] = FALLBACK_PRICES[service]

    return prices


# ── Step 3: Data Processing ───────────────────────────────────────────────────

def build_dataframe(prices: dict, rates: dict) -> pd.DataFrame:
    """
    Combine prices + exchange rates into a clean DataFrame.

    Columns produced (matching app.py display schema):
      Service | Country | Plan | Local Price | USD Price | Savings vs US (%)
    """
    rows = []

    for service, regions in prices.items():
        # Determine the US baseline USD price for this service
        us_local, us_symbol, us_plan = regions["US (Baseline)"]
        us_usd = us_local  # US price IS the USD price (rate = 1.0)

        for country, (local_price, symbol, plan) in regions.items():
            currency = COUNTRY_CURRENCY[country]
            rate     = rates.get(currency, FALLBACK_RATES.get(currency, 1.0))

            # Convert local currency → USD
            usd_price = local_price / rate

            # Savings relative to US baseline (US row = 0.0%)
            if country == "US (Baseline)":
                saving_pct = 0.0
            else:
                saving_pct = round((1 - usd_price / us_usd) * 100, 1)

            # Format local price string with currency symbol
            if symbol == "$":
                local_str = f"${local_price:.2f}"
            elif symbol in ("ARS", "NGN"):
                # For named currencies, abbreviate + no decimals on large numbers
                local_str = f"{symbol} {local_price:,.0f}"
            else:
                local_str = f"{symbol}{local_price:.2f}"

            rows.append({
                "Service":          service,
                "Country":          country,
                "Plan":             plan,
                "Local Price":      local_str,
                "USD Price":        round(usd_price, 2),
                "Savings vs US (%)": saving_pct,
            })

    df = pd.DataFrame(rows, columns=[
        "Service", "Country", "Plan", "Local Price", "USD Price", "Savings vs US (%)"
    ])
    return df


# ── Step 4: Export ────────────────────────────────────────────────────────────

def export_csv(df: pd.DataFrame, path: str = OUTPUT_FILE) -> None:
    """Write the DataFrame to CSV, appending a metadata comment row at the top."""
    timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

    # Write a comment header, then the data
    with open(path, "w", encoding="utf-8", newline="") as f:
        f.write(f"# Generated by data_engine.py at {timestamp}\n")
        df.to_csv(f, index=False)

    log.info("Exported %d rows → %s", len(df), path)


# ── Main ──────────────────────────────────────────────────────────────────────

def run() -> pd.DataFrame:
    """Full pipeline: fetch → process → export. Returns the final DataFrame."""
    log.info("=== data_engine.py starting ===")

    rates  = fetch_exchange_rates()
    prices = fetch_subscription_prices()
    df     = build_dataframe(prices, rates)
    export_csv(df)

    log.info("=== Pipeline complete. %d rows written to %s ===", len(df), OUTPUT_FILE)
    return df


if __name__ == "__main__":
    df = run()
    print("\n" + df.to_string(index=False).encode(sys.stdout.encoding, errors="replace").decode(sys.stdout.encoding))
    sys.exit(0)
