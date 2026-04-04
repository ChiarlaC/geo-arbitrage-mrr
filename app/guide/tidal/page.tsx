import GuideLayout from '@/components/GuideLayout';
import StepList from '@/components/StepList';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function TidalGuidePage() {
  const steps = [
    {
      number: 1,
      title: 'Select Target Country',
      description: 'Choose a country with lower Tidal pricing. Best options include Argentina, Egypt, Pakistan, and Turkey. Check our pricing table for current rates.',
      estimatedTime: '5 minutes',
      important: true
    },
    {
      number: 2,
      title: 'Get a VPN Service',
      description: 'Subscribe to a VPN with servers in your target country. NordVPN and ExpressVPN have good coverage for Tidal regions.',
      estimatedTime: '10 minutes'
    },
    {
      number: 3,
      title: 'Connect VPN and Prepare',
      description: 'Connect to a server in your target country. Use incognito/private browsing mode and clear cookies to ensure Tidal sees you as a new user from that location.',
      estimatedTime: '3 minutes',
      important: true
    },
    {
      number: 4,
      title: 'Create New Tidal Account',
      description: 'Visit Tidal.com and sign up for a new account. Use an email address not previously associated with Tidal. The site should display prices in local currency.',
      estimatedTime: '10 minutes',
      important: true
    },
    {
      number: 5,
      title: 'Choose Subscription Plan',
      description: 'Select between HiFi and HiFi Plus plans based on your audio quality preferences. HiFi offers CD-quality, while HiFi Plus offers Master Quality Authenticated (MQA).',
      estimatedTime: '5 minutes'
    },
    {
      number: 6,
      title: 'Complete Payment',
      description: 'Use a payment method that works in the target country. International credit cards often work, but virtual cards may be more reliable for some regions.',
      estimatedTime: '15 minutes'
    },
    {
      number: 7,
      title: 'Enjoy High-Fidelity Audio',
      description: 'After successful subscription, you can disconnect the VPN. Tidal will work globally, though some content may have regional restrictions.',
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
            { label: 'Tidal Guide', href: '/guide/tidal' }
          ]}
        />
        
        <GuideLayout
          title="How to Get Tidal at International Prices"
          difficulty="Medium"
          vpnRequired={true}
          estimatedTime="50-70 minutes"
        >
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
            <p className="mb-6">
              Tidal offers premium high-fidelity audio streaming with significant regional pricing differences.
              By subscribing through a country with lower pricing, you can save up to 97% compared to US prices.
              Tidal is known for its superior audio quality, exclusive content, and artist-friendly revenue model.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Best Deals</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Argentina HiFi:</span>
                  <span className="font-semibold">$0.29/month (98% savings)</span>
                </li>
                <li className="flex justify-between">
                  <span>Egypt HiFi:</span>
                  <span className="font-semibold">$0.47/month (96% savings)</span>
                </li>
                <li className="flex justify-between">
                  <span>Pakistan HiFi:</span>
                  <span className="font-semibold">$0.57/month (95% savings)</span>
                </li>
                <li className="flex justify-between">
                  <span>Turkey HiFi:</span>
                  <span className="font-semibold">$0.79/month (93% savings)</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Step-by-Step Guide</h2>
            <StepList steps={steps} />

            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tidal Audio Quality Comparison</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quality</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bitrate</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Format</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">HiFi</td>
                      <td className="px-4 py-3 text-sm text-gray-600">CD Quality</td>
                      <td className="px-4 py-3 text-sm text-gray-600">1411 kbps</td>
                      <td className="px-4 py-3 text-sm text-gray-600">FLAC 16-bit/44.1kHz</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Audiophiles, quality seekers</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">HiFi Plus</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Master Quality</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Up to 9216 kbps</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">MQA, Dolby Atmos, Sony 360RA</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">High-end equipment, immersive audio</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">Premium</td>
                      <td className="px-4 py-3 text-sm text-gray-600">High Quality</td>
                      <td className="px-4 py-3 text-sm text-gray-600">320 kbps</td>
                      <td className="px-4 py-3 text-sm text-gray-600">AAC</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Casual listeners</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Tidal Exclusive Features</h3>
              <ul className="space-y-2 text-blue-800">
                <li>• Master Quality Authenticated (MQA) recordings</li>
                <li>• Dolby Atmos Music and Sony 360 Reality Audio</li>
                <li>• Exclusive artist interviews and behind-the-scenes content</li>
                <li>• High-resolution music videos</li>
                <li>• Artist-curated playlists and editorial content</li>
                <li>• Direct artist payment model (higher royalty rates)</li>
              </ul>
            </div>

            <div className="mt-8 p-6 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-3">Device Compatibility</h3>
              <ul className="space-y-2 text-purple-800">
                <li>• Desktop: Windows, macOS</li>
                <li>• Mobile: iOS, Android</li>
                <li>• Web Player: All modern browsers</li>
                <li>• Smart Speakers: Sonos, Amazon Echo, Google Home</li>
                <li>• Audio Systems: Bluesound, NAD, McIntosh, KEF</li>
                <li>• Car Systems: Apple CarPlay, Android Auto</li>
                <li>• TVs: Apple TV, Android TV, Samsung, LG</li>
              </ul>
            </div>

            <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-3">Why Choose Tidal</h3>
              <ul className="space-y-2 text-green-800">
                <li>• Superior audio quality compared to other streaming services</li>
                <li>• Higher artist payouts (approximately 2-3x Spotify)</li>
                <li>• Exclusive content not available on other platforms</li>
                <li>• Advanced audio formats (MQA, Dolby Atmos, Sony 360RA)</li>
                <li>• Curated editorial content by music experts</li>
                <li>• Family and student plans available in most regions</li>
              </ul>
            </div>

            <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-900 mb-3">Payment Considerations</h3>
              <ul className="space-y-2 text-yellow-800">
                <li>• Argentina: International cards work well, best value</li>
                <li>• Egypt: Local payment methods preferred, international cards may work</li>
                <li>• Pakistan: Virtual cards recommended, some international cards blocked</li>
                <li>• Turkey: International cards generally accepted, good backup option</li>
                <li>• Consider using virtual cards for countries with payment restrictions</li>
                <li>• Family plans require all members to appear in the same country</li>
              </ul>
            </div>

            <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="text-lg font-semibold text-red-900 mb-3">Important Warnings</h3>
              <ul className="space-y-2 text-red-800">
                <li>• Tidal may require periodic location verification</li>
                <li>• Using VPNs violates Tidal's Terms of Service</li>
                <li>• Some exclusive content may be region-locked</li>
                <li>• Payment methods may be blocked if detected as foreign</li>
                <li>• Account suspension risk for frequent country changes</li>
                <li>• HiFi Plus features may require additional regional verification</li>
              </ul>
            </div>
          </div>
        </GuideLayout>
      </div>
    </div>
  );
}
