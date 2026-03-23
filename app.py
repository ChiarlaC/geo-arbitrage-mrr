import streamlit as st
import pandas as pd

st.set_page_config(
    page_title="Geo-Arbitrage Dashboard",
    page_icon=None,
    layout="wide",
    initial_sidebar_state="collapsed",
)

st.markdown('<meta name="google-site-verification" content="GdGpc5s9o4IzzfSKYzqh3aaUIq1IJ4xxyrJqAdM-5tY" />', unsafe_allow_html=True)

st.markdown("""
<style>
    /* Reset and base */
    html, body, [data-testid="stAppViewContainer"], [data-testid="stApp"] {
        background-color: #f5f5f5;
        color: #111111;
        font-family: 'Courier New', Courier, monospace;
    }
    [data-testid="stHeader"] { background-color: #f5f5f5; }
    [data-testid="stSidebar"] { display: none; }
    .block-container { padding: 2rem 3rem; max-width: 1100px; }

    /* Typography */
    h1 { font-size: 1.4rem; font-weight: 700; letter-spacing: 0.08em;
         text-transform: uppercase; border-bottom: 2px solid #111; padding-bottom: 0.4rem; }
    h2 { font-size: 1rem; font-weight: 700; letter-spacing: 0.06em;
         text-transform: uppercase; color: #333; margin-top: 2rem; }
    p, li { font-size: 0.85rem; color: #333; line-height: 1.7; }

    /* Table */
    .stDataFrame { border: 1px solid #ccc; }
    .stDataFrame table { border-collapse: collapse; width: 100%; font-size: 0.82rem; }
    .stDataFrame th { background-color: #111 !important; color: #f5f5f5 !important;
                      text-transform: uppercase; letter-spacing: 0.05em;
                      font-weight: 700; padding: 0.5rem 0.8rem; border: none; }
    .stDataFrame td { padding: 0.4rem 0.8rem; border-bottom: 1px solid #ddd;
                      color: #111; background-color: #fff; }
    .stDataFrame tr:hover td { background-color: #ebebeb; }

    /* Metric strip */
    .metric-strip { display: flex; gap: 1.5rem; margin: 1.2rem 0; flex-wrap: wrap; }
    .metric-box { background: #fff; border: 1px solid #ccc; padding: 0.7rem 1.2rem;
                  flex: 1; min-width: 140px; }
    .metric-label { font-size: 0.65rem; text-transform: uppercase;
                    letter-spacing: 0.08em; color: #666; }
    .metric-value { font-size: 1.3rem; font-weight: 700; color: #111; }

    /* Guide section */
    .guide-section { background: #fff; border: 1px solid #ccc;
                     padding: 1.4rem 1.8rem; margin-top: 2rem; }
    .guide-title { font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
                   letter-spacing: 0.1em; color: #111; border-bottom: 1px solid #ccc;
                   padding-bottom: 0.5rem; margin-bottom: 1rem; }
    .guide-step { display: flex; gap: 1rem; margin-bottom: 0.9rem;
                  align-items: flex-start; }
    .step-num { font-size: 0.7rem; font-weight: 700; background: #111; color: #f5f5f5;
                min-width: 22px; height: 22px; display: flex; align-items: center;
                justify-content: center; flex-shrink: 0; }
    .step-text { font-size: 0.82rem; color: #333; line-height: 1.6; }
    .step-text strong { color: #111; }

    /* CTA button */
    .cta-wrapper { margin-top: 1.4rem; padding-top: 1rem; border-top: 1px solid #ccc; }
    .cta-link { display: inline-block; background: #111; color: #f5f5f5 !important;
                text-decoration: none; font-size: 0.8rem; font-weight: 700;
                letter-spacing: 0.08em; text-transform: uppercase;
                padding: 0.6rem 1.6rem; }
    .cta-link:hover { background: #333; }
    .cta-sub { font-size: 0.7rem; color: #888; margin-top: 0.5rem; }

    /* Savings highlight */
    .savings-high { color: #1a7a1a; font-weight: 700; }
    .savings-mid  { color: #555; font-weight: 600; }

    /* Divider */
    hr { border: none; border-top: 1px solid #ddd; margin: 1.5rem 0; }

    /* Hide streamlit chrome */
    #MainMenu, footer, [data-testid="stToolbar"] { display: none; }
</style>
""", unsafe_allow_html=True)


# ── Data Engine ──────────────────────────────────────────────────────────────
# Reads from data.csv produced by data_engine.py.
# Falls back to running the pipeline inline if the file is missing.

import os
from data_engine import run as _run_pipeline

DATA_FILE = "data.csv"

@st.cache_data(ttl=3600)   # refresh cache at most once per hour
def load_data() -> pd.DataFrame:
    if not os.path.exists(DATA_FILE):
        st.toast("data.csv not found — running pipeline now…", icon="⚙")
        return _run_pipeline()
    # Skip the comment header line written by data_engine.py
    return pd.read_csv(DATA_FILE, comment="#")

df = load_data()

display_df = df[["Service", "Country", "Plan", "Local Price", "USD Price", "Savings vs US (%)"]].copy()
display_df["USD Price"] = display_df["USD Price"].map("${:.2f}".format)
display_df["Savings vs US (%)"] = display_df["Savings vs US (%)"].map(
    lambda x: "—" if x == 0 else f"{x:.1f}%"
)


# ── Header ───────────────────────────────────────────────────────────────────

st.markdown("# Digital Subscription Geo-Arbitrage Dashboard")
st.markdown(
    "<p style='font-size:0.8rem;color:#666;margin-top:-0.8rem'>"
    "Real-time pricing intelligence across global markets &nbsp;·&nbsp; "
    "Live exchange rates</p>",
    unsafe_allow_html=True,
)

# Summary metrics
best_saving = df[df["Savings vs US (%)"] > 0]["Savings vs US (%)"].max()
avg_saving  = df[df["Savings vs US (%)"] > 0]["Savings vs US (%)"].mean()
cheapest_usd = df["USD Price"].min()

st.markdown(f"""
<div class="metric-strip">
  <div class="metric-box">
    <div class="metric-label">Services Tracked</div>
    <div class="metric-value">3</div>
  </div>
  <div class="metric-box">
    <div class="metric-label">Regions Covered</div>
    <div class="metric-value">4</div>
  </div>
  <div class="metric-box">
    <div class="metric-label">Max Saving Found</div>
    <div class="metric-value">{best_saving:.1f}%</div>
  </div>
  <div class="metric-box">
    <div class="metric-label">Avg Saving (ex-US)</div>
    <div class="metric-value">{avg_saving:.1f}%</div>
  </div>
  <div class="metric-box">
    <div class="metric-label">Lowest USD Price</div>
    <div class="metric-value">${cheapest_usd:.2f}/mo</div>
  </div>
</div>
""", unsafe_allow_html=True)


# ── Detailed Guides Navigation ───────────────────────────────────────────────

st.markdown("## Detailed Price Guides")

SERVICES = {
    "Netflix":          "netflix",
    "YouTube Premium":  "youtube_premium",
    "Spotify":          "spotify",
    "Disney+":          "disney_plus",
    "Tidal":            "tidal",
    "Canva Pro":        "canva_pro",
}
COUNTRIES = ["Turkey", "Argentina", "Nigeria", "Egypt", "Pakistan", "Philippines", "India"]

for service_label, service_slug in SERVICES.items():
    st.markdown(f"**{service_label}**")
    cols = st.columns(len(COUNTRIES))
    for col, country in zip(cols, COUNTRIES):
        country_slug = country.lower()
        page_path = f"/{service_slug}_{country_slug}"
        col.markdown(
            f"<a href='{page_path}' target='_self' style='"
            "display:inline-block;padding:0.35rem 0.7rem;"
            "background:#111;color:#f5f5f5;font-size:0.72rem;"
            "text-decoration:none;letter-spacing:0.04em;"
            "font-family:Courier New,monospace;margin-bottom:0.3rem'>"
            f"{country}</a>",
            unsafe_allow_html=True,
        )
    st.markdown("<div style='margin-bottom:1rem'></div>", unsafe_allow_html=True)


# ── Data Table ───────────────────────────────────────────────────────────────

st.markdown("## Pricing Matrix")

col_cfg = {
    "Service":             st.column_config.TextColumn("Service",    width="small"),
    "Country":             st.column_config.TextColumn("Region",     width="medium"),
    "Plan":                st.column_config.TextColumn("Plan",       width="small"),
    "Local Price":         st.column_config.TextColumn("Local Price",width="small"),
    "USD Price":           st.column_config.TextColumn("USD / mo",   width="small"),
    "Savings vs US (%)":   st.column_config.TextColumn("Saving",     width="small"),
}

st.dataframe(
    display_df,
    use_container_width=True,
    hide_index=True,
    column_config=col_cfg,
)

st.markdown(
    "<p style='font-size:0.7rem;color:#999;margin-top:0.3rem'>"
    "Exchange rates approximate. Click column headers to sort.</p>",
    unsafe_allow_html=True,
)


# ── Monetization Node ────────────────────────────────────────────────────────

st.markdown("""
<div class="guide-section">
  <div class="guide-title">5-Minute Cross-Border Purchase Guide</div>

  <div class="guide-step">
    <div class="step-num">1</div>
    <div class="step-text">
      <strong>Acquire a premium VPN with server presence in your target country.</strong>
      Free or low-tier VPNs are detected and blocked by major streaming platforms.
      A paid VPN with residential or obfuscated IPs is non-negotiable for reliable access.
    </div>
  </div>

  <div class="guide-step">
    <div class="step-num">2</div>
    <div class="step-text">
      <strong>Connect to a server in the target region before visiting the service's site.</strong>
      Your IP address must match the billing country at the point of account creation
      and each subsequent payment cycle. Use an incognito window to avoid cached data.
    </div>
  </div>

  <div class="guide-step">
    <div class="step-num">3</div>
    <div class="step-text">
      <strong>Use a payment method that clears without currency flags.</strong>
      Wise (formerly TransferWise) virtual cards or a local-currency prepaid card
      are the most reliable options. Standard US/EU credit cards may trigger
      geo-mismatch declines.
    </div>
  </div>

  <div class="cta-wrapper">
    <a class="cta-link" href="https://example.com/vpn-affiliate" target="_blank">
      Get a Compatible VPN &rarr;
    </a>
    <div class="cta-sub">
      Affiliate link &nbsp;·&nbsp; We may earn a commission at no cost to you
    </div>
  </div>
</div>
""", unsafe_allow_html=True)


# ── Footer ───────────────────────────────────────────────────────────────────

st.markdown("<hr>", unsafe_allow_html=True)
st.markdown(
    "<p style='font-size:0.7rem;color:#aaa;text-align:center'>"
    "For informational purposes only. Terms of service compliance is your responsibility."
    "</p>",
    unsafe_allow_html=True,
)
