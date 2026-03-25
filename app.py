import streamlit as st
import pandas as pd

NORDVPN_URL = "https://go.nordvpn.net/aff_c?offer_id=15&aff_id=143797&url_id=902"
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
    .guide-section { margin-top: 2rem; }
    .guide-title { font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
                   letter-spacing: 0.1em; color: #111;
                   padding-bottom: 0.5rem; margin-bottom: 1rem; }
    .steps-row { display: flex; gap: 0; }
    .step-card { flex: 1; border: 1px solid #ccc; padding: 1.2rem 1.4rem; background: #fff; }
    .step-card + .step-card { border-left: none; }
    .step-num { font-size: 0.65rem; font-weight: 700; background: #111; color: #f5f5f5;
                display: inline-flex; align-items: center; justify-content: center;
                width: 20px; height: 20px; margin-bottom: 0.6rem; }
    .step-title { font-size: 0.78rem; font-weight: 700; color: #111;
                  margin-bottom: 0.3rem; line-height: 1.35; }
    .step-body { font-size: 0.72rem; color: #666; line-height: 1.55; }

    /* CTA button */
    .cta-wrapper { background: #111; padding: 1.6rem 2rem; margin-top: 1.4rem; }
    .cta-eyebrow { font-size: 0.6rem; text-transform: uppercase;
                   letter-spacing: 0.12em; color: #aaa; margin-bottom: 0.4rem; }
    .cta-headline { font-size: 1.05rem; font-weight: 700; color: #fff;
                    margin-bottom: 0.35rem; line-height: 1.35; }
    .cta-body { font-size: 0.8rem; color: #ccc; margin-bottom: 0.25rem; }
    .cta-social { font-size: 0.72rem; color: #888; margin-bottom: 1rem; }
    .cta-link { display: inline-block; background: #e63000; color: #fff !important;
                text-decoration: none; font-size: 0.88rem; font-weight: 700;
                letter-spacing: 0.05em; text-transform: uppercase;
                padding: 0.75rem 2.2rem; }
    .cta-link:hover { background: #ff3a00; }
    .cta-sub { font-size: 0.62rem; color: #666; margin-top: 0.9rem; }

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

# Leaderboard banner
import base64 as _b64
_lb_path = os.path.join(os.path.abspath(os.path.dirname(__file__) or "."), "static", "nordvpn-banner-970x90.png")
with open(_lb_path, "rb") as _f:
    _lb_b64 = _b64.b64encode(_f.read()).decode()
st.markdown(
    f'<div style="text-align:center;margin:0 0 0.8rem">'
    f'<a href="{NORDVPN_URL}" target="_blank" rel="noopener">'
    f'<img src="data:image/png;base64,{_lb_b64}" style="width:100%;cursor:pointer" alt="NordVPN Special Offer">'
    f'</a></div>',
    unsafe_allow_html=True,
)

st.markdown("# Digital Subscription Geo-Arbitrage Dashboard")

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


# ── Service Navigation (Pure CSS / HTML) ──────────────────────────────────────

SERVICES = {
    "Netflix":         "netflix",
    "YouTube Premium": "youtube_premium",
    "Spotify":         "spotify",
}

_nav_countries = [c for c in df["Country"].unique() if c != "US (Baseline)"]

def _build_dropdown(service_name, slug):
    links = "".join(
        f'<a href="/{slug}_{c.lower().replace(" ", "_")}" target="_self">{c}</a>'
        for c in _nav_countries
    )
    return f'<div class="nav-dropdown"><span>{service_name} ▾</span><div class="nav-dropdown-content">{links}</div></div>'

nav_html = f"""
<style>
  .nav-bar-container {{
    display: flex; gap: 2rem; align-items: center;
    margin: 0.8rem 0 1.4rem;
    font-family: 'Courier New', Courier, monospace;
  }}
  .nav-dropdown {{
    position: relative;
    display: inline-block;
    font-size: 0.85rem; font-weight: 700;
    letter-spacing: 0.05em; text-transform: uppercase;
    color: #111; cursor: pointer;
  }}
  .nav-dropdown:hover > span {{ text-decoration: underline; }}
  .nav-dropdown-content {{
    display: none; position: absolute; top: 100%; left: 0;
    background-color: #f5f5f5; min-width: 140px;
    border: 1px solid #ccc; box-shadow: 0px 4px 6px rgba(0,0,0,0.1);
    z-index: 999;
  }}
  .nav-dropdown:hover .nav-dropdown-content {{ display: block; }}
  .nav-dropdown-content a {{
    color: #111; padding: 10px 14px; text-decoration: none;
    display: block; font-size: 0.8rem;
  }}
  .nav-dropdown-content a:hover {{ background-color: #ebebeb; }}
  .nav-feedback {{
    margin-left: auto; font-size: 0.72rem; color: #999;
    text-decoration: none; font-family: 'Courier New', monospace;
    letter-spacing: 0.03em;
  }}
  .nav-feedback:hover {{ color: #111; }}
</style>

<div class="nav-bar-container">
  {_build_dropdown("Netflix", "netflix")}
  {_build_dropdown("YouTube Premium", "youtube_premium")}
  {_build_dropdown("Spotify", "spotify")}
  <a class="nav-feedback" href="mailto:feedback@subpricing.com">✉ Report a Bug</a>
</div>
"""

st.markdown(nav_html, unsafe_allow_html=True)


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

st.markdown(f"""
<div style="display:flex;align-items:center;gap:1.2rem;margin:1.4rem 0;padding:1rem 1.4rem;border:2px solid #111;background:#f9f9f9">
  <div style="flex:1">
    <div style="font-size:0.6rem;text-transform:uppercase;letter-spacing:0.1em;color:#888;margin-bottom:0.3rem;font-weight:700">VPN Guide</div>
    <div style="font-size:0.95rem;font-weight:700;color:#111">Does NordVPN actually work for geo-arbitrage?</div>
    <div style="font-size:0.78rem;color:#555;margin-top:0.25rem">Tested on Netflix Turkey · Spotify Argentina · YouTube Premium — March 2026</div>
  </div>
  <a href="/nordvpn_review" style="display:inline-block;background:#111;color:#fff;text-decoration:none;font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;padding:0.6rem 1.4rem;white-space:nowrap">Read Review &#9654;</a>
</div>
""", unsafe_allow_html=True)

# ── Monetization Node ────────────────────────────────────────────────────────

st.markdown("""
<div class="guide-section">
  <div class="guide-title">How to subscribe at geo-arbitrage prices</div>
  <div class="steps-row">
    <div class="step-card">
      <div class="step-num">1</div>
      <div class="step-title">Get a premium VPN</div>
      <div class="step-body">Free VPNs are detected and blocked. You need residential or obfuscated IPs.</div>
    </div>
    <div class="step-card">
      <div class="step-num">2</div>
      <div class="step-title">Connect to target country</div>
      <div class="step-body">Your IP must match the billing country at signup and on every renewal. Use incognito.</div>
    </div>
    <div class="step-card">
      <div class="step-num">3</div>
      <div class="step-title">Pay with Wise card</div>
      <div class="step-body">US/EU cards trigger geo-mismatch declines. A Wise multi-currency card is most reliable.</div>
    </div>
  </div>

  <div class="cta-wrapper">
    <div class="cta-eyebrow">Recommended tool</div>
    <div class="cta-headline">Step 1 is a VPN — free ones get blocked</div>
    <div class="cta-body">
      To subscribe at any geo-arbitrage price, your IP must resolve to that country
      at signup and on every billing renewal. Free VPNs are detected and blocked —
      you need residential or obfuscated IPs.
    </div>
    <div class="cta-social">&#9733;&#9733;&#9733;&#9733;&#9733; &nbsp;4.9/5 &middot; 14M+ users &middot; Works in Turkey, India, Argentina &amp; more</div>
    <a class="cta-link" href="https://go.nordvpn.net/aff_c?offer_id=15&aff_id=143797&url_id=902" target="_blank">
      Get NordVPN &rarr;
    </a>
    <div class="cta-sub">
      Affiliate link &nbsp;·&nbsp; We may earn a commission at no extra cost to you
    </div>
  </div>
</div>
""", unsafe_allow_html=True)

st.markdown("""
<div style="margin-top:1.2rem;margin-bottom:0.4rem">
  <div style="font-size:0.62rem;text-transform:uppercase;letter-spacing:0.1em;color:#888;margin-bottom:0.6rem;font-weight:700">How-To Guides</div>
  <div style="display:flex;gap:0;flex-wrap:wrap">
    <a href="/guide_spotify" style="display:block;border:1px solid #ccc;padding:0.7rem 1.2rem;font-size:0.78rem;font-weight:700;color:#111;text-decoration:none;min-width:200px">
      Spotify — Easy Guide &#9654;
    </a>
    <a href="/guide_youtube_premium" style="display:block;border:1px solid #ccc;border-left:none;padding:0.7rem 1.2rem;font-size:0.78rem;font-weight:700;color:#111;text-decoration:none;min-width:200px">
      YouTube Premium — Hard Guide &#9654;
    </a>
    <a href="/guide_netflix" style="display:block;border:1px solid #ccc;border-left:none;padding:0.7rem 1.2rem;font-size:0.78rem;font-weight:700;color:#111;text-decoration:none;min-width:200px">
      Netflix — Hard Guide &#9654;
    </a>
    <a href="/nordvpn_review" style="display:block;border:1px solid #e63000;border-left:none;padding:0.7rem 1.2rem;font-size:0.78rem;font-weight:700;color:#e63000;text-decoration:none;min-width:200px">
      NordVPN Review &#9654;
    </a>
  </div>
</div>
""", unsafe_allow_html=True)

# ── Footer ───────────────────────────────────────────────────────────────────

st.markdown("<hr>", unsafe_allow_html=True)

# NordVPN banner (clickable)
import base64 as _b64
_banner_path = os.path.join(os.path.abspath(os.path.dirname(__file__) or "."), "static", "nordvpn-banner-970x250.png")
with open(_banner_path, "rb") as _f:
    _banner_b64 = _b64.b64encode(_f.read()).decode()
st.markdown(
    f'<a href="{NORDVPN_URL}" target="_blank" rel="noopener">'
    f'<img src="data:image/png;base64,{_banner_b64}" style="width:100%;display:block;cursor:pointer" alt="NordVPN Special Offer">'
    f'</a>',
    unsafe_allow_html=True,
)

st.markdown(
    "<p style='font-size:0.7rem;color:#aaa;text-align:center'>"
    "For informational purposes only. Terms of service compliance is your responsibility."
    "</p>",
    unsafe_allow_html=True,
)
