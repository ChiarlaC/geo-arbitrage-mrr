import Link from "next/link";
import { PricingData } from "@/lib/types";
import seedrandom from "seedrandom";

interface RelatedLinksProps {
  currentService: string;
  currentCountry: string;
  allData: PricingData[];
}

export default function RelatedLinks({ currentService, currentCountry, allData }: RelatedLinksProps) {
  // Filter out the current item
  const otherItems = allData.filter(
    (item) => !(item.service === currentService && item.country === currentCountry)
  );

  // Deterministic random shuffle using seedrandom
  const seed = `${currentService}-${currentCountry}`;
  const rng = seedrandom(seed);
  const shuffled = [...otherItems].sort(() => rng() - 0.5);

  // Take first 5
  const related = shuffled.slice(0, 5);

  if (related.length === 0) {
    return null;
  }

  return (
    <div className="card bg-white/90 backdrop-blur-sm border border-neutral-200/50 p-6">
      <h3 className="font-display font-semibold text-lg mb-4">Related Prices</h3>
      <ul className="space-y-3">
        {related.map((item) => (
          <li key={`${item.service}-${item.country}`}>
            <Link
              href={`/${item.service.toLowerCase().replace(/\+/g, "-plus").replace(/\s+/g, "-")}/${item.country.toLowerCase()}`}
              className="flex justify-between items-center p-3 hover:bg-white/30 rounded-lg transition-colors duration-200"
            >
              <div>
                <div className="font-display font-medium">{item.service}</div>
                <div className="text-xs text-neutral-500">{item.country}</div>
              </div>
              <div className="text-right">
                <div className="font-display font-medium">${item.usd_price.toFixed(2)}</div>
                <div className="text-xs text-primary-500">{item.savings_vs_us.toFixed(1)}% off</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
