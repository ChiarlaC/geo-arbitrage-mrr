import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPrice, loadPricingData } from "@/lib/data";
import PriceCard from "@/components/PriceCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedLinks from "@/components/RelatedLinks";

interface PageProps {
  params: Promise<{
    service: string;
    country: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service, country } = await params;
  const data = getPrice(service, country);

  if (!data) {
    return {
      title: "Price Not Found",
      description: "Subscription price information not available.",
    };
  }

  const title = `${data.service} Price in ${data.country} 2026 — Geo-Subs Tracker`;
  const description = `How much does ${data.service} cost in ${data.country}? Real-time pricing: ${data.local_price} = $${data.usd_price}/mo. Save ${data.savings_vs_us}% vs US.`;

  return {
    title,
    description,
  };
}

export async function generateStaticParams() {
  const pricingData = await loadPricingData();
  
  return pricingData.map((item) => ({
    service: item.service.toLowerCase().replace(/\+/g, "-plus").replace(/\s+/g, "-"),
    country: item.country.toLowerCase(),
  }));
}

export default async function ServiceCountryPage({ params }: PageProps) {
  const { service, country } = await params;
  const data = getPrice(service, country);

  if (!data) {
    notFound();
  }

  const pricingData = await loadPricingData();

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: data.service, href: `/${data.service.toLowerCase().replace(/\+/g, '-plus').replace(/\s+/g, '-')}` },
    { label: data.country, href: `/${data.service.toLowerCase().replace(/\+/g, '-plus').replace(/\s+/g, '-')}/${data.country.toLowerCase()}` }
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs items={breadcrumbItems} />

      <div>
        <h1>
          {data.service} Price in {data.country}
        </h1>
        <p className="text-gray-600 mt-2">
          Current pricing for {data.service} in {data.country}. Updated for 2026.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <PriceCard data={data} />

          <div className="bg-white border border-gray-300 p-6 mt-6">
            <h3 className="font-semibold mb-3">How to Get This Price</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Sign up for a VPN service (we recommend NordVPN)</li>
              <li>Connect to a server in {data.country}</li>
              <li>Visit the {data.service} website</li>
              <li>Sign up using a local payment method</li>
              <li>Enjoy your subscription at the local price</li>
            </ol>
          </div>

          <div className="bg-gray-50 border border-gray-300 p-6 mt-6">
            <h3 className="font-semibold mb-3">Why Prices Vary by Country</h3>
            <p className="mb-3">
              Subscription services adjust prices based on local purchasing power, competition, and market conditions.
              This is why you can save up to {data.savings_vs_us.toFixed(1)}% by subscribing from {data.country}.
            </p>
            <p>
              Note: You must maintain a VPN connection during signup, but can usually watch without VPN after.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-gray-300 p-6">
            <h3 className="font-semibold mb-3">Key Insights</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="inline-block w-3 h-3 bg-accent mr-2"></span>
                Save ${(data.usd_price * 12 * (data.savings_vs_us / 100)).toFixed(2)} per year
              </li>
              <li className="flex items-center">
                <span className="inline-block w-3 h-3 bg-accent mr-2"></span>
                {data.savings_vs_us > 70 ? "Extreme" : data.savings_vs_us > 40 ? "High" : "Moderate"} savings tier
              </li>
              <li className="flex items-center">
                <span className="inline-block w-3 h-3 bg-accent mr-2"></span>
                VPN required for activation
              </li>
            </ul>
          </div>

          <RelatedLinks currentService={data.service} currentCountry={data.country} allData={pricingData} />
        </div>
      </div>
    </div>
  );
}
