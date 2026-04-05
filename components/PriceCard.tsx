import { PricingData } from "@/lib/types";

interface PriceCardProps {
  data: PricingData;
}

export default function PriceCard({ data }: PriceCardProps) {
  return (
    <div className="card bg-white/90 backdrop-blur-sm border border-neutral-200/50 p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border-r border-neutral-200/30 pr-4">
          <div className="text-sm text-neutral-600 mb-2">Local Price</div>
          <div className="text-2xl font-display font-bold">{data.symbol}{data.localPrice.toFixed(2)}</div>
          <div className="text-xs text-neutral-500 mt-1">Per month</div>
        </div>
        <div className="border-r border-neutral-200/30 pr-4">
          <div className="text-sm text-neutral-600 mb-2">USD Price</div>
          <div className="text-2xl font-display font-bold">${data.priceUSD.toFixed(2)}</div>
          <div className="text-xs text-neutral-500 mt-1">Converted</div>
        </div>
        <div>
          <div className="text-sm text-neutral-600 mb-2">Savings vs US</div>
          <div className="text-2xl font-display font-bold text-primary-500">{data.savingsPercent.toFixed(1)}%</div>
          <div className="text-xs text-neutral-500 mt-1">Discount</div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-neutral-200/30">
        <div className="text-sm text-neutral-700">
          <span className="font-medium">Plan:</span> {data.plan}
        </div>
      </div>
    </div>
  );
}
