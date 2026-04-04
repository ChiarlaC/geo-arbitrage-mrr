import MetricCards from "@/components/MetricCards";
import PricingTable from "@/components/PricingTable";
import { loadPricingData } from "@/lib/data";

export default async function HomePage() {
  const pricingData = await loadPricingData();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-display font-bold tracking-tight">Global Subscription Price Tracker</h1>
        <p className="text-neutral-600 mt-4 max-w-2xl mx-auto">
          Compare subscription prices across 49 countries. Save up to 90% on Netflix, Spotify,
          YouTube Premium, and more.
        </p>
      </div>

      <MetricCards data={pricingData} />

      <div className="card bg-white/90 backdrop-blur-xl rounded-xl shadow-sm border border-neutral-200/50 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-display font-semibold">Subscription Prices by Country</h2>
          <p className="text-neutral-600 mt-2">
            Click on column headers to sort. Data updated daily. Scroll to view all data.
          </p>
        </div>
        <PricingTable data={pricingData} />
      </div>

      <div className="card bg-neutral-50/50 backdrop-blur-sm rounded-xl border border-neutral-200/50 p-8">
        <h3 className="text-xl font-display font-semibold mb-6 text-center">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-neutral-200/30 hover:shadow-xl">
            <div className="text-5xl font-display font-bold text-primary-500 mb-4">1</div>
            <h4 className="text-lg font-display font-medium mb-3">Compare</h4>
            <p className="text-neutral-600">
              Browse prices for 6 popular subscription services across 7 countries.
            </p>
          </div>
          <div className="card bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-neutral-200/30 hover:shadow-xl">
            <div className="text-5xl font-display font-bold text-primary-500 mb-4">2</div>
            <h4 className="text-lg font-display font-medium mb-3">Calculate</h4>
            <p className="text-neutral-600">
              See exact savings in USD and percentage compared to US prices.
            </p>
          </div>
          <div className="card bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-neutral-200/30 hover:shadow-xl">
            <div className="text-5xl font-display font-bold text-primary-500 mb-4">3</div>
            <h4 className="text-lg font-display font-medium mb-3">Subscribe</h4>
            <p className="text-neutral-600">
              Use a VPN to access geo-restricted pricing and save hundreds per year.
            </p>
          </div>
        </div>
      </div>

      <div className="card bg-white/90 backdrop-blur-xl rounded-xl shadow-sm border border-neutral-200/50 p-8">
        <h3 className="text-xl font-display font-semibold mb-6">NordVPN Recommendation</h3>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <p className="mb-6 text-neutral-700">
              To access regional pricing, you need a VPN. We recommend NordVPN for its fast
              speeds, reliable connections, and ability to bypass geo-restrictions.
            </p>
            <a
              href="https://go.nordvpn.net/aff_c?offer_id=15&aff_id=143797"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-gradient-to-b from-primary-500 to-primary-600 text-white uppercase text-sm px-8 py-4 hover:shadow-xl hover:shadow-primary-500/40"
            >
              Get NordVPN - Save 70%
            </a>
          </div>
          <div className="text-neutral-700 space-y-3">
            <p className="flex items-center gap-2">✅ 30-day money-back guarantee</p>
            <p className="flex items-center gap-2">✅ 5,400+ servers in 60 countries</p>
            <p className="flex items-center gap-2">✅ Works with Netflix, Spotify, YouTube Premium</p>
          </div>
        </div>
      </div>
    </div>
  );
}
