import GuideLayout from '@/components/GuideLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import WarningBox from '@/components/WarningBox';
import EnhancedStepList from '@/components/EnhancedStepList';
import VPNAffiliateCTA from '@/components/VPNAffiliateCTA';

export const metadata = {
  title: 'How to Get YouTube Premium Argentina Price 2026 | Subpricing',
  description: 'Complete guide to getting YouTube Premium at Argentina prices. Step-by-step instructions with 90%+ success rate using Turkey geo-arbitrage method.',
};

export default function YouTubePremiumGuidePage() {
  const steps = [
    {
      number: 1,
      title: 'Connect VPN to Turkey server',
      description: (
        <>
          <p className="mb-3">
            Turkey offers the best balance of price and ease of setup for YouTube Premium.
            Connect to a Turkey VPN server before proceeding. Open an incognito window.
          </p>
          <p className="font-semibold text-gray-900">Recommended VPNs:</p>
          <ol className="list-decimal ml-6 mt-2 space-y-1">
            <li><a href="https://nordvpn.com" target="_blank" rel="noopener" className="text-red-600 font-bold underline">NordVPN</a> — best for YouTube</li>
            <li>ExpressVPN</li>
            <li>Surfshark</li>
          </ol>
        </>
      ),
      image: '/guide-images/windows-laptop-connected-us.png',
      imageCaption: 'Connect to Turkey server — verify IP shows Turkey location'
    },
    {
      number: 2,
      title: 'Create a new Google account (or use existing)',
      description: (
        <>
          <p className="mb-3">
            While still on Turkey VPN, create a new Google account at accounts.google.com.
            You can also use an existing account, but a fresh account has higher success rates.
          </p>
          <p className="text-sm text-gray-600">
            <strong>Important:</strong> Use a Turkish address for your Google profile.
            Example: "Istiklal Caddesi 123, Beyoglu, Istanbul, Turkey"
          </p>
        </>
      )
    },
    {
      number: 3,
      title: 'Go to youtube.com and start Premium trial',
      description: (
        <>
          <p className="mb-3">
            Visit youtube.com (while on Turkey VPN) → Click your profile → YouTube Premium → Try it free.
            The page should show pricing in Turkish Lira (₺).
          </p>
          <p className="text-sm text-amber-700 bg-amber-50 p-3 rounded">
            <strong>Checkpoint:</strong> If you see USD pricing instead of ₺, disconnect VPN,
            clear all cookies, and restart from Step 1 in a fresh incognito window.
          </p>
        </>
      ),
      image: '/guide-images/turkiye-youtube-premium-registration-a7.jpg',
      imageCaption: 'YouTube Premium Turkey page — price shown in ₺ confirms VPN is working'
    },
    {
      number: 4,
      title: 'Enter payment details',
      description: (
        <>
          <p className="mb-3">
            Use an international credit/debit card. Most Visa/Mastercard cards work.
            When asked for billing address, enter a Turkish address (can be the same as your Google profile).
          </p>
          <div className="bg-blue-50 p-3 rounded text-sm">
            <strong>Payment tips:</strong>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Virtual cards (Revolut, Wise) work well</li>
              <li>Billing address must be in Turkey</li>
              <li>Use format: Street, District, City, Postal Code, Turkey</li>
            </ul>
          </div>
        </>
      ),
      image: '/guide-images/turkiye-youtube-premium-registration-a9.jpg',
      imageCaption: 'Payment screen — enter card details with Turkish billing address'
    },
    {
      number: 5,
      title: 'Complete signup and disconnect VPN',
      description: (
        <>
          <p className="mb-3">
            Finish the signup process. After your Premium activates, you can disconnect the VPN.
            YouTube Premium works worldwide without VPN after activation.
          </p>
          <p className="text-sm text-green-700 bg-green-50 p-3 rounded">
            ✓ Success! You now have YouTube Premium at Turkey pricing.
            Your card will be charged monthly at the Turkey rate.
          </p>
        </>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Guides', href: '/' },
            { label: 'YouTube Premium Guide', href: '/guide/youtube-premium' }
          ]}
        />

        <GuideLayout
          title="How to Get YouTube Premium Turkey Price (2026 Guide)"
          difficulty="Medium"
          vpnRequired={true}
          estimatedTime="20-30 minutes"
        >
          <div className="prose max-w-none">
            <p className="text-sm text-gray-600 mb-4">
              Turkey method · One-time VPN setup · 90%+ success rate
            </p>

            <div className="inline-block px-4 py-2 bg-yellow-50 border border-yellow-200 text-yellow-900 font-bold text-xs uppercase tracking-wide rounded mb-6">
              Difficulty: Medium · Easier than Netflix, harder than Spotify
            </div>

            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Best Deals</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Turkey Individual:</span>
                  <span className="font-semibold">$1.55/month (90% savings)</span>
                </li>
                <li className="flex justify-between">
                  <span>Argentina Individual:</span>
                  <span className="font-semibold">$0.67/month (96% savings)</span>
                </li>
                <li className="flex justify-between">
                  <span>India Individual:</span>
                  <span className="font-semibold">$1.28/month (92% savings)</span>
                </li>
              </ul>
            </div>

            <WarningBox type="tip" title="Why Turkey is recommended">
              <p>
                While Argentina is cheapest, it requires more verification steps.
                Turkey offers the best balance: significantly cheaper than US pricing,
                with straightforward setup that accepts most international credit cards.
              </p>
            </WarningBox>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-6">
              Step-by-step: YouTube Premium Turkey
            </h2>

            <EnhancedStepList steps={steps} />

            <WarningBox type="warning" title="Common Issues & Solutions">
              <div className="space-y-3">
                <div>
                  <strong>Issue:</strong> Pricing shows in USD instead of ₺<br/>
                  <strong>Solution:</strong> Clear all cookies, disconnect VPN, reconnect to Turkey, use fresh incognito window
                </div>
                <div>
                  <strong>Issue:</strong> Payment declined<br/>
                  <strong>Solution:</strong> Try a different card or use a virtual card (Revolut/Wise) with Turkish billing address
                </div>
                <div>
                  <strong>Issue:</strong> "This offer is not available in your country"<br/>
                  <strong>Solution:</strong> Your Google account may be region-locked. Create a brand new Google account while on VPN
                </div>
              </div>
            </WarningBox>

            <WarningBox type="danger" title="Important: Account Region Lock">
              <p>
                Google may lock your account to the country you sign up in. This means:
              </p>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>You cannot easily switch countries later</li>
                <li>YouTube Music library may have regional restrictions</li>
                <li>Family sharing requires all members appear to be in Turkey</li>
              </ul>
              <p className="mt-3">
                <strong>Recommendation:</strong> Use a dedicated Google account only for YouTube Premium.
              </p>
            </WarningBox>

            <VPNAffiliateCTA
              service="YouTube Premium"
              eyebrow="Required for initial setup"
              body="You need VPN only during account creation. After Premium activates, YouTube works worldwide without VPN."
            />

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">
              Common Questions
            </h2>

            <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
              <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 className="font-bold text-gray-900 mb-2" itemProp="name">
                  Do I need VPN every time I watch YouTube?
                </h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text" className="text-gray-700">
                    No. After activating Premium, you can watch from anywhere without VPN.
                    You only need VPN for the initial signup.
                  </p>
                </div>
              </div>

              <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 className="font-bold text-gray-900 mb-2" itemProp="name">
                  Can I use my main Google account?
                </h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text" className="text-gray-700">
                    You can, but it's risky. If your main account is already locked to your home country,
                    YouTube may reject the subscription. We recommend using a fresh Google account.
                  </p>
                </div>
              </div>

              <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 className="font-bold text-gray-900 mb-2" itemProp="name">
                  Will my credit card work?
                </h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text" className="text-gray-700">
                    Most international Visa/Mastercard cards work for Turkey. Virtual cards from
                    Revolut or Wise have very high success rates. The key is using a Turkish billing address.
                  </p>
                </div>
              </div>

              <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 className="font-bold text-gray-900 mb-2" itemProp="name">
                  What happens if I travel or move countries?
                </h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text" className="text-gray-700">
                    YouTube Premium continues to work worldwide. Your subscription remains at Turkey pricing
                    even if you're physically in another country.
                  </p>
                </div>
              </div>

              <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 className="font-bold text-gray-900 mb-2" itemProp="name">
                  Is this against YouTube's Terms of Service?
                </h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text" className="text-gray-700">
                    Using a VPN to access different regional pricing may violate Terms of Service.
                    However, enforcement varies. Many users successfully maintain these subscriptions long-term.
                    Proceed at your own risk.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-600">
              <p>
                <strong>Disclaimer:</strong> This guide reflects methods verified as of 2026.
                YouTube/Google policies change frequently.
                Terms of service compliance is your responsibility.
              </p>
            </div>
          </div>
        </GuideLayout>
      </div>
    </div>
  );
}
