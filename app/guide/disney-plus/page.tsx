import GuideLayout from '@/components/GuideLayout';
import StepList from '@/components/StepList';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function DisneyPlusGuidePage() {
  const steps = [
    {
      number: 1,
      title: 'Select Target Country',
      description: 'Choose a country with lower Disney+ pricing. Best options include Turkey, Argentina, India, and Indonesia. Check our pricing table for current rates.',
      estimatedTime: '5 minutes',
      important: true
    },
    {
      number: 2,
      title: 'Get a Reliable VPN',
      description: 'Subscribe to a VPN service with servers in your target country. NordVPN and ExpressVPN have good coverage for Disney+ regions.',
      estimatedTime: '10 minutes'
    },
    {
      number: 3,
      title: 'Connect VPN and Prepare Browser',
      description: 'Connect to a server in your target country. Use incognito/private browsing mode and clear cookies to ensure Disney+ sees you as a new user from that location.',
      estimatedTime: '3 minutes',
      important: true
    },
    {
      number: 4,
      title: 'Create New Disney+ Account',
      description: 'Visit DisneyPlus.com and create a new account. Use an email address not previously associated with Disney+. The site should display prices in local currency.',
      estimatedTime: '10 minutes',
      important: true
    },
    {
      number: 5,
      title: 'Set Up Payment Method',
      description: 'Use a payment method that works in the target country. Virtual cards (Revolut, Wise) or gift cards from the target region often work best.',
      estimatedTime: '15 minutes'
    },
    {
      number: 6,
      title: 'Complete Subscription',
      description: 'Select your plan and complete the subscription process. Disney+ may send a verification email to confirm your account.',
      estimatedTime: '5 minutes'
    },
    {
      number: 7,
      title: 'Enjoy Streaming',
      description: 'After successful subscription, you can disconnect the VPN for normal streaming. Some content may require VPN for regional restrictions.',
      estimatedTime: '2 minutes'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Guides', href: '/guide' },
            { label: 'Disney+ Guide', href: '/guide/disney-plus' }
          ]}
        />
        
        <GuideLayout
          title="How to Get Disney+ at International Prices"
          difficulty="Medium"
          vpnRequired={true}
          estimatedTime="50-70 minutes"
        >
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
            <p className="mb-6">
              Disney+ uses aggressive regional pricing, with significant differences between countries.
              By subscribing through a country with lower pricing, you can save up to 88% compared to US prices.
              Disney+ content libraries also vary by region, with some countries having more extensive catalogs.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Best Deals</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Turkey Standard:</span>
                  <span className="font-semibold">$1.52/month (88% savings)</span>
                </li>
                <li className="flex justify-between">
                  <span>Argentina Standard:</span>
                  <span className="font-semibold">$1.73/month (86% savings)</span>
                </li>
                <li className="flex justify-between">
                  <span>India Standard:</span>
                  <span className="font-semibold">$2.15/month (83% savings)</span>
                </li>
                <li className="flex justify-between">
                  <span>Indonesia Standard:</span>
                  <span className="font-semibold">$2.58/month (79% savings)</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Step-by-Step Guide</h2>
            <StepList steps={steps} />

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Content Library Differences</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Movies</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">TV Shows</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Local Content</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Turkey</td>
                      <td className="px-4 py-3 text-sm text-gray-600">~850</td>
                      <td className="px-4 py-3 text-sm text-gray-600">~300</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Limited Turkish content</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Argentina</td>
                      <td className="px-4 py-3 text-sm text-gray-600">~900</td>
                      <td className="px-4 py-3 text-sm text-gray-600">~350</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Some Latin American content</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">India</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">~1,200</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">~500</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Extensive Indian content</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Indonesia</td>
                      <td className="px-4 py-3 text-sm text-gray-600">~800</td>
                      <td className="px-4 py-3 text-sm text-gray-600">~280</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Indonesian local content</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 p-6 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-3">Disney+ Features by Region</h3>
              <ul className="space-y-2 text-purple-800">
                <li>• 4K streaming available in all major regions</li>
                <li>• Simultaneous streams: 4 devices (most regions)</li>
                <li>• Download for offline viewing: Yes (all regions)</li>
                <li>• Star content (adult-oriented): Available in select regions</li>
                <li>• Hulu/ESPN+ bundles: US only</li>
              </ul>
            </div>

            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Payment Methods by Country</h3>
              <ul className="space-y-2 text-blue-800">
                <li>• Turkey: International credit cards often work, gift cards available</li>
                <li>• Argentina: Virtual cards (Revolut) work well, local payment options limited</li>
                <li>• India: UPI, local credit/debit cards, international cards may be blocked</li>
                <li>• Indonesia: Local bank transfers, credit cards, some international cards</li>
              </ul>
            </div>

            <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-900 mb-3">Important Considerations</h3>
              <ul className="space-y-2 text-yellow-800">
                <li>• Disney+ may require periodic location verification</li>
                <li>• Content availability varies significantly by region</li>
                <li>• Some payment methods may trigger additional verification</li>
                <li>• Using VPNs may violate Disney+ Terms of Service</li>
                <li>• Regional pricing changes more frequently than other services</li>
              </ul>
            </div>
          </div>
        </GuideLayout>
      </div>
    </div>
  );
}
