"""
components/template.py
----------------------
Shared Streamlit UI template for all pSEO landing pages.
Called by every file in pages/ via: render_page(service=..., country=...)
"""

import streamlit as st
import random
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from data_engine import get_price

# ── Master catalogue (must stay in sync with page_generator.py) ──────────────

_SERVICES = ["Netflix", "YouTube Premium", "Spotify", "Disney+", "Tidal", "Canva Pro"]
_COUNTRIES = ["Turkey", "Argentina", "Nigeria", "Egypt", "Pakistan", "Philippines", "India"]

# ── Slug helpers ───────────────────────────────────────────────────────────────

def _slug(text: str) -> str:
    """Filesystem slug (underscores) — must match actual .py filenames."""
    return (
        text.lower()
            .replace("+", "_plus")
            .replace(" ", "_")
            .replace("_", "_")
    )


def _url_slug(text: str) -> str:
    """
    Public URL slug (underscores).
    Streamlit preserves underscores in URLs: netflix_turkey.py → /netflix_turkey
    """
    return (
        text.lower()
            .replace("+", "_plus")
            .replace(" ", "_")
    )

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

    /* Internal links */
    .internal-links { margin-top: 0.4rem; }
    .il-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
               gap: 0; }
    .il-card { border: 1px solid #ddd; padding: 0.75rem 1rem; background: #fff; }
    .il-card + .il-card { border-left: none; }
    .il-card:nth-child(n+6) { border-top: none; }
    .il-service { font-size: 0.62rem; text-transform: uppercase;
                  letter-spacing: 0.08em; color: #888; }
    .il-card a { display: block; font-size: 0.8rem; font-weight: 700; color: #111;
                 text-decoration: none; margin-top: 0.15rem; }
    .il-card a:hover { text-decoration: underline; }
    .il-saving { font-size: 0.7rem; color: #555; margin-top: 0.1rem; }

    /* Divider */
    hr { border: none; border-top: 1px solid #e0e0e0; margin: 1.8rem 0; }

    /* Footer */
    .page-footer { font-size: 0.68rem; color: #bbb; text-align: center; }

    /* Hide Streamlit chrome */
    #MainMenu, footer, [data-testid="stToolbar"] { display: none; }
</style>
"""

# ── Internal link picker ──────────────────────────────────────────────────────

def _pick_related(current_service: str, current_country: str, n: int = 5) -> list[tuple]:
    """
    Return n (service, country) pairs that are NOT the current page.
    Strategy: prefer same-service/different-country AND same-country/different-service
    to maximise topical relevance, then pad with random combos.
    """
    same_service   = [(current_service, c) for c in _COUNTRIES if c != current_country]
    same_country   = [(s, current_country) for s in _SERVICES  if s != current_service]
    cross          = [(s, c) for s in _SERVICES for c in _COUNTRIES
                      if s != current_service and c != current_country]

    # Build a deduplicated ordered list: same-service first, then same-country, then cross
    seen, ordered = set(), []
    for pair in same_service + same_country + cross:
        if pair not in seen:
            seen.add(pair)
            ordered.append(pair)

    # Deterministic shuffle keyed on the current page (reproducible across reloads)
    rng = random.Random(f"{current_service}-{current_country}")
    rng.shuffle(ordered)
    return ordered[:n]


# ── Main render function ──────────────────────────────────────────────────────

def render_page(service: str, country: str) -> None:
    """
    Render a complete pSEO landing page for the given service + country pair.
    Includes: dynamic page config, price card, how-to guide, CTA, internal links.
    """
    year = 2026

    # ── Dynamic st.set_page_config ────────────────────────────────────────────
    # Must be the very first Streamlit call on the page.
    page_title = f"{service} Price in {country} {year} — Geo-Subs Tracker"
    meta_desc  = (
        f"How much does {service} cost in {country} in {year}? "
        f"See the real-time local price, USD equivalent, and exact savings vs the US. "
        f"Step-by-step guide to subscribe at the {country} rate."
    )
    st.set_page_config(
        page_title=page_title,
        page_icon=None,
        layout="wide",
        initial_sidebar_state="collapsed",
    )
    # Inject meta description via HTML (Streamlit doesn't expose a native API for this)
    st.markdown(
        f'<meta name="description" content="{meta_desc}">',
        unsafe_allow_html=True,
    )

    # Inject CSS
    st.markdown(_CSS, unsafe_allow_html=True)

    # ── Fetch live pricing ─────────────────────────────────────────────────────
    data = get_price(service, country)
    if data is None:
        st.error(f"No pricing data available for {service} in {country}.")
        return

    usd_price      = data["usd_price"]
    saving_pct     = data["saving_pct"]
    local_str      = data["local_price"]
    plan           = data["plan"]
    saving_display = f"{saving_pct:.1f}%" if saving_pct > 0 else "Baseline"

    # ── Back to Home ──────────────────────────────────────────────────────────
    st.page_link("app.py", label="← Back to Dashboard")

    # ── Breadcrumb ────────────────────────────────────────────────────────────
    st.markdown(
        f'<div class="breadcrumb">'
        f'<a href="https://subpricing.com/">Home</a> &rsaquo; {service} &rsaquo; {country}'
        f'</div>',
        unsafe_allow_html=True,
    )

    # ── H1 ────────────────────────────────────────────────────────────────────
    h1 = f"Cheapest {service} Subscription: {country} {year} Price Guide"
    st.markdown(f"# {h1}")
    st.markdown(
        f"<p style='font-size:0.78rem;color:#888;margin-top:-0.6rem'>"
        f"Live pricing · {plan} plan · Converted at real-time exchange rates</p>",
        unsafe_allow_html=True,
    )

    # ── Price Card ────────────────────────────────────────────────────────────
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
  <a class="cta-btn" href="https://go.nordvpn.net/aff_c?offer_id=15&aff_id=143797&url_id=902" target="_blank">
    Get a Compatible VPN &rarr;
  </a>
  <div class="cta-disclaimer">Affiliate link · We may earn a commission at no cost to you</div>
</div>
""", unsafe_allow_html=True)

    # ── Internal Links ────────────────────────────────────────────────────────
    st.markdown("<hr>", unsafe_allow_html=True)
    st.markdown("## Related Price Guides")

    related = _pick_related(service, country, n=5)
    cards_html = ""
    for rel_service, rel_country in related:
        rel_data  = get_price(rel_service, rel_country)
        rel_slug  = f"{_url_slug(rel_service)}-{_url_slug(rel_country)}"
        rel_save  = f"Save {rel_data['saving_pct']:.0f}%" if rel_data and rel_data['saving_pct'] > 0 else ""
        rel_usd   = f"${rel_data['usd_price']:.2f}/mo" if rel_data else "—"
        cards_html += f"""
  <div class="il-card">
    <div class="il-service">{rel_service}</div>
    <a href="/{rel_slug}">{rel_country} Price Guide</a>
    <div class="il-saving">{rel_usd} &nbsp;·&nbsp; {rel_save}</div>
  </div>"""

    st.markdown(
        f'<div class="internal-links"><div class="il-grid">{cards_html}</div></div>',
        unsafe_allow_html=True,
    )

    # ── Footer ────────────────────────────────────────────────────────────────
    st.markdown("<hr>", unsafe_allow_html=True)
    st.markdown(
        f'<p class="page-footer">Prices converted at live exchange rates. '
        f'Terms of service compliance is your responsibility. '
        f'Data last updated: {year}.</p>',
        unsafe_allow_html=True,
    )
