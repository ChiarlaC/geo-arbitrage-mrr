import GuideLayout from '@/components/GuideLayout';
import StepList from '@/components/StepList';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function SpotifyGuidePage() {
  const steps = [
    {
      number: 1,
      title: 'Select a Low-Cost Country',
      description: 'Choose a country with significantly lower Spotify pricing. Top choices include Argentina, Turkey, Pakistan, and Egypt. Check our pricing table for the latest rates.',
      estimatedTime: '5 minutes',
      important: true
    },
    {
      number: 2,
      title: 'Setup a VPN Service',
      description: 'Subscribe to a VPN provider with servers in your target country. NordVPN and Surfshark are reliable options that work well with Spotify.',
      estimatedTime: '10 minutes'
    },
    {
      number: 3,
      title: 'Connect VPN to Target Country',
      description: 'Launch your VPN app and connect to a server in your chosen country. Verify your IP address shows the correct location.',
      estimatedTime: '2 minutes',
      important: true
    },
    {
      number: 4,
      title: 'Use Incognito Browser',
      description: 'Open a private/incognito browser window to prevent location tracking from cookies and cache. This ensures Spotify sees you as a new user from the target country.',
      estimatedTime: '1 minute'
    },
    {
      number: 5,
      title: 'Create New Spotify Account',
      description: 'Visit Spotify.com and sign up for a new account. Use an email address not previously associated with Spotify. The pricing should display in local currency.',
      estimatedTime: '10 minutes',
      important: true
    },
    {
      number: 6,
      title: 'Choose Payment Method',
      description: 'Use an international payment method. Virtual cards (Revolut, Wise) or local gift cards from the target country work best. Some countries accept international credit cards.',
      estimatedTime: '15 minutes'
    },
    {
      number: 7,
      title: 'Verify and Enjoy Music',
      description: 'Complete the verification process and start streaming! After account creation, you can disconnect the VPN for regular use, but keep it for occasional verification.',
      estimatedTime: '5 minutes'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Guides', href: '/guide' },
            { label: 'Spotify Guide', href: '/guide/spotify' }
          ]}
        />
        
        <GuideLayout
          title="How to Get Spotify Premium at International Prices"
          difficulty="Easy"
          vpnRequired={true}
          estimatedTime="40-50 minutes"
        >
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
            <p className="mb-6">
              Spotify uses regional pricing, with significant variations between countries. 
              By creating an account through a country with lower pricing, you can save up to 97% compared to US prices.
              Spotify is one of the easiest services to set up with international pricing.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Best Deals</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Argentina Individual:</span>
                  <span className="font-semibold">$0.29/month (97% savings)</span>
                </li>
                <li className="flex justify-between">
                  <span>Egypt Individual:</span>
                  <span className="font-semibold">$0.47/month (96% savings)</span>
                </li>
                <li className="flex justify-between">
                  <span>Pakistan Individual:</span>
                  <span className="font-semibold">$0.57/month (95% savings)</span>
                </li>
                <li className="flex justify-between">
                  <span>Turkey Individual:</span>
                  <span className="font-semibold">$0.79/month (93% savings)</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Step-by-Step Guide</h2>
            <StepList steps={steps} />

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Methods by Country</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recommended Payment</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Success Rate</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Argentina</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Virtual card (Revolut)</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">High</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">Easiest country for international cards</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Turkey</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Local credit/debit card</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">High</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">Some international cards work</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Pakistan</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Local bank card</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Medium</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">May require local payment method</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Egypt</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Vodafone Cash or local card</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Medium</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">Local payment methods preferred</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-3">Why Spotify is Easier Than Other Services</h3>
              <ul className="space-y-2 text-green-800">
                <li>• Spotify accepts international payment methods more readily than Netflix or Disney+</li>
                <li>• Account verification is less frequent</li>
                <li>• Family plans can be shared across regions with fewer restrictions</li>
                <li>• Mobile app works without VPN after initial setup</li>
              </ul>
            </div>

            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Important Considerations</h3>
              <ul className="space-y-2 text-blue-800">
                <li>• Spotify may require re-verification if you change countries frequently</li>
                <li>• Student and family plans have additional verification requirements</li>
                <li>• Prices are subject to change as Spotify adjusts regional pricing</li>
                <li>• Using VPNs to access regional pricing may violate Spotify's Terms of Service</li>
              </ul>
            </div>
          </div>
        </GuideLayout>
      </div>
    </div>
  );
}
