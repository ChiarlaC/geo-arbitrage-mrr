# components/guide_base.py
# Shared CSS, page setup, and helper functions for all guide pages.
# Import this instead of copy-pasting boilerplate into each guide.

import os
import base64 as _b64
import streamlit as st
from pathlib import Path

from config import NORDVPN_URL, SITE_URL

STATIC = Path(os.path.dirname(os.path.abspath(__file__))).parent / "static"

# ── Shared CSS ────────────────────────────────────────────────────────────────
# Edit styles here once — all guide pages pick up the change automatically.

GUIDE_CSS = """
<style>
    html, body,
    [data-testid="stAppViewContainer"],
    [data-testid="stApp"] {
        background-color: #ffffff; color: #111111;
        font-family: 'Courier New', Courier, monospace;
    }
    [data-testid="stHeader"]  { background-color: #ffffff; }
    [data-testid="stSidebar"] { display: none !important; }
    .block-container { padding: 2.5rem 3rem; max-width: 860px; }
    h1 { font-size: 1.35rem; font-weight: 700; letter-spacing: 0.06em;
         text-transform: uppercase; border-bottom: 2px solid #111;
         padding-bottom: 0.4rem; margin-bottom: 0.3rem; }
    h2 { font-size: 0.9rem; font-weight: 700; letter-spacing: 0.06em;
         text-transform: uppercase; color: #444; margin-top: 1.8rem; }
    p, li { font-size: 1rem; color: #333; line-height: 1.75; }
    .breadcrumb { font-size: 0.7rem; color: #999; margin-bottom: 1.2rem; }
    .breadcrumb a { color: #555; text-decoration: none; }
    .diff-badge { display: inline-flex; align-items: center;
                  padding: 0.3rem 0.8rem; font-size: 0.68rem; font-weight: 700;
                  text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 1rem; }
    .diff-easy  { background: #e8f5e9; color: #1b5e20; border: 1px solid #a5d6a7; }
    .diff-hard  { background: #fff3e0; color: #7f2700; border: 1px solid #ffcc80; }
    .diff-vhard { background: #fce4ec; color: #880e24; border: 1px solid #f48fb1; }
    .method-table { width: 100%; border-collapse: collapse; margin: 1.2rem 0; }
    .method-table th { font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.08em;
                       color: #888; border-bottom: 2px solid #111; padding: 0.4rem 0.8rem; text-align: left; }
    .method-table td { font-size: 0.92rem; color: #333; padding: 0.6rem 0.8rem;
                       border-bottom: 1px solid #eee; vertical-align: top; }
    .tag-best { background: #e8f5e9; color: #1b5e20; font-size: 0.6rem; font-weight: 700;
                text-transform: uppercase; padding: 0.15rem 0.4rem; letter-spacing: 0.06em; }
    .tag-fail { background: #fce4ec; color: #880e24; font-size: 0.6rem; font-weight: 700;
                text-transform: uppercase; padding: 0.15rem 0.4rem; letter-spacing: 0.06em; }
    .tag-warn { background: #fff8e1; color: #6d4c00; font-size: 0.6rem; font-weight: 700;
                text-transform: uppercase; padding: 0.15rem 0.4rem; letter-spacing: 0.06em; }
    .step-row { display: flex; gap: 1rem; margin-bottom: 1rem; align-items: flex-start; }
    .step-n { background: #111; color: #fff; font-size: 0.68rem; font-weight: 700;
              min-width: 22px; height: 22px; display: flex; align-items: center;
              justify-content: center; flex-shrink: 0; }
    .step-t { font-size: 1rem !important; color: #333; line-height: 1.75; }
    .step-t strong { color: #111; }
    .tip-box { border-left: 4px solid #111; background: #f5f5f5;
               padding: 0.8rem 1.2rem; margin: 1rem 0; font-size: 0.95rem; color: #333; line-height: 1.6; }
    .warn-box { border-left: 4px solid #e63000; background: #fff5f3;
                padding: 0.8rem 1.2rem; margin: 1rem 0; font-size: 0.95rem; color: #333; line-height: 1.6; }
    .cta-block { background: #111; color: #fff; padding: 1.6rem 2rem; margin-top: 1.8rem; }
    .cta-block-eyebrow { font-size: 0.6rem; text-transform: uppercase;
                         letter-spacing: 0.12em; color: #aaa; margin-bottom: 0.4rem; }
    .cta-block-headline { font-size: 1.05rem; font-weight: 700; color: #fff;
                          margin-bottom: 0.35rem; line-height: 1.35; }
    .cta-block-sub { font-size: 0.8rem; color: #ccc; margin-bottom: 0.25rem; }
    .cta-social { font-size: 0.72rem; color: #888; margin-bottom: 1rem; }
    .cta-main-btn { display: inline-block; background: #e63000; color: #fff !important;
                    text-decoration: none; font-size: 0.88rem; font-weight: 700;
                    letter-spacing: 0.05em; text-transform: uppercase; padding: 0.75rem 2.2rem; }
    .cta-main-btn:hover { background: #ff3a00; }
    .cta-plan-note { font-size: 0.78rem; color: #444; margin-top: 0.5rem; }
    .cta-disclaimer { font-size: 0.62rem; color: #666; margin-top: 0.9rem; }
    .alt-card { background: #f0f7f0; border: 1px solid #a5d6a7; padding: 1rem 1.4rem; margin: 1.2rem 0; }
    .alt-card-label { font-size: 0.62rem; font-weight: 700; text-transform: uppercase;
                      letter-spacing: 0.08em; color: #1b5e20; margin-bottom: 0.4rem; }
    .alt-card-text { font-size: 0.8rem; color: #333; margin-bottom: 0.7rem; line-height: 1.5; }
    .alt-card-link { display: inline-block; font-size: 0.75rem; font-weight: 700;
                     color: #111 !important; text-decoration: none;
                     border-bottom: 2px solid #111; padding-bottom: 0.1rem; }
    hr { border: none; border-top: 1px solid #e0e0e0; margin: 1.8rem 0; }
    [data-testid="stImage"] { width: 85% !important; }
    [data-testid="stImage"] img { width: 100% !important; }
    .page-footer { font-size: 0.68rem; color: #bbb; text-align: center; }
    #MainMenu, footer, [data-testid="stToolbar"] { display: none; }
</style>
"""


def guide_page_setup(page_title: str, description: str = "") -> None:
    """Call at the top of every guide page, before any content."""
    st.set_page_config(
        page_title=page_title,
        page_icon=None,
        layout="wide",
        initial_sidebar_state="collapsed",
    )
    if description:
        st.markdown(
            f'<meta name="description" content="{description}">',
            unsafe_allow_html=True,
        )
    st.markdown(GUIDE_CSS, unsafe_allow_html=True)


def render_breadcrumb(service_label: str) -> None:
    """Render back link + breadcrumb trail."""
    st.markdown(
        '<a href="/" style="font-size:0.85rem;color:#111;text-decoration:none;font-weight:600;'
        'display:inline-block;margin-bottom:0.5rem">← Back to Dashboard</a>',
        unsafe_allow_html=True
    )
    st.markdown(
        f'<div class="breadcrumb">'
        f'<a href="{SITE_URL}/">Home</a> &rsaquo; Guides &rsaquo; {service_label}'
        f'</div>',
        unsafe_allow_html=True,
    )


def render_nordvpn_banner() -> None:
    """Render the NordVPN affiliate banner image."""
    banner_path = STATIC / "nordvpn-banner-970x250.png"
    with open(banner_path, "rb") as f:
        b64 = _b64.b64encode(f.read()).decode()
    st.markdown(
        f'<a href="{NORDVPN_URL}" target="_blank" rel="noopener">'
        f'<img src="data:image/png;base64,{b64}" '
        f'style="width:100%;display:block;cursor:pointer;margin:1.5rem 0 0" '
        f'alt="NordVPN Special Offer">'
        f'</a>',
        unsafe_allow_html=True,
    )


def render_nordvpn_cta(eyebrow: str, body: str, social_line: str = "&#9733;&#9733;&#9733;&#9733;&#9733; &nbsp;4.9/5 &middot; 14M+ users") -> None:
    """Render the NordVPN CTA block."""
    st.markdown(f"""
<div class="cta-block">
  <div class="cta-block-eyebrow">{eyebrow}</div>
  <div class="cta-block-headline">Get NordVPN — Up to 76% Off + 3 Months Extra</div>
  <div class="cta-block-sub">{body}</div>
  <div class="cta-social">{social_line}</div>
  <a class="cta-main-btn" href="{NORDVPN_URL}" target="_blank">Get NordVPN — Best Value: 2-Year Plan &rarr;</a>
  <div class="cta-plan-note">&#10003; 2-year plan locks in the lowest rate &nbsp;&middot;&nbsp; &#10003; Cancel anytime</div>
  <div class="cta-disclaimer">Affiliate link &middot; We may earn a commission at no extra cost to you</div>
</div>
""", unsafe_allow_html=True)


def render_vpn_list(best_for: str) -> None:
    """Render the 'Don't have VPN?' list under Step 1."""
    st.markdown(f"""
<div style="font-size:1rem;color:#333;margin:0 0 1rem 2.2rem;line-height:2">
  Do not have VPN?<br>
  1. <a href="{NORDVPN_URL}" target="_blank" style="color:#e63000;font-weight:700;text-decoration:underline;">NordVPN</a> — obfuscated servers, best for {best_for}<br>
  2. ExpressVPN<br>
  3. Surfshark
</div>
""", unsafe_allow_html=True)


def render_footer(disclaimer: str) -> None:
    """Render the page footer with a custom disclaimer line."""
    st.markdown("<hr>", unsafe_allow_html=True)
    st.markdown(
        f'<p class="page-footer">{disclaimer} '
        f'Terms of service compliance is your responsibility.<br>'
        f'This site contains affiliate links. We may earn a commission when you purchase '
        f'through our links, at no extra cost to you.</p>',
        unsafe_allow_html=True,
    )
