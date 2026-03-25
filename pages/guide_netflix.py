"""
pages/guide_netflix.py
----------------------
How-to guide: Get Netflix cheap via Turkish gift cards (G2A method).
Difficulty: Hard — gift card only, 30-day geo-lock, active enforcement in 2026.
"""

import streamlit as st
from pathlib import Path
import os
import base64 as _b64

STATIC = Path(os.path.dirname(os.path.abspath(__file__))).parent / "static"

NORDVPN_URL = "https://go.nordvpn.net/aff_c?offer_id=15&aff_id=143797&url_id=902"
WISE_URL     = "https://wise.com/invite/i/PLACEHOLDER"  # TODO: replace with affiliate link
G2A_URL      = "https://www.g2a.com/PLACEHOLDER"        # TODO: replace with G2A Goldmine affiliate link

st.set_page_config(
    page_title="How to Get Netflix Turkey Price 2026 — Full Guide",
    page_icon=None,
    layout="wide",
    initial_sidebar_state="collapsed",
)

_CSS = """
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
    p, li { font-size: 0.85rem; color: #333; line-height: 1.75; }
    .breadcrumb { font-size: 0.7rem; color: #999; margin-bottom: 1.2rem; }
    .breadcrumb a { color: #555; text-decoration: none; }
    .diff-badge { display: inline-flex; align-items: center;
                  padding: 0.3rem 0.8rem; font-size: 0.68rem; font-weight: 700;
                  text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 1rem;
                  background: #fff3e0; color: #7f2700; border: 1px solid #ffcc80; }
    .method-table { width: 100%; border-collapse: collapse; margin: 1.2rem 0; }
    .method-table th { font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.08em;
                       color: #888; border-bottom: 2px solid #111; padding: 0.4rem 0.8rem; text-align: left; }
    .method-table td { font-size: 0.78rem; color: #333; padding: 0.6rem 0.8rem;
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
    .step-t { font-size: 0.85rem !important; color: #333; line-height: 1.75; }
    .step-t strong { color: #111; }
    .tip-box { border-left: 4px solid #111; background: #f5f5f5;
               padding: 0.8rem 1.2rem; margin: 1rem 0; font-size: 0.8rem; color: #333; line-height: 1.6; }
    .warn-box { border-left: 4px solid #e63000; background: #fff5f3;
                padding: 0.8rem 1.2rem; margin: 1rem 0; font-size: 0.8rem; color: #333; line-height: 1.6; }
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
    .cta-disclaimer { font-size: 0.62rem; color: #666; margin-top: 0.9rem; }
    .alt-card { background: #f0f7f0; border: 1px solid #a5d6a7; padding: 1rem 1.4rem; margin: 1.2rem 0; }
    .alt-card-label { font-size: 0.62rem; font-weight: 700; text-transform: uppercase;
                      letter-spacing: 0.08em; color: #1b5e20; margin-bottom: 0.4rem; }
    .alt-card-text { font-size: 0.8rem; color: #333; margin-bottom: 0.7rem; line-height: 1.5; }
    .alt-card-link { display: inline-block; font-size: 0.75rem; font-weight: 700;
                     color: #111 !important; text-decoration: none;
                     border-bottom: 2px solid #111; padding-bottom: 0.1rem; }
    hr { border: none; border-top: 1px solid #e0e0e0; margin: 1.8rem 0; }
    .page-footer { font-size: 0.68rem; color: #bbb; text-align: center; }
    #MainMenu, footer, [data-testid="stToolbar"] { display: none; }
</style>
"""

st.markdown(_CSS, unsafe_allow_html=True)
st.page_link("app.py", label="← Back to Dashboard")
st.markdown(
    '<div class="breadcrumb">'
    '<a href="https://subpricing.com/">Home</a> &rsaquo; Guides &rsaquo; Netflix'
    '</div>',
    unsafe_allow_html=True,
)

st.markdown("# How to Get Netflix Turkey Price (2026 Guide)")
st.markdown(
    "<p style='font-size:0.78rem;color:#888;margin-top:0.3rem'>"
    "Gift card method · 30-day VPN lock-in · Active enforcement — read risks first</p>",
    unsafe_allow_html=True,
)
st.markdown(
    '<div class="diff-badge">Difficulty: Hard &nbsp;·&nbsp; High ban risk — understand the risks before proceeding</div>',
    unsafe_allow_html=True,
)

st.markdown("""
<div class="warn-box">
  <strong>2026 enforcement update:</strong> Netflix conducted mass account bans in June 2024
  targeting cross-region gift card accounts. Some users report accounts banned with balances
  forfeited — Netflix does not refund gift card value on banned accounts.
  New account registrations are currently higher risk. Proceed only if you accept this.
</div>
""", unsafe_allow_html=True)

# ── Easy alt ──────────────────────────────────────────────────────────────────
st.markdown("""
<div class="alt-card">
  <div class="alt-card-label">Lower risk alternative</div>
  <div class="alt-card-text">
    If you want a guaranteed win first, set up <strong>Spotify Argentina</strong> —
    it takes 3 minutes, has a 95%+ success rate, and you'll have NordVPN ready
    before attempting Netflix.
  </div>
  <a class="alt-card-link" href="/guide_spotify">Spotify Easy Guide &rarr;</a>
</div>
""", unsafe_allow_html=True)

# ── Method matrix ─────────────────────────────────────────────────────────────
st.markdown("## Which method works in 2026?")
st.markdown("""
<table class="method-table">
  <tr><th>Method</th><th>Success Rate</th><th>Status</th></tr>
  <tr>
    <td>Foreign credit card (direct)</td><td>~0%</td>
    <td><span class="tag-fail">Blocked</span> — Netflix rejects all non-Turkish cards outright</td>
  </tr>
  <tr>
    <td>Wise / virtual card</td><td>~0%</td>
    <td><span class="tag-fail">Blocked</span> — BIN detection, same as direct card</td>
  </tr>
  <tr>
    <td>Netflix Turkey gift card (G2A)</td><td>~90%</td>
    <td><span class="tag-warn">Works but risky</span> — 30-day VPN lock, active ban enforcement</td>
  </tr>
</table>
""", unsafe_allow_html=True)

st.markdown("""
<div class="tip-box">
  <strong>Why gift cards work (but only partially):</strong> Netflix's payment system
  cannot detect the origin of a gift card code — it just sees a valid balance.
  However, Netflix monitors your IP activity after signup. If you watch from a
  non-Turkish IP within the first ~30 days, or if Netflix's systems flag your
  account behavior, it will lock you to Turkey and require a Turkish connection
  to watch — or ban the account outright.
</div>
""", unsafe_allow_html=True)

# ── Steps ──────────────────────────────────────────────────────────────────────
st.markdown("## Step-by-step: Netflix Turkey gift card method")

st.markdown(f"""
<div class="step-row">
  <div class="step-n">1</div>
  <div class="step-t"><strong>Buy a Netflix Turkey gift card on G2A — before opening VPN.</strong>
  Search "Netflix Gift Card TRY Turkey." Available in 100, 200, 300 TRY.
  <strong>300 TRY is best value</strong> and can be stacked across months.
  Start with one 300 TRY card to test.<br><br>
  <strong>Do NOT connect VPN when buying on G2A</strong> — some cards fail to purchase
  with VPN active. Use your normal connection for this step only.
  The gift card code arrives by email within minutes.<br><br>
  <a href="{G2A_URL}" target="_blank" style="display:inline-block;background:#111;color:#fff;
  font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;
  padding:0.45rem 1.2rem;text-decoration:none;margin-top:0.4rem">
  Buy Netflix Turkey Gift Card on G2A &rarr;</a>
  <div style="font-size:0.6rem;color:#999;margin-top:0.3rem">Affiliate link &middot; We may earn a commission</div>
  </div>
</div>
""", unsafe_allow_html=True)
st.image(str(STATIC / "g2a_product_page.jpg"), caption="G2A product page — select 300 TRY, then click 'View offers from other sellers' to find the cheapest listing", use_container_width=True)
st.image(str(STATIC / "g2a_cart.jpg"), caption="G2A cart — enter your email and click 'Continue to payment'", use_container_width=True)
st.image(str(STATIC / "g2a_order_complete.jpg"), caption="Order complete — click 'Get Netflix key' to reveal your gift card code", use_container_width=True)

st.markdown(f"""
<div class="step-row">
  <div class="step-n">2</div>
  <div class="step-t"><strong>Now connect VPN to a Turkey server.</strong>
  Use obfuscated servers — Netflix's VPN detection is aggressive and blocks standard IPs.
  Open an incognito window before going to netflix.com.</div>
</div>""", unsafe_allow_html=True)
st.markdown(f"""
<div style="font-size:0.85rem;color:#333;margin:0 0 1rem 2.2rem;line-height:2">
  Do not have VPN?<br>
  1. <a href="{NORDVPN_URL}" target="_blank" style="color:#e63000;font-weight:700;text-decoration:underline;">NordVPN</a> — obfuscated servers, best for Netflix<br>
  2. ExpressVPN<br>
  3. Surfshark
</div>
""", unsafe_allow_html=True)
st.markdown(f"""
<div class="step-row">
  <div class="step-n">3</div>
  <div class="step-t"><strong>Create a new Netflix account at netflix.com.</strong>
  Do not use an existing account. Enter your email → set a password → when prompted
  for payment method, select <strong>"Gift Card / Promo Code"</strong> —
  do NOT enter a credit card. Paste the code from G2A. Your account activates immediately.</div>
</div>
""", unsafe_allow_html=True)
st.image(str(STATIC / "netflix_turkey_homepage.jpg"), caption="Netflix Turkey homepage — price shown in TL confirms VPN is working correctly", use_container_width=True)
st.image(str(STATIC / "netflix_enter_gift_code.jpg"), caption="Enter your gift card code and click 'Redeem Gift Code'", use_container_width=True)
st.image(str(STATIC / "netflix_confirm_start.jpg"), caption="Confirm details — check 'I agree' then click 'Start Membership'", use_container_width=True)

st.markdown("""
<div class="step-row">
  <div class="step-n">4</div>
  <div class="step-t"><strong>Keep VPN active for the first ~30 days.</strong>
  Watch Netflix via NordVPN Turkey server during this period. After roughly one month,
  many users report being able to watch without VPN — though this varies by account
  and is not guaranteed. Keep VPN handy regardless.</div>
</div>
<div class="step-row">
  <div class="step-n">5</div>
  <div class="step-t"><strong>Renew before balance runs out.</strong>
  Account → Manage Payment Info → <strong>Redeem Gift Card or Promo Code</strong>.
  Enter a new code while on Turkey VPN. Netflix does not auto-charge —
  if balance hits zero, the account pauses automatically.</div>
</div>
""", unsafe_allow_html=True)

st.markdown("""
<div class="warn-box">
  <strong>If your G2A card payment fails:</strong> Disconnect VPN first, then try again
  on your normal connection — this resolves most G2A payment failures.
  If still failing, try a different browser or contact G2A support to swap the code.
</div>
""", unsafe_allow_html=True)

st.markdown("""
<div class="warn-box">
  <strong>If your account is banned:</strong> Netflix's ban message reads:
  "Your account has been blocked due to violation of our rules and policies."
  Banned accounts are permanent and gift card balances are not refunded.
  This is why we recommend buying only 1 month of gift cards initially.
</div>
""", unsafe_allow_html=True)

# ── Banner ────────────────────────────────────────────────────────────────────
_banner_path = os.path.join(os.path.dirname(__file__), "..", "static", "nordvpn-banner-970x250.png")
with open(_banner_path, "rb") as _f:
    _banner_b64 = _b64.b64encode(_f.read()).decode()
st.markdown(
    f'<a href="{NORDVPN_URL}" target="_blank" rel="noopener">'
    f'<img src="data:image/png;base64,{_banner_b64}" style="width:100%;display:block;cursor:pointer;margin:1.5rem 0 0" alt="NordVPN Special Offer">'
    f'</a>',
    unsafe_allow_html=True,
)

# ── CTA ───────────────────────────────────────────────────────────────────────
st.markdown(f"""
<div class="cta-block">
  <div class="cta-block-eyebrow">Required — use obfuscated servers</div>
  <div class="cta-block-headline">Get NordVPN — Up to 73% Off + Amazon Gift Card</div>
  <div class="cta-block-sub">
    Standard VPN IPs are on Netflix's blocklist. NordVPN's obfuscated servers
    mask VPN traffic as regular HTTPS, significantly improving success rate.
    Required for both account creation and the 30-day lock-in period.
  </div>
  <div class="cta-social">&#9733;&#9733;&#9733;&#9733;&#9733; &nbsp;4.9/5 &middot; 14M+ users &middot; Obfuscated servers available</div>
  <a class="cta-main-btn" href="{NORDVPN_URL}" target="_blank">Get NordVPN — 73% Off &rarr;</a>
  <div class="cta-disclaimer">Affiliate link &middot; We may earn a commission at no extra cost to you</div>
</div>

<div class="cta-block" style="background:#1a1a1a;margin-top:0.8rem">
  <div class="cta-block-eyebrow">For multi-currency payments</div>
  <div class="cta-block-headline">Open a Wise account</div>
  <div class="cta-block-sub">
    If G2A rejects your domestic card, a Wise multi-currency virtual card charged
    in Turkish lira can resolve the payment issue. Also useful for Spotify,
    Canva Pro, and other geo-arbitrage services.
  </div>
  <a class="cta-main-btn" href="{WISE_URL}" target="_blank">Open Wise Account &rarr;</a>
  <div class="cta-disclaimer">Affiliate link &middot; We may earn a commission at no extra cost to you</div>
</div>
""", unsafe_allow_html=True)

# ── FAQ ───────────────────────────────────────────────────────────────────────
st.markdown("## Common questions")

st.markdown("""
**Can I use my existing Netflix account?**
No. Your existing account is tied to your home country and payment method.
You need a brand new account with the Turkish gift card as the only payment method.

**Can I switch back to credit card after setting up?**
No. Netflix detects your card's country of issue — non-Turkish cards are rejected
on a Turkish account. Gift card top-ups are the only option going forward.

**Do I need VPN every time I watch?**
For the first ~30 days: yes, use NordVPN Turkey. After that, many users report
being able to watch without VPN — but this varies. Some accounts need VPN permanently,
others unlock after a month. Keep VPN installed regardless.

**Can I share the account?**
Sharing across different countries is possible after the 30-day period, but Netflix is
also enforcing its password-sharing crackdown simultaneously — adding another risk layer.

**What if my account gets banned?**
Netflix's ban message: "Your account has been blocked due to violation of our rules."
Bans are permanent. Gift card balances are **not refunded**. This is why we recommend
starting with one 300 TRY card — don't load large balances on a new account.

**Is this against Netflix's Terms of Service?**
Yes. Netflix explicitly prohibits VPN use for geo-pricing arbitrage.
Enforcement is active and increasing. Proceed at your own risk.
""")

st.markdown("<hr>", unsafe_allow_html=True)
st.markdown(
    '<p class="page-footer">This guide reflects methods verified as of 2026. '
    'Netflix enforcement policies change frequently. '
    'We do not recommend loading large gift card balances on new accounts. '
    'Terms of service compliance is your responsibility.</p>',
    unsafe_allow_html=True,
)
