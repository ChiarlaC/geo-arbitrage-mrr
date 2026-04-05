import GuideLayout from '@/components/GuideLayout';
import Breadcrumbs from '@/components/Breadcrumbs';
import WarningBox from '@/components/WarningBox';
import EnhancedStepList from '@/components/EnhancedStepList';
import VPNAffiliateCTA from '@/components/VPNAffiliateCTA';

export const metadata = {
  title: 'How to Get Disney+ at Lower Prices 2026 | Subpricing',
  description: 'Complete guide to getting Disney+ at Turkey or Argentina prices. Save up to 90% with our step-by-step instructions.',
};

export default function DisneyPlusGuidePage() {
  const steps = [
    {
      number: 1,
      title: 'Choose Turkey for easiest setup',
      description: (
        <>
          <p className="mb-3">
            Turkey offers excellent Disney+ pricing with straightforward payment options.
            Connect to a Turkey VPN server and open an incognito browser.
          </p>
        </>
      )
    },
    {
      number: 2,
      title: 'Create new Disney+ account',
      description: (
        <>
          <p>
            Visit disneyplus.com (while on VPN) and create a new account.
            Use a fresh email. Pricing should show in Turkish Lira (₺).
          </p>
        </>
      )
    },
    {
      number: 3,
      title: 'Enter payment details',
      description: (
        <>
          <p className="mb-3">
            Most international credit cards work. Use a Turkish billing address.
            Virtual cards (Revolut, Wise) have high success rates.
          </p>
        </>
      )
    },
    {
      number: 4,
      title: 'Complete subscription and enjoy',
      description: (
        <>
          <p>
            After activation, disconnect VPN. Disney+ works worldwide without VPN after setup.
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
            { label: 'Disney+ Guide', href: '/guide/disney-plus' }
          ]}
        />

        <GuideLayout
          title="How to Get Disney+ at International Prices"
          difficulty="Medium"
          vpnRequired={true}
          estimatedTime="20-30 minutes"
        >
          <div className="prose max-w-none">
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Best Deals</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Turkey Monthly:</span>
                  <span className="font-semibold">$2.22/month (84% savings)</span>
                </li>
                <li className="flex justify-between">
                  <span>Argentina Monthly:</span>
                  <span className="font-semibold">$2.34/month (83% savings)</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-6">
              Step-by-step Guide
            </h2>

            <EnhancedStepList steps={steps} />

            <WarningBox type="warning" title="Important Notes">
              <ul className="space-y-2 list-disc ml-4">
                <li>Disney+ may request re-verification occasionally</li>
                <li>Content library varies by region</li>
                <li>Account sharing across regions may trigger security checks</li>
              </ul>
            </WarningBox>

            <VPNAffiliateCTA
              service="Disney+"
              eyebrow="VPN Required for Setup"
              body="You need VPN only during account creation. After subscription activates, Disney+ works worldwide."
            />

            <div className="mt-12 p-6 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-600">
              <p>
                <strong>Disclaimer:</strong> Terms of service compliance is your responsibility.
                This guide is for educational purposes only.
              </p>
            </div>
          </div>
        </GuideLayout>
      </div>
    </div>
  );
}
