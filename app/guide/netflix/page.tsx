import GuideLayout from '@/components/GuideLayout';
import StepList from '@/components/StepList';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function NetflixGuidePage() {
  const steps = [
    {
      number: 1,
      title: 'Choose a Target Country',
      description: 'Select a country with lower Netflix pricing. Popular options include Turkey, Argentina, Pakistan, and Egypt. Check our pricing table for current rates.',
      estimatedTime: '5 minutes',
      important: true
    },
    {
      number: 2,
      title: 'Get a Reliable VPN',
      description: 'Subscribe to a VPN service that has servers in your target country. We recommend NordVPN for its consistent performance and large server network.',
      estimatedTime: '10 minutes'
    },
    {
      number: 3,
      title: 'Connect to Target Country VPN',
      description: 'Open your VPN app and connect to a server in your chosen country (e.g., Turkey or Argentina). Ensure your IP address shows as being from that country.',
      estimatedTime: '2 minutes',
      important: true
    },
    {
      number: 4,
      title: 'Clear Browser Cookies',
      description: 'Clear all cookies and cache from your browser to remove any location tracking data. Use incognito/private browsing mode for best results.',
      estimatedTime: '3 minutes'
    },
    {
      number: 5,
      title: 'Create New Netflix Account',
      description: 'Visit Netflix.com and create a new account. Use an email address that hasn\'t been associated with Netflix before. The site should show prices in local currency.',
      estimatedTime: '10 minutes',
      important: true
    },
    {
      number: 6,
      title: 'Enter Payment Details',
      description: 'Use a payment method that works internationally. Virtual credit cards (like Revolut) or gift cards purchased from the target country often work best.',
      estimatedTime: '15 minutes'
    },
    {
      number: 7,
      title: 'Verify and Start Streaming',
      description: 'Complete the verification process and start streaming! You can disconnect from the VPN after account creation, but may need it occasionally for verification.',
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
            { label: 'Netflix Guide', href: '/guide/netflix' }
          ]}
        />
        
        <GuideLayout
          title="How to Get Netflix at Lower International Prices"
          difficulty="Medium"
          vpnRequired={true}
          estimatedTime="45-60 minutes"
        >
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
            <p className="mb-6">
              Netflix uses regional pricing, meaning subscription costs vary significantly by country. 
              By creating an account through a country with lower pricing, you can save up to 94% compared to US prices.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Best Deals</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Argentina Standard HD:</span>
                  <span className="font-semibold">$0.86/month (94% savings)</span>
                </li>
                <li className="flex justify-between">
                  <span>Pakistan Standard HD:</span>
                  <span className="font-semibold">$0.90/month (94% savings)</span>
                </li>
                <li className="flex justify-between">
                  <span>Turkey Standard HD:</span>
                  <span className="font-semibold">$3.37/month (78% savings)</span>
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
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Turkey</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Virtual credit card (Revolut)</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">High</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Argentina</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Gift cards from Argentine retailers</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Medium</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Pakistan</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Local debit/credit card</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">High</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Important Considerations</h3>
              <ul className="space-y-2 text-blue-800">
                <li>• Netflix may require periodic verification from the target country</li>
                <li>• Account sharing across regions may trigger security checks</li>
                <li>• Prices can change without notice</li>
                <li>• Using VPNs may violate Netflix's Terms of Service</li>
              </ul>
            </div>
          </div>
        </GuideLayout>
      </div>
    </div>
  );
}
