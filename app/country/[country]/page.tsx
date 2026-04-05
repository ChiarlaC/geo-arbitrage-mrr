import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { loadPricingData } from "@/lib/data";
import PricingTable from "@/components/PricingTable";
import Breadcrumbs from "@/components/Breadcrumbs";
import MetricCards from "@/components/MetricCards";
import type { PricingData } from "@/lib/types";

interface PageProps {
  params: {
    country: string;
  };
}

const formatCountryName = (slug: string) =>
  slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const slugify = (value: string) => value.toLowerCase().replace(/\s+/g, "-");

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const pricingData = await loadPricingData();
  const countryData = pricingData.filter(
    (item) => slugify(item.country) === params.country.toLowerCase()
  );

  if (countryData.length === 0) {
    return {
      title: "Country Not Found",
      description: "Subscription price information not available for this country.",
    };
  }

  const countryName = formatCountryName(params.country);
  const serviceCount = countryData.length;
  const avgSavings =
    countryData.reduce((sum, item) => sum + item.savings_vs_us, 0) / Math.max(serviceCount, 1);

  return {
    title: `${countryName} Subscription Prices 2026 — Netflix, Spotify, YouTube Deals`,
    description: `Compare Netflix ${countryName} price, Spotify subscription, YouTube Premium, Disney Plus and more. Average savings ${avgSavings.toFixed(
      1
    )}% vs US prices. Find cheap ${countryName} subscriptions today.`,
    keywords: [
      `netflix ${countryName.toLowerCase()} price`,
      `spotify ${countryName.toLowerCase()} cheap`,
      `youtube premium ${countryName.toLowerCase()}`,
      `how much does netflix cost in ${countryName.toLowerCase()}`,
      `cheapest subscription ${countryName.toLowerCase()}`,
      `${countryName.toLowerCase()} vpn subscriptions`,
    ],
  };
}

export async function generateStaticParams() {
  const pricingData = await loadPricingData();
  const countries = Array.from(new Set(pricingData.map((item) => slugify(item.country))));

  return countries.map((country) => ({
    country,
  }));
}

export default async function CountryPage({ params }: PageProps) {
  const pricingData = await loadPricingData();
  const countryData = pricingData.filter(
    (item) => slugify(item.country) === params.country.toLowerCase()
  );

  if (countryData.length === 0) {
    notFound();
  }

  const countryName = formatCountryName(params.country);
  const serviceCount = countryData.length;
  const avgSavings =
    countryData.reduce((sum, item) => sum + item.savings_vs_us, 0) / Math.max(serviceCount, 1);

  const findService = (name: string) =>
    countryData.find((item) => item.service.toLowerCase() === name.toLowerCase());

  const netflix = findService("Netflix");
  const spotify = findService("Spotify");
  const youtube = findService("YouTube Premium");

  const cheapest = countryData.reduce<PricingData | null>((best, item) => {
    if (!best) return item;
    return item.usd_price < best.usd_price ? item : best;
  }, null);

  return (
    <div className="space-y-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: countryName, href: `/country/${params.country}` },
        ]}
      />

      <div>
        <h1 className="text-3xl font-bold">Subscription Prices in {countryName} 2026</h1>
        <p className="text-gray-600 mt-2">
          Compare {serviceCount} services — save {avgSavings.toFixed(1)}% on average vs US prices with cheap {countryName} subscriptions.
        </p>
      </div>

      <section className="prose prose-blue max-w-none">
        <p>
          Compare <strong>Netflix {countryName} price</strong>, <strong>Spotify {countryName} subscription</strong>, YouTube Premium, Disney Plus, and more.
          Many users save up to {avgSavings.toFixed(1)}% by switching to <strong>cheap {countryName} subscriptions</strong> using a VPN or local payment method.
        </p>

        <h2>How Much Does Netflix Cost in {countryName}?</h2>
        <p>
          Netflix in {countryName} {netflix ? `costs ${netflix.local_price} (~$${netflix.usd_price.toFixed(2)})` : "is available with regional pricing"} per month for popular plans.
          That is about {netflix ? `${netflix.savings_vs_us.toFixed(1)}%` : "significant"} cheaper than the US list price.
        </p>

        <h2>Spotify {countryName} Pricing</h2>
        <p>
          <strong>Spotify {countryName} cheap</strong> plans make it one of the most affordable music subscriptions globally. Individual plans often stay under $2/month.
        </p>

        <h2>YouTube Premium & Other Streaming Deals</h2>
        <ul>
          {youtube && (
            <li>
              <strong>YouTube Premium {countryName}</strong>: {youtube.local_price} (~${youtube.usd_price.toFixed(2)}) — great for ad-free viewing and downloads.
            </li>
          )}
          {spotify && (
            <li>
              <strong>Spotify</strong>: {spotify.local_price} (~${spotify.usd_price.toFixed(2)}) with student and family options in some regions.
            </li>
          )}
          {netflix && (
            <li>
              <strong>Netflix</strong>: {netflix.local_price} (~${netflix.usd_price.toFixed(2)}) — popular for HD streaming and downloads.
            </li>
          )}
          {cheapest && (
            <li>
              <strong>Cheapest subscription in {countryName}</strong>: {cheapest.service} at {cheapest.local_price} (~${cheapest.usd_price.toFixed(2)}).
            </li>
          )}
        </ul>

        <h3>Best Subscription Deals in {countryName}</h3>
        <p>Top services locals and expats buy to maximize savings:</p>
        <ul>
          {countryData.map((service) => (
            <li key={`${service.service}-${service.plan}`}>
              <strong>{service.service}</strong>: {service.local_price} (~${service.usd_price.toFixed(2)}) — {service.savings_vs_us.toFixed(1)}% cheaper vs US.
            </li>
          ))}
        </ul>

        <p>
          Looking for a specific deal? Try these quick links: {netflix && <Link className="text-blue-600 underline" href={`/netflix/${params.country}`}>Netflix {countryName} price</Link>}, {spotify && <Link className="text-blue-600 underline" href={`/spotify/${params.country}`}>Spotify {countryName}</Link>}, {youtube && <Link className="text-blue-600 underline" href={`/youtube-premium/${params.country}`}>YouTube Premium {countryName}</Link>}.
        </p>
      </section>

      <MetricCards data={countryData} />

      <div className="bg-white border border-gray-300">
        <PricingTable data={countryData} />
      </div>

      {/* FAQ with Schema.org markup for Featured Snippets */}
      <section className="mt-12 space-y-6" itemScope itemType="https://schema.org/FAQPage">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h3 itemProp="name" className="font-semibold text-lg">Is it legal to use a VPN for cheaper subscriptions?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text" className="text-gray-700">
              Using a VPN is generally legal, but it may violate streaming service terms. Review the provider's policies before purchasing to ensure compliance.
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h3 itemProp="name" className="font-semibold text-lg">What's the cheapest streaming service in {countryName}?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text" className="text-gray-700">
              {cheapest
                ? `${cheapest.service} is the cheapest at ${cheapest.local_price} (~$${cheapest.usd_price.toFixed(2)}).`
                : `Look for local bundles and student discounts to find the cheapest subscription.`}
            </p>
          </div>
        </div>

        <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h3 itemProp="name" className="font-semibold text-lg">How much does Netflix cost in {countryName}?</h3>
          <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
            <p itemProp="text" className="text-gray-700">
              {netflix
                ? `Netflix costs ${netflix.local_price} (~$${netflix.usd_price.toFixed(2)}) in ${countryName}, which is about ${netflix.savings_vs_us.toFixed(1)}% cheaper than the US.`
                : `Netflix pricing varies, but regional plans are typically far cheaper than US rates.`}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
