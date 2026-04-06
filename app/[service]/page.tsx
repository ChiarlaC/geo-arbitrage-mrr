import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { loadPricingData } from "@/lib/data";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

interface PageProps {
  params: Promise<{
    service: string;
  }>;
}

const serviceNames: { [key: string]: string } = {
  "netflix": "Netflix",
  "spotify": "Spotify",
  "youtube-premium": "YouTube Premium",
  "disney-plus": "Disney Plus",
  "tidal": "Tidal",
  "canva-pro": "Canva Pro",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service } = await params;
  const serviceName = serviceNames[service];

  if (!serviceName) {
    return {
      title: "Service Not Found",
      description: "Subscription service not available.",
    };
  }

  const title = `${serviceName} Prices by Country 2026 — Compare & Save`;
  const description = `Compare ${serviceName} subscription prices across 7+ countries. Find the cheapest ${serviceName} plan and save up to 90% with regional pricing.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://subpricing.com/${service}`,
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(serviceNames).map((service) => ({
    service,
  }));
}

export default async function ServicePage({ params }: PageProps) {
  const { service } = await params;
  const serviceName = serviceNames[service];

  if (!serviceName) {
    notFound();
  }

  const pricingData = await loadPricingData();
  const serviceData = pricingData.filter((item) =>
    item.service.toLowerCase().replace(/\+/g, "-plus").replace(/\s+/g, "-") === service
  );

  if (serviceData.length === 0) {
    notFound();
  }

  // Sort by price (cheapest first)
  serviceData.sort((a, b) => a.priceUSD - b.priceUSD);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: serviceName, href: `/${service}` },
  ];

  // Find min and max prices
  const minPrice = serviceData[0];
  const maxPrice = serviceData[serviceData.length - 1];
  const maxSavings = ((maxPrice.priceUSD - minPrice.priceUSD) / maxPrice.priceUSD) * 100;

  return (
    <div className="space-y-8">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="text-center">
        <h1 className="text-4xl font-display font-bold tracking-tight">
          {serviceName} Prices by Country
        </h1>
        <p className="text-neutral-600 mt-4 max-w-2xl mx-auto">
          Compare {serviceName} subscription prices across {serviceData.length} countries.
          Save up to {maxSavings.toFixed(0)}% by choosing the right region.
        </p>
      </div>

      {/* Price Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-white/90 backdrop-blur-xl rounded-xl shadow-sm border border-neutral-200/50 p-6">
          <h3 className="text-lg font-semibold mb-2">Cheapest</h3>
          <p className="text-3xl font-bold text-green-600">
            ${minPrice.priceUSD.toFixed(2)}/mo
          </p>
          <p className="text-neutral-600 mt-2">{minPrice.country}</p>
        </div>
        <div className="card bg-white/90 backdrop-blur-xl rounded-xl shadow-sm border border-neutral-200/50 p-6">
          <h3 className="text-lg font-semibold mb-2">Most Expensive</h3>
          <p className="text-3xl font-bold text-red-600">
            ${maxPrice.priceUSD.toFixed(2)}/mo
          </p>
          <p className="text-neutral-600 mt-2">{maxPrice.country}</p>
        </div>
        <div className="card bg-white/90 backdrop-blur-xl rounded-xl shadow-sm border border-neutral-200/50 p-6">
          <h3 className="text-lg font-semibold mb-2">Maximum Savings</h3>
          <p className="text-3xl font-bold text-primary-600">{maxSavings.toFixed(0)}%</p>
          <p className="text-neutral-600 mt-2">
            ${(maxPrice.priceUSD - minPrice.priceUSD).toFixed(2)}/mo saved
          </p>
        </div>
      </div>

      {/* Price Table */}
      <div className="card bg-white/90 backdrop-blur-xl rounded-xl shadow-sm border border-neutral-200/50 p-6">
        <h2 className="text-2xl font-display font-semibold mb-6">
          {serviceName} Pricing Comparison
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 px-4 font-semibold">Rank</th>
                <th className="text-left py-3 px-4 font-semibold">Country</th>
                <th className="text-left py-3 px-4 font-semibold">Local Price</th>
                <th className="text-left py-3 px-4 font-semibold">USD/month</th>
                <th className="text-left py-3 px-4 font-semibold">vs US Price</th>
                <th className="text-left py-3 px-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {serviceData.map((item, index) => (
                <tr key={item.country} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-3 px-4">#{index + 1}</td>
                  <td className="py-3 px-4 font-medium">{item.country}</td>
                  <td className="py-3 px-4">
                    {item.symbol}
                    {item.localPrice.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 font-semibold">
                    ${item.priceUSD.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        item.savingsPercent > 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.savingsPercent > 0 ? "-" : "+"}
                      {Math.abs(item.savingsPercent).toFixed(0)}%
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Link
                      href={`/${service}/${item.country.toLowerCase()}`}
                      className="text-primary-500 hover:text-primary-600 font-medium"
                    >
                      View Details →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* How to Use Guide */}
      <div className="card bg-neutral-50/50 backdrop-blur-sm rounded-xl border border-neutral-200/50 p-8">
        <h3 className="text-xl font-display font-semibold mb-6">
          How to Get {serviceName} at Regional Pricing
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-neutral-200/30">
            <div className="text-5xl font-display font-bold text-primary-500 mb-4">1</div>
            <h4 className="text-lg font-display font-medium mb-3">Get a VPN</h4>
            <p className="text-neutral-600">
              Sign up for a reliable VPN service like NordVPN that supports the country you want to subscribe from.
            </p>
          </div>
          <div className="card bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-neutral-200/30">
            <div className="text-5xl font-display font-bold text-primary-500 mb-4">2</div>
            <h4 className="text-lg font-display font-medium mb-3">Connect & Subscribe</h4>
            <p className="text-neutral-600">
              Connect to a server in your target country and visit the {serviceName} website to sign up.
            </p>
          </div>
          <div className="card bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-neutral-200/30">
            <div className="text-5xl font-display font-bold text-primary-500 mb-4">3</div>
            <h4 className="text-lg font-display font-medium mb-3">Save Money</h4>
            <p className="text-neutral-600">
              Enjoy {serviceName} at a fraction of the cost. Save up to ${(maxPrice.priceUSD - minPrice.priceUSD).toFixed(2)}/month!
            </p>
          </div>
        </div>
      </div>

      {/* VPN Recommendation */}
      <div className="card bg-white/90 backdrop-blur-xl rounded-xl shadow-sm border border-neutral-200/50 p-8">
        <h3 className="text-xl font-display font-semibold mb-6">Recommended VPN for {serviceName}</h3>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <p className="mb-6 text-neutral-700">
              To access regional pricing for {serviceName}, you need a reliable VPN. We recommend NordVPN for its fast
              speeds, stable connections, and ability to bypass geo-restrictions.
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
            <p className="flex items-center gap-2">✅ Works with {serviceName}</p>
          </div>
        </div>
      </div>

      {/* Related Guide Link */}
      <div className="text-center">
        <Link
          href={`/guide/${service}`}
          className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium"
        >
          📖 Read our complete {serviceName} guide →
        </Link>
      </div>
    </div>
  );
}
