"""
components/template.py
----------------------
Shared Streamlit UI template for all pSEO landing pages.
Called by every file in pages/ via: render_page(service=..., country=...)
"""

import streamlit as st
import sys
import os

# Allow import of data_engine from the project root
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from data_engine import get_price

# ── CSS ───────────────────────────────────────────────────────────────────────

_CSS = """
<style>
    html, body,
    [data-testid="stAppViewContainer"],
    [data-testid="stApp"] {
        background-color: #ffffff;
        color: #111111;
        font-family: 'Courier New', Courier, monospace;
    }
    [data-testid="stHeader"]  { background-color: #ffffff; }
    [data-testid="stSidebar"] { display: none !important; }
    .block-container { padding: 2.5rem 3rem; max-width: 860px; }

    /* Typography */
    h1 { font-size: 1.35rem; font-weight: 700; letter-spacing: 0.06em;
         text-transform: uppercase; border-bottom: 2px solid #111;
         padding-bottom: 0.4rem; margin-bottom: 0.3rem; }
    h2 { font-size: 0.9rem; font-weight: 700; letter-spacing: 0.06em;
         text-transform: uppercase; color: #444; margin-top: 1.8rem; }
    p, li { font-size: 0.85rem; color: #333; line-height: 1.75; }

    /* Price card */
    .price-card { display: flex; gap: 0; margin: 1.4rem 0; flex-wrap: wrap; }
    .price-cell { border: 1px solid #ccc; padding: 0.9rem 1.4rem;
                  flex: 1; min-width: 140px; background: #fff; }
    .price-cell + .price-cell { border-left: none; }
    .cell-label { font-size: 0.62rem; text-transform: uppercase;
                  letter-spacing: 0.09em; color: #888; margin-bottom: 0.2rem; }
    .cell-value { font-size: 1.25rem; font-weight: 700; color: #111; }
    .cell-value-saving { font-size: 1.25rem; font-weight: 700; color: #111; }

    /* Steps */
    .step-row { display: flex; gap: 1rem; margin-bottom: 1rem; align-items: flex-start; }
    .step-n { background: #111; color: #fff; font-size: 0.68rem; font-weight: 700;
              min-width: 22px; height: 22px; display: flex; align-items: center;
              justify-content: center; flex-shrink: 0; }
    .step-t { font-size: 0.83rem; color: #333; line-height: 1.65; }
    .step-t strong { color: #111; }

    /* CTA */
    .cta-block { border: 2px solid #111; padding: 1.2rem 1.6rem; margin-top: 1.8rem; }
    .cta-label { font-size: 0.62rem; text-transform: uppercase;
                 letter-spacing: 0.1em; color: #888; margin-bottom: 0.5rem; }
    .cta-btn { display: inline-block; background: #111; color: #fff !important;
               text-decoration: none; font-size: 0.78rem; font-weight: 700;
               letter-spacing: 0.07em; text-transform: uppercase;
               padding: 0.55rem 1.5rem; margin-top: 0.6rem; }
    .cta-btn:hover { background: #333; }
    .cta-disclaimer { font-size: 0.67rem; color: #aaa; margin-top: 0.5rem; }

    /* Breadcrumb */
    .breadcrumb { font-size: 0.7rem; color: #999; margin-bottom: 1.2rem; }
    .breadcrumb a { color: #555; text-decoration: none; }

    /* Divider */
    hr { border: none; border-top: 1px solid #e0e0e0; margin: 1.8rem 0; }

    /* Footer */
    .page-footer { font-size: 0.68rem; color: #bbb; text-align: center; }

    /* Hide Streamlit chrome */
    #MainMenu, footer, [data-testid="stToolbar"] { display: none; }
</style>
"""

# ── Main render function ──────────────────────────────────────────────────────

def render_page(service: str, country: str) -> None:
    """
    Render a complete pSEO landing page for the given service + country pair.
    Fetches live pricing via data_engine.get_price().
    """
    # Inject CSS once per page load
    st.markdown(_CSS, unsafe_allow_html=True)

    # Fetch pricing data
    data = get_price(service, country)

    # Graceful degradation if combo not in data set
    if data is None:
        st.error(f"No pricing data available for {service} in {country}.")
        return

    usd_price  = data["usd_price"]
    saving_pct = data["saving_pct"]
    local_str  = data["local_price"]
    plan       = data["plan"]
    year       = 2026

    # ── SEO Title (H1) ────────────────────────────────────────────────────────
    slug_service = service.replace(" ", "-")
    h1 = f"Cheapest {service} Subscription: {country} {year} Price Guide"

    # Breadcrumb nav
    st.markdown(
        f'<div class="breadcrumb">'
        f'<a href="/">Home</a> &rsaquo; {service} &rsaquo; {country}'
        f'</div>',
        unsafe_allow_html=True,
    )

    st.markdown(f"# {h1}")
    st.markdown(
        f"<p style='font-size:0.78rem;color:#888;margin-top:-0.6rem'>"
        f"Live pricing · {plan} plan · Converted at real-time exchange rates</p>",
        unsafe_allow_html=True,
    )

    # ── Price Card ────────────────────────────────────────────────────────────
    saving_display = f"{saving_pct:.1f}%" if saving_pct > 0 else "Baseline"

    st.markdown(f"""
<div class="price-card">
  <div class="price-cell">
    <div class="cell-label">Local Price ({country})</div>
    <div class="cell-value">{local_str}/mo</div>
  </div>
  <div class="price-cell">
    <div class="cell-label">Converted USD</div>
    <div class="cell-value">${usd_price:.2f}/mo</div>
  </div>
  <div class="price-cell">
    <div class="cell-label">Saving vs US Price</div>
    <div class="cell-value-saving">{saving_display}</div>
  </div>
  <div class="price-cell">
    <div class="cell-label">Plan</div>
    <div class="cell-value" style="font-size:0.95rem">{plan}</div>
  </div>
</div>
""", unsafe_allow_html=True)

    # ── Body Copy ─────────────────────────────────────────────────────────────
    st.markdown("## Why is this cheaper?")
    st.markdown(
        f"{service} uses **regional pricing** — the same service costs significantly "
        f"less when billed in {country}'s local currency ({data['currency']}). "
        f"At current exchange rates, a {country} subscription converts to just "
        f"**${usd_price:.2f}/month**, versus the US list price. "
        f"That's a potential saving of **{saving_display}** per month."
    )

    # ── How-To Guide ──────────────────────────────────────────────────────────
    st.markdown("## How to get this price (3 steps)")
    st.markdown(f"""
<div class="step-row">
  <div class="step-n">1</div>
  <div class="step-t"><strong>Connect a premium VPN to a {country} server.</strong>
  Free VPNs are detected and blocked. You need a paid VPN with residential or
  obfuscated IPs — this is the single non-negotiable requirement.</div>
</div>
<div class="step-row">
  <div class="step-n">2</div>
  <div class="step-t"><strong>Open an incognito window and visit {service}'s sign-up page.</strong>
  Your IP must resolve to {country} at the moment of account creation and on every
  billing renewal. Never log in without the VPN active.</div>
</div>
<div class="step-row">
  <div class="step-n">3</div>
  <div class="step-t"><strong>Pay with a Wise virtual card or a {country}-compatible payment method.</strong>
  Standard US/EU credit cards may trigger a geo-mismatch and be declined.
  A Wise multi-currency card charged in {data['currency']} is the most reliable option.</div>
</div>
""", unsafe_allow_html=True)

    # ── CTA ───────────────────────────────────────────────────────────────────
    st.markdown(f"""
<div class="cta-block">
  <div class="cta-label">Recommended tool</div>
  <p style="font-size:0.83rem;color:#111;margin:0">
    To access the {country} {service} price you need a VPN that reliably
    bypasses streaming geo-blocks. Most free or cheap VPNs fail at this step.
  </p>
  <a class="cta-btn" href="https://example.com/vpn-affiliate" target="_blank">
    Get a Compatible VPN &rarr;
  </a>
  <div class="cta-disclaimer">Affiliate link · We may earn a commission at no cost to you</div>
</div>
""", unsafe_allow_html=True)

    # ── Footer ────────────────────────────────────────────────────────────────
    st.markdown("<hr>", unsafe_allow_html=True)
    st.markdown(
        f'<p class="page-footer">Prices converted at live exchange rates. '
        f'Terms of service compliance is your responsibility. '
        f'Data last updated: {year}.</p>',
        unsafe_allow_html=True,
    )
