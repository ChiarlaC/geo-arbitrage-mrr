"""
pages/guide_youtube_premium.py
-------------------------------
How-to guide: Get YouTube Premium cheap via Turkish Apple ID + gift cards.
Difficulty: Very Hard — Apple IAP method is the only reliable bypass in 2026.
"""

import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

import streamlit as st
from config import NORDVPN_URL, G2A_URL
from components.guide_base import (
    STATIC, guide_page_setup, render_breadcrumb,
    render_nordvpn_banner, render_nordvpn_cta, render_vpn_list, render_footer,
)

guide_page_setup(
    "How to Get YouTube Premium Turkey Price 2026 — Full Guide",
    description="Full 2026 guide to getting the cheapest YouTube Premium via the Turkish Apple ID method. The only reliable bypass for Google's BIN-locking."
)
render_breadcrumb("YouTube Premium")

st.markdown("# How to Get YouTube Premium Turkey Price (2026 Guide)")
st.markdown(
    "<p style='font-size:0.78rem;color:#888;margin-top:0.3rem'>"
    "Apple IAP method · Turkish iTunes gift cards · iOS required</p>",
    unsafe_allow_html=True,
)
st.markdown(
    '<div class="diff-badge diff-vhard">Difficulty: Very Hard &nbsp;·&nbsp; Read this fully before attempting</div>',
    unsafe_allow_html=True,
)

# ── Easy alt ──────────────────────────────────────────────────────────────────
st.markdown("""
<div class="alt-card">
  <div class="alt-card-label">New to geo-arbitrage? Start here first</div>
  <div class="alt-card-text">
    YouTube Premium is the hardest service to geo-arbitrage in 2026. If you're new,
    get <strong>Spotify Argentina</strong> working first — it takes 3 minutes and you'll
    already have NordVPN set up. Then come back for this one.
  </div>
  <a class="alt-card-link" href="/guide_spotify">Spotify Easy Guide &rarr;</a>
</div>
""", unsafe_allow_html=True)

# ── Method matrix ─────────────────────────────────────────────────────────────
st.markdown("## Why most methods fail in 2026")
st.markdown("""
<table class="method-table">
  <tr><th>Method</th><th>Success Rate</th><th>Status</th></tr>
  <tr>
    <td>Direct credit card via VPN</td><td>~5%</td>
    <td><span class="tag-fail">Blocked</span> — Google BIN-locks non-Turkish cards (error OR-CCSEH-05)</td>
  </tr>
  <tr>
    <td>Wise / Revolut virtual card</td><td>~10%</td>
    <td><span class="tag-fail">Blocked</span> — European/UK BINs rejected at payment gateway</td>
  </tr>
  <tr>
    <td>Turkish Ininal card</td><td>~70%</td>
    <td><span class="tag-warn">Hard to get</span> — requires physical presence in Turkey or reseller</td>
  </tr>
  <tr>
    <td>Turkish Apple ID + iTunes gift card (iOS)</td><td>~95%</td>
    <td><span class="tag-best">Recommended</span> — Google cannot see the underlying payment source</td>
  </tr>
</table>
""", unsafe_allow_html=True)

st.markdown("""
<div class="tip-box">
  <strong>Why the Apple method works:</strong> When you pay through the App Store,
  Google only sees "Apple charged you in Turkish lira" — it cannot detect the origin
  of the funds or the country of your underlying payment method. This is called
  the "App Store shield." The trade-off: Apple takes a 15–30% cut, so the in-app
  price is ~10–15% higher than the direct web price. Even so, you save 80%+ vs US pricing.
</div>
""", unsafe_allow_html=True)

# ── Steps ──────────────────────────────────────────────────────────────────────
st.markdown("## Step-by-step: Apple IAP method (iOS required)")

st.markdown(f"""
<div class="step-row">
  <div class="step-n">1</div>
  <div class="step-t"><strong>Connect VPN to a Turkey server.</strong>
  Use obfuscated servers — standard VPN IPs are detected by Google.
  Keep the VPN active throughout the entire setup process.</div>
</div>
""", unsafe_allow_html=True)
render_vpn_list("YouTube Premium")

st.markdown(f"""
<div class="step-row">
  <div class="step-n">2</div>
  <div class="step-t"><strong>Create a new Turkish Apple ID via browser.</strong>
  Go to <a href="https://appleid.apple.com/account" target="_blank" style="color:#e63000;text-decoration:underline;">appleid.apple.com/account</a> in a browser (do NOT use the iOS system
  Settings app to register — it behaves differently). Select Turkey as your country.
  Set payment method to <strong>None</strong> — Apple officially supports this.
  Use your real email and phone number; Turkish phone is not required.
  For the address, use the template below.</div>
</div>
""", unsafe_allow_html=True)

st.markdown("""
<div class="tip-box">
  <strong>Turkish address template</strong> (change street number slightly to avoid duplicates):<br>
  Street: Mercimeklik, 3<br>
  Postcode: 19402<br>
  City: Çorum (Merkezköyler)<br>
  Phone: 342-2219452
</div>
""", unsafe_allow_html=True)

st.markdown("""
<div class="step-row">
  <div class="step-n">3</div>
  <div class="step-t"><strong>Sign in to App Store with the Turkish Apple ID.</strong>
  On your iPhone/iPad: App Store → tap your avatar → scroll down → Sign Out.
  Sign back in with the new Turkish Apple ID. Download any free app — Apple will show
  "This Apple ID has not been used in iTunes Store" — tap <strong>Review</strong>,
  agree to Terms, set payment to <strong>None</strong>, enter the Turkish address above,
  tap Next. This activates the account.</div>
</div>
""", unsafe_allow_html=True)
st.image(str(STATIC / "turkiye-youtube-premium-registration-a7.jpg"), caption="App Store — tap avatar → Sign Out, then sign in with Turkish Apple ID. Tap Review when prompted.", use_container_width=True)
st.image(str(STATIC / "turkiye-youtube-premium-registration-a8.jpg"), caption="Set payment to None, enter Turkish address, tap Next to activate the account.", use_container_width=True)

st.markdown(f"""
<div class="step-row">
  <div class="step-n">4</div>
  <div class="step-t"><strong>Buy Turkish iTunes gift cards.</strong>
  Recommended platforms: <strong>G2A</strong> or <strong>Eneba</strong>.
  Avoid SEAGM and TurGame — they require local ID verification.<br><br>

  <strong>4a. Search on G2A:</strong> Click the button below, then search
  <strong>iTunes Turkey</strong>
  in the search bar. Filter by <strong>Region: Turkey</strong> to avoid getting the
  wrong region. Select a seller with 95%+ positive ratings and a high number of sales.<br><br>

  <strong>4b. Choose the right amount:</strong>
  Individual plan → buy <strong>150 TL</strong> to test first (YouTube Premium Individual costs ~130 TL/month).
  Family plan → buy <strong>300 TL</strong> (Family plan costs ~230 TL/month).
  Buy only a small amount until you confirm the subscription works.<br><br>

  <strong>4c. Receive and save your code:</strong> Codes are delivered to your email
  within ~10 minutes. Copy the code — you will enter it in App Store in the next step.
  Do not share the code with anyone.<br><br>

  <a href="{G2A_URL}" target="_blank" style="display:inline-block;background:#111;color:#fff;
  font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;
  padding:0.45rem 1.2rem;text-decoration:none;margin-top:0.4rem">
  Buy iTunes Turkey Gift Card on G2A &rarr;</a>
  <div style="font-size:0.6rem;color:#999;margin-top:0.3rem">Affiliate link &middot; We may earn a commission</div>
  </div>
</div>
""", unsafe_allow_html=True)
st.image(str(STATIC / "turkiye-youtube-premium-registration-a9-1.jpg"), caption="iTunes Turkey Gift Card 300 TL on G2A — delivered instantly by email.", use_container_width=True)

st.markdown("""
<div class="step-row">
  <div class="step-n">5</div>
  <div class="step-t"><strong>Redeem the gift card in the App Store.</strong>
  App Store → tap your avatar → <strong>Redeem Gift Card or Code</strong>
  → tap "You can also enter your code manually" → enter the code → confirm with
  your Turkish Apple ID password. Your account will show a TL balance.</div>
</div>
""", unsafe_allow_html=True)
st.image(str(STATIC / "turkiye-youtube-premium-registration-a9.jpg"), caption="App Store → Redeem Gift Card or Code → enter code manually.", use_container_width=True)

st.markdown("""
<div class="step-row">
  <div class="step-n">6</div>
  <div class="step-t"><strong>Subscribe to YouTube Premium via the YouTube app.</strong>
  Open YouTube while the Turkish Apple ID is still active in App Store.
  Tap your profile → <strong>Get YouTube Premium</strong> → select Individual or Family plan
  → Confirm. App Store charges your TL balance. Turkish pricing applies.</div>
</div>
<div class="step-row">
  <div class="step-n">7</div>
  <div class="step-t"><strong>Switch back to your main Apple ID.</strong>
  Your YouTube Premium is linked to your Google account — not the Apple ID.
  You can switch back to your regular Apple ID for everything else.
  Keep the Turkish Apple ID only for topping up the gift card balance each month.</div>
</div>
""", unsafe_allow_html=True)

st.markdown("""
<div class="warn-box">
  <strong>Important — ongoing VPN requirement:</strong> Unlike Spotify, YouTube Premium
  tracks your IP history in the background. If your account is billed in Turkey but
  Google detects 90%+ of your viewing from a non-Turkish IP over time, it may trigger
  an automatic cancellation with an email asking you to update your payment method.
  Mitigation: use NordVPN's Turkey server for at least some of your YouTube sessions
  each month, especially when the subscription renews.
</div>
""", unsafe_allow_html=True)

render_nordvpn_banner()

render_nordvpn_cta(
    eyebrow="Required for all methods",
    body="Standard VPNs are detected by Google. You need NordVPN's obfuscated servers "
         "(called \"Obfuscated Servers\" in the settings) for Turkey. Required during "
         "Apple ID setup and recommended for ongoing YouTube sessions.",
    social_line="&#9733;&#9733;&#9733;&#9733;&#9733; &nbsp;4.9/5 &middot; 14M+ users &middot; Has Turkey obfuscated servers",
)

# ── FAQ ───────────────────────────────────────────────────────────────────────
st.markdown("## Common questions")

st.markdown("""
**Do I need an iPhone? What about Android?**
The Apple IAP method requires iOS. On Android, the equivalent would be a Turkish Google Play
gift card — but Google Play gift cards are harder to source internationally and the success
rate is lower. iOS is the recommended path. If you only have Android, borrow an iPhone/iPad
temporarily just for the initial setup steps.

**What if I get the OR-CCSEH-05 error?**
This means Google's payment gateway rejected your card due to BIN detection.
Do not retry with another card — switch to the Apple IAP method described above.

**Family plan: members get "Cannot join family group" error?**
This happens when the member's Google account country doesn't match Turkey. Fix:
1. The member goes to **Google Pay** (pay.google.com) → Settings → Payment profiles
2. Click the pencil icon next to their country → **Create new profile**
3. Select Turkey, enter the Turkish address template above, submit
4. Then close the old (non-Turkey) payment profile
5. Now try joining the family group again — it will succeed

Note: Google family group membership can only be changed **once per year** — confirm
everyone is committed before inviting. Maximum 5 members (plus the organiser = 6 total).

**How much should I top up each month?**
Individual plan: ~105 TL/month (iOS price includes Apple's 15–30% cut).
Family plan: ~210 TL/month. Buy 3–6 months upfront to avoid gaps —
if your TL balance hits zero, YouTube Premium auto-cancels.

**Is this against YouTube's Terms of Service?**
Yes. Using a VPN to access regional pricing violates YouTube's ToS.
Google has been actively enforcing this with mass account cancellations in 2024–2026.
The Apple IAP method reduces detection risk but does not eliminate it.
Proceed at your own risk.
""")

render_footer("This guide reflects methods verified as of 2026. "
              "Google actively updates its detection systems — success is not guaranteed.")
