"""
pages/guide_youtube_premium.py
-------------------------------
How-to guide: Get YouTube Premium cheap via Turkish Apple ID + gift cards.
Difficulty: Very Hard — Apple IAP method is the only reliable bypass in 2026.
"""

import streamlit as st
from pathlib import Path
import os

STATIC = Path(os.path.dirname(os.path.abspath(__file__))).parent / "static"

NORDVPN_URL = "https://go.nordvpn.net/aff_c?offer_id=15&aff_id=143797&url_id=902"
WISE_URL     = "https://wise.com/invite/i/PLACEHOLDER"  # TODO: replace with affiliate link
G2A_URL      = "https://www.g2a.com/PLACEHOLDER"        # TODO: replace with G2A Goldmine affiliate link

st.set_page_config(
    page_title="How to Get YouTube Premium Turkey Price 2026 — Full Guide",
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
                  background: #fce4ec; color: #880e24; border: 1px solid #f48fb1; }
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
    '<a href="https://subpricing.com/">Home</a> &rsaquo; Guides &rsaquo; YouTube Premium'
    '</div>',
    unsafe_allow_html=True,
)

st.markdown("# How to Get YouTube Premium Turkey Price (2026 Guide)")
st.markdown(
    "<p style='font-size:0.78rem;color:#888;margin-top:0.3rem'>"
    "Apple IAP method · Turkish iTunes gift cards · iOS required</p>",
    unsafe_allow_html=True,
)
st.markdown(
    '<div class="diff-badge">Difficulty: Very Hard &nbsp;·&nbsp; Read this fully before attempting</div>',
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
    <td>Wise / virtual card</td><td>~10%</td>
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
st.markdown(f"""
<div style="font-size:0.85rem;color:#333;margin:0 0 1rem 2.2rem;line-height:2">
  Do not have VPN?<br>
  1. <a href="{NORDVPN_URL}" target="_blank" style="color:#e63000;font-weight:700;text-decoration:underline;">NordVPN</a> — obfuscated servers, best for YouTube Premium<br>
  2. ExpressVPN<br>
  3. Surfshark
</div>
""", unsafe_allow_html=True)
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
  Avoid SEAGM and TurGame — they require local ID verification.
  Individual plan: buy <strong>150 TL</strong> to test first.
  Family plan: buy <strong>300 TL</strong>. Codes arrive by email within ~10 minutes.
  Buy only a small amount initially until you confirm the subscription works.<br><br>
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

# ── CTA ───────────────────────────────────────────────────────────────────────
st.markdown(f"""
<div class="cta-block">
  <div class="cta-block-eyebrow">Required for all methods</div>
  <div class="cta-block-headline">Get NordVPN with obfuscated servers</div>
  <div class="cta-block-sub">
    Standard VPNs are detected by Google. You need NordVPN's obfuscated servers
    (called "Obfuscated Servers" in the settings) for Turkey. Required during
    Apple ID setup and recommended for ongoing YouTube sessions.
  </div>
  <div class="cta-social">&#9733;&#9733;&#9733;&#9733;&#9733; &nbsp;4.9/5 &middot; 14M+ users &middot; Has Turkey obfuscated servers</div>
  <a class="cta-main-btn" href="{NORDVPN_URL}" target="_blank">Get NordVPN &rarr;</a>
  <div class="cta-disclaimer">Affiliate link &middot; We may earn a commission at no extra cost to you</div>
</div>

<div class="cta-block" style="background:#1a1a1a;margin-top:0.8rem">
  <div class="cta-block-eyebrow">For managing multi-currency payments</div>
  <div class="cta-block-headline">Open a Wise account</div>
  <div class="cta-block-sub">
    Wise lets you hold Turkish lira and issue a virtual debit card — useful for
    purchasing iTunes gift cards on platforms that accept card payments,
    and for other geo-arbitrage services where Wise BINs are not blocked.
  </div>
  <a class="cta-main-btn" href="{WISE_URL}" target="_blank">Open Wise Account &rarr;</a>
  <div class="cta-disclaimer">Affiliate link &middot; We may earn a commission at no extra cost to you</div>
</div>
""", unsafe_allow_html=True)

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

st.markdown("<hr>", unsafe_allow_html=True)
st.markdown(
    '<p class="page-footer">This guide reflects methods verified as of 2026. '
    'Google actively updates its detection systems — success is not guaranteed. '
    'Terms of service compliance is your responsibility.</p>',
    unsafe_allow_html=True,
)
