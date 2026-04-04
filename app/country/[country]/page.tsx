import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { loadPricingData } from "@/lib/data";
import PricingTable from "@/components/PricingTable";
import Breadcrumbs from "@/components/Breadcrumbs";
import MetricCards from "@/components/MetricCards";

interface PageProps {
  params: {
    country: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const pricingData = await loadPricingData();
  const countryData = pricingData.filter(item => 
    item.country.toLowerCase() === params.country.toLowerCase()
  );

  if (countryData.length === 0) {
    return {
      title: "Country Not Found",
      description: "Subscription price information not available for this country.",
    };
  }

  const countryName = countryData[0].country;
  const serviceCount = countryData.length;
  const avgSavings = countryData.reduce((sum, item) => sum + item.savings_vs_us, 0) / serviceCount;

  return {
    title: `${countryName} Subscription Prices 2026 — Best Deals by Country`,
    description: `Compare ${serviceCount} subscription services in ${countryName}. Average savings: ${avgSavings.toFixed(1)}% vs US prices.`
  };
}

export async function generateStaticParams() {
  const pricingData = await loadPricingData();
  const countries = Array.from(new Set(pricingData.map(item => item.country.toLowerCase())));
  
  return countries.map((country) => ({
    country
  }));
}

export default async function CountryPage({ params }: PageProps) {
  const pricingData = await loadPricingData();
  const countryData = pricingData.filter(item => 
    item.country.toLowerCase() === params.country.toLowerCase()
  );

  if (countryData.length === 0) {
    notFound();
  }

  const countryName = countryData[0].country;
  const serviceCount = countryData.length;
  const avgSavings = countryData.reduce((sum, item) => sum + item.savings_vs_us, 0) / serviceCount;

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: countryName, href: `/country/${params.country}` }
      ]} />

      <div>
        <h1>Subscription Prices in {countryName}</h1>
        <p className="text-gray-600 mt-2">
          Compare {serviceCount} services - Save {avgSavings.toFixed(1)}% vs US prices
        </p>
      </div>

      <MetricCards data={countryData} />

      <div className="bg-white border border-gray-300">
        <PricingTable data={countryData} />
      </div>
    </div>
  );
}
