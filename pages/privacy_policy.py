"""
pages/privacy_policy.py
-----------------------
Privacy Policy for subpricing.com
"""

import streamlit as st

st.set_page_config(
    page_title="Privacy Policy — SubPricing.com",
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
    hr { border: none; border-top: 1px solid #e0e0e0; margin: 1.8rem 0; }
    .page-footer { font-size: 0.68rem; color: #bbb; text-align: center; }
    #MainMenu, footer, [data-testid="stToolbar"] { display: none; }
</style>
"""

st.markdown(_CSS, unsafe_allow_html=True)

st.page_link("app.py", label="← Back to Dashboard")

st.markdown(
    '<div class="breadcrumb">'
    '<a href="https://subpricing.com/">Home</a> &rsaquo; Privacy Policy'
    '</div>',
    unsafe_allow_html=True,
)

st.markdown("# Privacy Policy")
st.markdown(
    "<p style='font-size:0.78rem;color:#888;margin-top:0.3rem'>"
    "Last updated: March 2026</p>",
    unsafe_allow_html=True,
)

st.markdown("""
## 1. Who We Are

SubPricing.com ("we", "us", "our") is a price comparison website that tracks
subscription service pricing across different geographic regions. Our website is
located at https://subpricing.com.

For privacy-related enquiries, contact us at: **admin@subpricing.com**

## 2. What Information We Collect

We do not require users to create an account or submit personal information to use
this website. However, we may collect the following data automatically:

- **Usage data**: pages visited, time spent, browser type, device type, and referring URL
- **IP address**: collected anonymously for analytics and fraud prevention
- **Cookies**: small text files stored on your device (see Section 5)

## 3. How We Use Your Information

We use collected data solely to:

- Understand how visitors use the site and improve content
- Monitor website performance and uptime
- Comply with legal obligations

We do not sell, rent, or trade your personal data to third parties.

## 4. Affiliate Links & Third Parties

This website contains affiliate links to third-party services including NordVPN,
Wise, and others. When you click an affiliate link, you may be directed to a
third-party website. We are not responsible for the privacy practices of those
websites and encourage you to review their privacy policies.

We may receive a commission when you purchase through our affiliate links, at no
extra cost to you.

## 5. Cookies

We use cookies to:

- Analyse website traffic (via analytics tools)
- Remember your preferences

You can disable cookies in your browser settings at any time. Disabling cookies
will not affect your ability to use this website.

## 6. Third-Party Analytics

We may use analytics services (such as Google Analytics) that collect anonymised
usage data. These services have their own privacy policies which govern how they
handle data.

## 7. Data Retention

We retain anonymised usage data for up to 26 months. We do not store personally
identifiable information beyond what is necessary for legal compliance.

## 8. Your Rights

Depending on your location, you may have the right to:

- Access the personal data we hold about you
- Request correction or deletion of your data
- Object to or restrict processing of your data
- Lodge a complaint with your local data protection authority

To exercise any of these rights, contact us at **admin@subpricing.com**.

## 9. Children's Privacy

This website is not directed at children under the age of 13. We do not knowingly
collect personal data from children.

## 10. Changes to This Policy

We may update this Privacy Policy from time to time. The "Last updated" date at
the top of this page reflects when changes were last made. Continued use of the
site after changes constitutes acceptance of the updated policy.

## 11. Contact

For any privacy-related questions:
**Email**: admin@subpricing.com
**Address**: subpricing.com is operated online with no physical office address.
""")

st.markdown("<hr>", unsafe_allow_html=True)
st.markdown(
    '<p class="page-footer">SubPricing.com — For informational purposes only.</p>',
    unsafe_allow_html=True,
)
