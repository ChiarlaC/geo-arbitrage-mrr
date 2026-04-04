import GuideLayout from '@/components/GuideLayout';
import StepList from '@/components/StepList';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function YouTubePremiumGuidePage() {
  const steps = [
    {
      number: 1,
      title: 'Choose Target Country',
      description: 'Select a country with lower YouTube Premium pricing. Best options include Argentina, India, Turkey, and Ukraine. Check our pricing table for current rates.',
      estimatedTime: '5 minutes',
      important: true
    },
    {
      number: 2,
      title: 'Get a VPN with Target Servers',
      description: 'Subscribe to a VPN service that has servers in your chosen country. ExpressVPN and NordVPN work well with YouTube services.',
      estimatedTime: '10 minutes'
    },
    {
      number: 3,
      title: 'Connect VPN and Clear Data',
      description: 'Connect to a server in your target country. Clear browser cookies and cache, or use incognito mode to remove location history.',
      estimatedTime: '3 minutes',
      important: true
    },
    {
      number: 4,
      title: 'Create New Google Account',
      description: 'Sign up for a new Google account while connected to the VPN. Use this account exclusively for YouTube Premium in the target country.',
      estimatedTime: '10 minutes',
      important: true
    },
    {
      number: 5,
      title: 'Set Up Payment Profile',
      description: 'Go to Google Pay and create a payment profile with an address in the target country. This is crucial for YouTube to recognize your location.',
      estimatedTime: '15 minutes',
      important: true
    },
    {
      number: 6,
      title: 'Subscribe to YouTube Premium',
      description: 'Visit YouTube.com while logged into your new account and subscribe to Premium. The pricing should reflect the target country\'s rates.',
      estimatedTime: '5 minutes'
    },
    {
      number: 7,
      title: 'Verify and Use',
      description: 'Complete any verification steps. After subscription, you can use YouTube Premium normally, though some features may require occasional VPN reconnection.',
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
            { label: 'YouTube Premium Guide', href: '/guide/youtube-premium' }
          ]}
        />
        
        <GuideLayout
          title="How to Get YouTube Premium at International Prices"
          difficulty="Hard"
          vpnRequired={true}
          estimatedTime="60-90 minutes"
        >
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
            <p className="mb-6">
              YouTube Premium pricing varies dramatically by country, with some regions offering savings of over 95% compared to US prices.
              However, YouTube has stricter location verification than other services, making this one of the more challenging setups.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Best Deals</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Argentina Individual:</span>
                  <span className="font-semibold">$0.67/month (96% savings)</span>
                </li>
                <li className="flex justify-between">
                  <span>India Individual:</span>
                  <span className="font-semibold">$1.28/month (92% savings)</span>
                </li>
                <li className="flex justify-between">
                  <span>Turkey Individual:</span>
                  <span className="font-semibold">$1.55/month (90% savings)</span>
                </li>
                <li className="flex justify-between">
                  <span>Ukraine Individual:</span>
                  <span className="font-semibold">$2.15/month (86% savings)</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Step-by-Step Guide</h2>
            <StepList steps={steps} />

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Country-Specific Requirements</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment Method</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Difficulty</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Key Requirement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Argentina</td>
                      <td className="px-4 py-3 text-sm text-gray-600">International credit card</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Easy</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">Argentine address in Google Pay</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">India</td>
                      <td className="px-4 py-3 text-sm text-gray-600">UPI or local card</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Hard</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">Indian phone number for verification</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Turkey</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Turkish credit card</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Medium</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">Turkish billing address</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Ukraine</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Ukrainian card</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Medium</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">Ukrainian payment method</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-900 mb-3">Why YouTube Premium is More Challenging</h3>
              <ul className="space-y-2 text-yellow-800">
                <li>• Google has sophisticated location detection using multiple signals</li>
                <li>• Payment profile must match the target country exactly</li>
                <li>• Family sharing requires all members to be in the same country</li>
                <li>• YouTube Music access may have additional regional restrictions</li>
              </ul>
            </div>

            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Pro Tips for Success</h3>
              <ul className="space-y-2 text-blue-800">
                <li>• Use a dedicated Google account only for YouTube Premium in the target country</li>
                <li>• Set up Google Pay payment profile before attempting to subscribe</li>
                <li>• Consider using a virtual credit card with billing address in the target country</li>
                <li>• Be prepared for potential verification requests via SMS or email</li>
                <li>• Argentina is generally the easiest country for international users</li>
              </ul>
            </div>

            <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="text-lg font-semibold text-red-900 mb-3">Important Warnings</h3>
              <ul className="space-y-2 text-red-800">
                <li>• Google may suspend accounts that frequently change countries</li>
                <li>• Using VPNs to circumvent regional pricing violates YouTube's Terms of Service</li>
                <li>• Payment methods may be blocked if detected as foreign</li>
                <li>• Family plan members must all appear to be in the same country</li>
              </ul>
            </div>
          </div>
        </GuideLayout>
      </div>
    </div>
  );
}
