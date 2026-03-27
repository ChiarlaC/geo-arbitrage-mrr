"""
pages/guide_netflix.py
----------------------
How-to guide: Get Netflix cheap via Turkish gift cards (G2A method).
Difficulty: Hard — gift card only, 30-day geo-lock, active enforcement in 2026.
"""

import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

import streamlit as st
from pathlib import Path
from config import NORDVPN_URL, G2A_URL
from components.guide_base import (
    STATIC, guide_page_setup, render_breadcrumb,
    render_nordvpn_banner, render_nordvpn_cta, render_vpn_list, render_footer,
)

guide_page_setup("How to Get Netflix Turkey Price 2026 — Full Guide")
render_breadcrumb("Netflix")

st.markdown("# How to Get Netflix Turkey Price (2026 Guide)")
st.markdown(
    "<p style='font-size:0.78rem;color:#888;margin-top:0.3rem'>"
    "Gift card method · 30-day VPN lock-in · Active enforcement — read risks first</p>",
    unsafe_allow_html=True,
)
st.markdown(
    '<div class="diff-badge diff-hard">Difficulty: Hard &nbsp;·&nbsp; High ban risk — understand the risks before proceeding</div>',
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
    <td>Wise / Revolut virtual card</td><td>~0%</td>
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
  <a href="{G2A_URL}" target="_blank" style="display:inline-block;background:#e63000;color:#fff;
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
render_vpn_list("Netflix")

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

render_nordvpn_banner()

render_nordvpn_cta(
    eyebrow="Required — use obfuscated servers",
    body="Standard VPN IPs are on Netflix's blocklist. NordVPN's obfuscated servers "
         "mask VPN traffic as regular HTTPS, significantly improving success rate. "
         "Required for both account creation and the 30-day lock-in period.",
    social_line="&#9733;&#9733;&#9733;&#9733;&#9733; &nbsp;4.9/5 &middot; 14M+ users &middot; Obfuscated servers available",
)

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

render_footer("This guide reflects methods verified as of 2026. "
              "Netflix enforcement policies change frequently. "
              "We do not recommend loading large gift card balances on new accounts.")
