import GuideLayout from '@/components/GuideLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import WarningBox from '@/components/WarningBox';
import MethodComparisonTable from '@/components/MethodComparisonTable';
import EnhancedStepList from '@/components/EnhancedStepList';
import VPNAffiliateCTA from '@/components/VPNAffiliateCTA';

export const metadata = {
  title: 'How to Get Netflix Turkey Price 2026 — Full Guide | Subpricing',
  description: 'Comprehensive 2026 guide on how to get Netflix Turkey price using gift cards. Step-by-step instructions with screenshots, risk assessment, and VPN requirements.',
};

export default function NetflixGuidePage() {
  const methods = [
    {
      name: 'Foreign credit card (direct)',
      successRate: '~0%',
      status: 'blocked' as const,
      description: 'Netflix rejects all non-Turkish cards outright'
    },
    {
      name: 'Wise / Revolut virtual card',
      successRate: '~0%',
      status: 'blocked' as const,
      description: 'BIN detection, same as direct card'
    },
    {
      name: 'Netflix Turkey gift card (G2A)',
      successRate: '~90%',
      status: 'risky' as const,
      description: '30-day VPN lock, active ban enforcement'
    }
  ];

  const steps = [
    {
      number: 1,
      title: 'Buy a Netflix Turkey gift card on G2A — before opening VPN',
      description: (
        <>
          <p className="mb-3">
            Search "Netflix Gift Card TRY Turkey" on G2A. Available in 100, 200, 300 TRY.
            <strong className="text-gray-900"> 300 TRY is best value</strong> and can be stacked across months.
            Start with one 300 TRY card to test.
          </p>
          <p className="mb-3">
            <strong className="text-red-600">Do NOT connect VPN when buying on G2A</strong> — some cards fail to purchase
            with VPN active. Use your normal connection for this step only.
            The gift card code arrives by email within minutes.
          </p>
          <a
            href="https://www.g2a.com/netflix-gift-card-try-turkey-try-cd-key-global-i10000008113002"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-red-600 text-white font-bold text-xs uppercase tracking-wide px-5 py-2 rounded mt-2 hover:bg-red-700"
          >
            Buy Netflix Turkey Gift Card on G2A →
          </a>
          <div className="text-xs text-gray-500 mt-2">Affiliate link · We may earn a commission</div>
        </>
      ),
      image: '/guide-images/g2a_product_page.jpg',
      imageCaption: 'G2A product page — select 300 TRY, then click "View offers from other sellers" to find the cheapest listing'
    },
    {
      number: 2,
      title: 'Now connect VPN to a Turkey server',
      description: (
        <>
          <p className="mb-3">
            Use obfuscated servers — Netflix's VPN detection is aggressive and blocks standard IPs.
            Open an incognito window before going to netflix.com.
          </p>
          <p className="font-semibold text-gray-900">Don't have VPN?</p>
          <ol className="list-decimal ml-6 mt-2 space-y-1">
            <li><a href="https://nordvpn.com" target="_blank" rel="noopener" className="text-red-600 font-bold underline">NordVPN</a> — obfuscated servers, best for Netflix</li>
            <li>ExpressVPN</li>
            <li>Surfshark</li>
          </ol>
        </>
      ),
      image: '/guide-images/windows-laptop-connected-us.png',
      imageCaption: 'NordVPN connected to Turkey server — ensure connection is stable before proceeding'
    },
    {
      number: 3,
      title: 'Create a new Netflix account at netflix.com',
      description: (
        <>
          <p className="mb-3">
            Do not use an existing account. Enter your email → set a password → when prompted
            for payment method, select <strong className="text-gray-900">"Gift Card / Promo Code"</strong> —
            do NOT enter a credit card. Paste the code from G2A. Your account activates immediately.
          </p>
        </>
      ),
      image: '/guide-images/netflix_turkey_homepage.jpg',
      imageCaption: 'Netflix Turkey homepage — price shown in TL confirms VPN is working correctly'
    },
    {
      number: 4,
      title: 'Keep VPN active for the first ~30 days',
      description: (
        <>
          <p className="mb-3">
            Watch Netflix via NordVPN Turkey server during this period. After roughly one month,
            many users report being able to watch without VPN — though this varies by account
            and is not guaranteed. Keep VPN handy regardless.
          </p>
        </>
      )
    },
    {
      number: 5,
      title: 'Renew before balance runs out',
      description: (
        <>
          <p>
            Account → Manage Payment Info → <strong className="text-gray-900">Redeem Gift Card or Promo Code</strong>.
            Enter a new code while on Turkey VPN. Netflix does not auto-charge —
            if balance hits zero, the account pauses automatically.
          </p>
        </>
      ),
      image: '/guide-images/netflix_enter_gift_code.jpg',
      imageCaption: 'Enter your gift card code and click "Redeem Gift Code"'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Guides', href: '/' },
            { label: 'Netflix Guide', href: '/guide/netflix' }
          ]}
        />

        <GuideLayout
          title="How to Get Netflix Turkey Price (2026 Guide)"
          difficulty="Hard"
          vpnRequired={true}
          estimatedTime="30-45 minutes"
        >
          <div className="prose max-w-none">
            <p className="text-sm text-gray-600 mb-4">
              Gift card method · 30-day VPN lock-in · Active enforcement — read risks first
            </p>

            <div className="inline-block px-4 py-2 bg-red-50 border border-red-200 text-red-900 font-bold text-xs uppercase tracking-wide rounded mb-6">
              Difficulty: Hard · High ban risk — understand the risks before proceeding
            </div>

            <WarningBox type="danger" title="2026 Enforcement Update">
              <p>
                Netflix conducted mass account bans in June 2024 targeting cross-region gift card accounts.
                Some users report accounts banned with balances forfeited — Netflix does not refund gift card value on banned accounts.
                New account registrations are currently higher risk. <strong>Proceed only if you accept this.</strong>
              </p>
            </WarningBox>

            <WarningBox type="tip" title="Lower Risk Alternative">
              <p className="mb-2">
                If you want a guaranteed win first, set up <strong>Spotify Argentina</strong> —
                it takes 3 minutes, has a 95%+ success rate, and you'll have NordVPN ready
                before attempting Netflix.
              </p>
              <a href="/guide/spotify" className="text-blue-700 font-bold underline">
                Spotify Easy Guide →
              </a>
            </WarningBox>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-6">
              Which method works in 2026?
            </h2>

            <MethodComparisonTable methods={methods} />

            <WarningBox type="tip" title="Why gift cards work (but only partially)">
              <p>
                Netflix's payment system cannot detect the origin of a gift card code — it just sees a valid balance.
                However, Netflix monitors your IP activity after signup. If you watch from a
                non-Turkish IP within the first ~30 days, or if Netflix's systems flag your
                account behavior, it will lock you to Turkey and require a Turkish connection
                to watch — or ban the account outright.
              </p>
            </WarningBox>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-6">
              Step-by-step: Netflix Turkey gift card method
            </h2>

            <EnhancedStepList steps={steps} />

            <WarningBox type="warning" title="If your G2A card payment fails">
              <p>
                Disconnect VPN first, then try again on your normal connection — this resolves most G2A payment failures.
                If still failing, try a different browser or contact G2A support to swap the code.
              </p>
            </WarningBox>

            <WarningBox type="danger" title="If your account is banned">
              <p>
                Netflix's ban message reads: "Your account has been blocked due to violation of our rules and policies."
                Banned accounts are permanent and gift card balances are not refunded.
                This is why we recommend buying only 1 month of gift cards initially.
              </p>
            </WarningBox>

            <VPNAffiliateCTA
              service="Netflix"
              eyebrow="Required — use obfuscated servers"
              body="Standard VPN IPs are on Netflix's blocklist. NordVPN's obfuscated servers mask VPN traffic as regular HTTPS, significantly improving success rate. Required for both account creation and the 30-day lock-in period."
            />

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
              Common Questions
            </h2>

            <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
              <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 className="font-bold text-gray-900 mb-2" itemProp="name">
                  Can I use my existing Netflix account?
                </h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text" className="text-gray-700">
                    No. Your existing account is tied to your home country and payment method.
                    You need a brand new account with the Turkish gift card as the only payment method.
                  </p>
                </div>
              </div>

              <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 className="font-bold text-gray-900 mb-2" itemProp="name">
                  Can I switch back to credit card after setting up?
                </h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text" className="text-gray-700">
                    No. Netflix detects your card's country of issue — non-Turkish cards are rejected
                    on a Turkish account. Gift card top-ups are the only option going forward.
                  </p>
                </div>
              </div>

              <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 className="font-bold text-gray-900 mb-2" itemProp="name">
                  Do I need VPN every time I watch?
                </h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text" className="text-gray-700">
                    For the first ~30 days: yes, use NordVPN Turkey. After that, many users report
                    being able to watch without VPN — but this varies. Some accounts need VPN permanently,
                    others unlock after a month. Keep VPN installed regardless.
                  </p>
                </div>
              </div>

              <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 className="font-bold text-gray-900 mb-2" itemProp="name">
                  What if my account gets banned?
                </h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text" className="text-gray-700">
                    Netflix's ban message: "Your account has been blocked due to violation of our rules."
                    Bans are permanent. Gift card balances are **not refunded**. This is why we recommend
                    starting with one 300 TRY card — don't load large balances on a new account.
                  </p>
                </div>
              </div>

              <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 className="font-bold text-gray-900 mb-2" itemProp="name">
                  Is this against Netflix's Terms of Service?
                </h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text" className="text-gray-700">
                    Yes. Netflix explicitly prohibits VPN use for geo-pricing arbitrage.
                    Enforcement is active and increasing. Proceed at your own risk.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-600">
              <p>
                <strong>Disclaimer:</strong> This guide reflects methods verified as of 2026.
                Netflix enforcement policies change frequently.
                We do not recommend loading large gift card balances on new accounts.
                Terms of service compliance is your responsibility.
              </p>
            </div>
          </div>
        </GuideLayout>
      </div>
    </div>
  );
}
