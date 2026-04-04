import GuideLayout from '@/components/GuideLayout';
import StepList from '@/components/StepList';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function CanvaProGuidePage() {
  const steps = [
    {
      number: 1,
      title: 'Choose Target Country',
      description: 'Select a country with lower Canva Pro pricing. Best options include Argentina, Pakistan, Egypt, and India. Check our pricing table for current rates.',
      estimatedTime: '5 minutes',
      important: true
    },
    {
      number: 2,
      title: 'Prepare VPN Connection',
      description: 'Get a VPN service with servers in your target country. ExpressVPN and NordVPN work well with Canva.',
      estimatedTime: '10 minutes'
    },
    {
      number: 3,
      title: 'Connect VPN and Clear Cache',
      description: 'Connect to a server in your target country. Clear browser cookies and cache, or use incognito mode to ensure Canva sees you as a new user from that location.',
      estimatedTime: '3 minutes',
      important: true
    },
    {
      number: 4,
      title: 'Create New Canva Account',
      description: 'Visit Canva.com and sign up for a new account. Use an email address not previously associated with Canva. The site should display prices in local currency.',
      estimatedTime: '10 minutes',
      important: true
    },
    {
      number: 5,
      title: 'Select Canva Pro Plan',
      description: 'Navigate to the Canva Pro subscription page. Choose the Pro plan that suits your needs (monthly or annual).',
      estimatedTime: '5 minutes'
    },
    {
      number: 6,
      title: 'Complete Payment',
      description: 'Use a payment method that works in the target country. International credit cards often work, but virtual cards may be more reliable.',
      estimatedTime: '15 minutes'
    },
    {
      number: 7,
      title: 'Verify and Use',
      description: 'After successful subscription, you can disconnect the VPN. Your Canva Pro features will be available globally.',
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
            { label: 'Canva Pro Guide', href: '/guide/canva-pro' }
          ]}
        />
        
        <GuideLayout
          title="How to Get Canva Pro at International Prices"
          difficulty="Easy"
          vpnRequired={true}
          estimatedTime="40-60 minutes"
        >
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
            <p className="mb-6">
              Canva Pro offers significant regional pricing differences, with some countries offering savings of over 95% compared to US prices.
              Canva has relatively simple location verification, making this one of the easier services to subscribe to at international prices.
              The subscription works globally once activated, regardless of your actual location.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Best Deals</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Argentina Individual:</span>
                  <span className="font-semibold">$0.57/month (96% savings)</span>
                </li>
                <li className="flex justify-between">
                  <span>Pakistan Individual:</span>
                  <span className="font-semibold">$0.90/month (94% savings)</span>
                </li>
                <li className="flex justify-between">
                  <span>Egypt Individual:</span>
                  <span className="font-semibold">$1.87/month (88% savings)</span>
                </li>
                <li className="flex justify-between">
                  <span>India Individual:</span>
                  <span className="font-semibold">$2.13/month (86% savings)</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Step-by-Step Guide</h2>
            <StepList steps={steps} />

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Canva Pro Features Comparison</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Feature</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Free Plan</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pro Plan</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teams Plan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Brand Kit</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Limited</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Unlimited</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Premium Templates</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Limited</td>
                      <td className="px-4 py-3 text-sm text-gray-600">All</td>
                      <td className="px-4 py-3 text-sm text-gray-600">All</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Background Remover</td>
                      <td className="px-4 py-3 text-sm text-gray-600">No</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Yes</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Yes</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Magic Resize</td>
                      <td className="px-4 py-3 text-sm text-gray-600">No</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Yes</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Yes</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Cloud Storage</td>
                      <td className="px-4 py-3 text-sm text-gray-600">5GB</td>
                      <td className="px-4 py-3 text-sm text-gray-600">1TB</td>
                      <td className="px-4 py-3 text-sm text-gray-600">1TB/user</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-3">Why Canva Pro is Easy to Get</h3>
              <ul className="space-y-2 text-green-800">
                <li>• Canva has minimal location verification during signup</li>
                <li>• Once subscribed, Pro features work globally without VPN</li>
                <li>• International credit cards are widely accepted</li>
                <li>• No phone number verification required</li>
                <li>• Subscription can be managed from any location after purchase</li>
              </ul>
            </div>

            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Payment Tips for Success</h3>
              <ul className="space-y-2 text-blue-800">
                <li>• Use international credit cards (Visa, Mastercard, Amex)</li>
                <li>• Virtual cards (Revolut, Wise) work well for most countries</li>
                <li>• PayPal may revert to your home country pricing - avoid if possible</li>
                <li>• Consider annual plans for additional savings</li>
                <li>• Argentina and Pakistan offer the best value for money</li>
              </ul>
            </div>

            <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-900 mb-3">Important Notes</h3>
              <ul className="space-y-2 text-yellow-800">
                <li>• Canva may display prices in USD after detecting your location</li>
                <li>• Team plans require all members to be in the same pricing region</li>
                <li>• Student discounts are available but require verification</li>
                <li>• Using VPNs may violate Canva's Terms of Service</li>
                <li>• Prices may change based on currency fluctuations</li>
              </ul>
            </div>

            <div className="mt-8 p-6 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-3">Canva Pro Use Cases</h3>
              <ul className="space-y-2 text-purple-800">
                <li>• Social media graphics and marketing materials</li>
                <li>• Professional presentations and reports</li>
                <li>• Video editing and animation projects</li>
                <li>• Brand consistency across all design assets</li>
                <li>• Collaborative design work for teams</li>
              </ul>
            </div>
          </div>
        </GuideLayout>
      </div>
    </div>
  );
}
