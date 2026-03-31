"""
pages/guide_spotify.py
----------------------
How-to guide: Get Spotify cheap via geo-arbitrage (Argentina / Turkey).
Difficulty: Easy — gift card method, no ongoing VPN required.
"""

import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

import streamlit as st
from config import NORDVPN_URL
from components.guide_base import (
    guide_page_setup, render_breadcrumb,
    render_nordvpn_banner, render_nordvpn_cta, render_vpn_list, render_footer,
)

guide_page_setup(
    "How to Get Spotify Argentina Price 2026 — Full Guide",
    description="How to get Spotify Argentina or Turkey price in 2026. The easiest geo-arbitrage method using gift cards with 95%+ success rate."
)
render_breadcrumb("Spotify")

st.markdown("# How to Get Spotify Argentina Price (2026 Guide)")
st.markdown(
    "<p style='font-size:0.78rem;color:#888;margin-top:0.3rem'>"
    "Gift card method · No ongoing VPN required · 95%+ success rate</p>",
    unsafe_allow_html=True,
)
st.markdown(
    '<div class="diff-badge diff-easy">Difficulty: Easy &nbsp;·&nbsp; Best starting point for geo-arbitrage</div>',
    unsafe_allow_html=True,
)

# ── Method matrix ─────────────────────────────────────────────────────────────
st.markdown("## Which method works in 2026?")
st.markdown("""
<table class="method-table">
  <tr>
    <th>Method</th>
    <th>Success Rate</th>
    <th>Status</th>
  </tr>
  <tr>
    <td>Foreign credit card (direct)</td>
    <td>~5%</td>
    <td><span class="tag-fail">Blocked</span> — BIN detection rejects non-local cards</td>
  </tr>
  <tr>
    <td>Wise / Revolut virtual card</td>
    <td>~30%</td>
    <td><span class="tag-fail">Unreliable</span> — many virtual card BINs are blacklisted</td>
  </tr>
  <tr>
    <td>Spotify gift card (G2A / Eneba)</td>
    <td>~99%</td>
    <td><span class="tag-best">Recommended</span> — bypasses all card geo-checks</td>
  </tr>
</table>
""", unsafe_allow_html=True)

st.markdown("""
<div class="tip-box">
  <strong>Why gift cards work:</strong> Spotify's payment gateway checks the country of your
  credit card's issuing bank (BIN). A gift card has no BIN — it's just a code.
  Once redeemed, Spotify sees a local balance and charges it normally.
</div>
""", unsafe_allow_html=True)

# ── Step by step ──────────────────────────────────────────────────────────────
st.markdown("## Step-by-step: Spotify Argentina (cheapest option)")

st.markdown(f"""
<div class="step-row">
  <div class="step-n">1</div>
  <div class="step-t"><strong>Connect VPN to an Argentina server.</strong>
  Open an incognito window. This ensures spotify.com detects your IP as Argentina
  during account creation. Free VPNs are blocked — you need a premium VPN.</div>
</div>
""", unsafe_allow_html=True)
render_vpn_list("Spotify")

st.markdown("""
<div class="step-row">
  <div class="step-n">2</div>
  <div class="step-t"><strong>Create a new Spotify account at spotify.com/ar/.</strong>
  Use a fresh email. Set your country to Argentina when prompted.
  Do not use a Facebook login — it may carry your existing country setting.</div>
</div>
<div class="step-row">
  <div class="step-n">3</div>
  <div class="step-t"><strong>Buy an Argentina Spotify gift card on G2A or Eneba.</strong>
  Search "Spotify Argentina gift card." Denominations vary — buy enough to cover
  1–3 months. You'll receive a code by email within minutes.</div>
</div>
<div class="step-row">
  <div class="step-n">4</div>
  <div class="step-t"><strong>Redeem the gift card in your Spotify account.</strong>
  Go to spotify.com/redeem (while still on Argentina VPN). Enter the code.
  Your account will show a peso balance — use it to activate Premium.</div>
</div>
<div class="step-row">
  <div class="step-n">5</div>
  <div class="step-t"><strong>Turn off the VPN and enjoy.</strong>
  After activation, you do NOT need to keep the VPN running for daily listening.
  Spotify does not enforce ongoing IP checks — this is what makes it Easy mode.</div>
</div>
""", unsafe_allow_html=True)

st.markdown("""
<div class="warn-box">
  <strong>Renewal:</strong> When your gift card balance runs out, repeat steps 1 and 4
  (buy another card, redeem with VPN on). You don't need to reconnect every month —
  only when topping up. Budget tip: buy 3–6 months of cards upfront to minimise friction.
</div>
""", unsafe_allow_html=True)

render_nordvpn_banner()

render_nordvpn_cta(
    eyebrow="Step 1 — Required for all methods",
    body="You only need the VPN active during account creation and gift card redemption. "
         "NordVPN's Argentina and Turkey servers are fast and reliably undetected by Spotify.",
    social_line="&#9733;&#9733;&#9733;&#9733;&#9733; &nbsp;4.9/5 &middot; 14M+ users",
)

# ── FAQ ───────────────────────────────────────────────────────────────────────
st.markdown("## Common questions")

st.markdown("""
**Can I keep my existing Spotify account?**
No — your existing account is tied to your home country. You need a new account
for the Argentine pricing. You can transfer playlists manually or with a tool like Soundiiz.

**What about the family plan?**
Family plan members must share the same "home address" country. All members need to
accept the invite while on an Argentina VPN. After that, daily use does not require VPN.

**Will Spotify ever lock my account?**
Spotify does run periodic checks and has banned batches of cross-region accounts in the past,
though far less aggressively than YouTube or Netflix. The gift card method reduces risk
significantly because there is no foreign card on file to flag.

**Turkey vs Argentina — which is cheaper?**
Argentina is currently cheaper at the headline price, but the Argentine peso is highly volatile.
Turkey is more stable. Check the live prices on our dashboard before deciding.
""")

render_footer("This guide reflects methods verified as of 2026. "
              "Platform policies change — always check current pricing before purchasing gift cards.")
