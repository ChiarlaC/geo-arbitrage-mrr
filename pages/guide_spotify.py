"""
pages/guide_spotify.py
----------------------
How-to guide: Get Spotify cheap via geo-arbitrage (Argentina / Turkey).
Difficulty: Easy — gift card method, no ongoing VPN required.
"""

import streamlit as st

NORDVPN_URL = "https://go.nordvpn.net/aff_c?offer_id=15&aff_id=143797&url_id=902"
WISE_URL     = "https://wise.com/invite/i/PLACEHOLDER"  # TODO: replace with affiliate link

st.set_page_config(
    page_title="How to Get Spotify Argentina Price 2026 — Full Guide",
    page_icon=None,
    layout="wide",
    initial_sidebar_state="collapsed",
)

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

    h1 { font-size: 1.35rem; font-weight: 700; letter-spacing: 0.06em;
         text-transform: uppercase; border-bottom: 2px solid #111;
         padding-bottom: 0.4rem; margin-bottom: 0.3rem; }
    h2 { font-size: 0.9rem; font-weight: 700; letter-spacing: 0.06em;
         text-transform: uppercase; color: #444; margin-top: 1.8rem; }
    p, li { font-size: 0.85rem; color: #333; line-height: 1.75; }

    .breadcrumb { font-size: 0.7rem; color: #999; margin-bottom: 1.2rem; }
    .breadcrumb a { color: #555; text-decoration: none; }

    /* Difficulty badge */
    .diff-badge { display: inline-flex; align-items: center;
                  padding: 0.3rem 0.8rem; font-size: 0.68rem; font-weight: 700;
                  text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 1rem;
                  background: #e8f5e9; color: #1b5e20; border: 1px solid #a5d6a7; }

    /* Method matrix */
    .method-table { width: 100%; border-collapse: collapse; margin: 1.2rem 0; }
    .method-table th { font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.08em;
                       color: #888; border-bottom: 2px solid #111; padding: 0.4rem 0.8rem;
                       text-align: left; }
    .method-table td { font-size: 0.78rem; color: #333; padding: 0.6rem 0.8rem;
                       border-bottom: 1px solid #eee; vertical-align: top; }
    .tag-best { background: #e8f5e9; color: #1b5e20; font-size: 0.6rem; font-weight: 700;
                text-transform: uppercase; padding: 0.15rem 0.4rem; letter-spacing: 0.06em; }
    .tag-fail { background: #fce4ec; color: #880e24; font-size: 0.6rem; font-weight: 700;
                text-transform: uppercase; padding: 0.15rem 0.4rem; letter-spacing: 0.06em; }

    /* Steps */
    .step-row { display: flex; gap: 1rem; margin-bottom: 1rem; align-items: flex-start; }
    .step-n { background: #111; color: #fff; font-size: 0.68rem; font-weight: 700;
              min-width: 22px; height: 22px; display: flex; align-items: center;
              justify-content: center; flex-shrink: 0; }
    .step-t { font-size: 0.85rem !important; color: #333; line-height: 1.75; }
    .step-t strong { color: #111; }

    /* Warning / tip boxes */
    .tip-box { border-left: 4px solid #111; background: #f5f5f5;
               padding: 0.8rem 1.2rem; margin: 1rem 0; font-size: 0.8rem;
               color: #333; line-height: 1.6; }
    .warn-box { border-left: 4px solid #e63000; background: #fff5f3;
                padding: 0.8rem 1.2rem; margin: 1rem 0; font-size: 0.8rem;
                color: #333; line-height: 1.6; }

    /* CTA block */
    .cta-block { background: #111; color: #fff; padding: 1.6rem 2rem; margin-top: 1.8rem; }
    .cta-block-eyebrow { font-size: 0.6rem; text-transform: uppercase;
                         letter-spacing: 0.12em; color: #aaa; margin-bottom: 0.4rem; }
    .cta-block-headline { font-size: 1.05rem; font-weight: 700; color: #fff;
                          margin-bottom: 0.35rem; line-height: 1.35; }
    .cta-block-sub { font-size: 0.8rem; color: #ccc; margin-bottom: 0.25rem; }
    .cta-social { font-size: 0.72rem; color: #888; margin-bottom: 1rem; }
    .cta-main-btn { display: inline-block; background: #e63000; color: #fff !important;
                    text-decoration: none; font-size: 0.88rem; font-weight: 700;
                    letter-spacing: 0.05em; text-transform: uppercase;
                    padding: 0.75rem 2.2rem; }
    .cta-main-btn:hover { background: #ff3a00; }
    .cta-disclaimer { font-size: 0.62rem; color: #666; margin-top: 0.9rem; }

    hr { border: none; border-top: 1px solid #e0e0e0; margin: 1.8rem 0; }
    .page-footer { font-size: 0.68rem; color: #bbb; text-align: center; }
    #MainMenu, footer, [data-testid="stToolbar"] { display: none; }
</style>
"""

st.markdown(_CSS, unsafe_allow_html=True)

st.page_link("app.py", label="← Back to Dashboard")

st.markdown(
    '<div class="breadcrumb">'
    '<a href="https://subpricing.com/">Home</a> &rsaquo; Guides &rsaquo; Spotify'
    '</div>',
    unsafe_allow_html=True,
)

st.markdown("# How to Get Spotify Argentina Price (2026 Guide)")
st.markdown(
    "<p style='font-size:0.78rem;color:#888;margin-top:0.3rem'>"
    "Gift card method · No ongoing VPN required · 95%+ success rate</p>",
    unsafe_allow_html=True,
)

st.markdown(
    '<div class="diff-badge">Difficulty: Easy &nbsp;·&nbsp; Best starting point for geo-arbitrage</div>',
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
    <td>Wise / virtual card</td>
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
st.markdown(f"""
<div style="font-size:0.85rem;color:#333;margin:0 0 1rem 2.2rem;line-height:2">
  Do not have VPN?<br>
  1. <a href="{NORDVPN_URL}" target="_blank" style="color:#e63000;font-weight:700;text-decoration:underline;">NordVPN</a> — fast Argentina servers, best for Spotify<br>
  2. ExpressVPN<br>
  3. Surfshark
</div>
""", unsafe_allow_html=True)
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

# ── CTA ───────────────────────────────────────────────────────────────────────
st.markdown(f"""
<div class="cta-block">
  <div class="cta-block-eyebrow">Step 1 — Required for all methods</div>
  <div class="cta-block-headline">Get NordVPN — needed for account setup</div>
  <div class="cta-block-sub">
    You only need the VPN active during account creation and gift card redemption.
    NordVPN's Argentina and Turkey servers are fast and reliably undetected by Spotify.
  </div>
  <div class="cta-social">&#9733;&#9733;&#9733;&#9733;&#9733; &nbsp;4.9/5 &middot; 14M+ users</div>
  <a class="cta-main-btn" href="{NORDVPN_URL}" target="_blank">Get NordVPN &rarr;</a>
  <div class="cta-disclaimer">Affiliate link &middot; We may earn a commission at no extra cost to you</div>
</div>
""", unsafe_allow_html=True)

st.markdown(f"""
<div class="cta-block" style="background:#1a1a1a;margin-top:0.8rem">
  <div class="cta-block-eyebrow">Step 3 — For paying with local currency</div>
  <div class="cta-block-headline">Open a Wise account — multi-currency card</div>
  <div class="cta-block-sub">
    Wise lets you hold Argentine pesos or Turkish lira and issue a virtual debit card.
    While not 100% reliable for Spotify (some BINs are blocked), it works for many users
    and is essential for other geo-arbitrage services like Canva Pro.
  </div>
  <a class="cta-main-btn" href="{WISE_URL}" target="_blank">Open Wise Account &rarr;</a>
  <div class="cta-disclaimer">Affiliate link &middot; We may earn a commission at no extra cost to you</div>
</div>
""", unsafe_allow_html=True)

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

st.markdown("<hr>", unsafe_allow_html=True)
st.markdown(
    '<p class="page-footer">This guide reflects methods verified as of 2026. '
    'Platform policies change — always check current pricing before purchasing gift cards. '
    'Terms of service compliance is your responsibility.</p>',
    unsafe_allow_html=True,
)
