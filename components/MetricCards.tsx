"use client";

import { PricingData } from "@/lib/types";
import { useMemo } from "react";

interface MetricCardsProps {
  data: PricingData[];
}

export default function MetricCards({ data }: MetricCardsProps) {
  const metrics = useMemo(() => {
    if (!data.length) {
      return {
        avgSavings: 0,
        maxSavings: 0,
        totalServices: 0,
        totalCountries: 0,
      };
    }

    const savings = data.map((item) => item.savingsPercent);
    const avgSavings = savings.reduce((a, b) => a + b, 0) / savings.length;
    const maxSavings = Math.max(...savings);

    const uniqueServices = new Set(data.map((item) => item.service));
    const uniqueCountries = new Set(data.map((item) => item.country));

    return {
      avgSavings,
      maxSavings,
      totalServices: uniqueServices.size,
      totalCountries: uniqueCountries.size,
    };
  }, [data]);

  const cards = [
    {
      title: "Average Savings",
      value: `${metrics.avgSavings.toFixed(1)}%`,
      description: "vs US prices",
    },
    {
      title: "Max Savings",
      value: `${metrics.maxSavings.toFixed(1)}%`,
      description: "Highest possible discount",
    },
    {
      title: "Services",
      value: metrics.totalServices,
      description: "Subscription platforms",
    },
    {
      title: "Countries",
      value: metrics.totalCountries,
      description: "With regional pricing",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="card bg-white/90 backdrop-blur-xl rounded-xl shadow-sm border border-neutral-200/50 hover:shadow-xl p-6"
        >
          <div className="text-3xl font-bold mb-2 text-primary-600">{card.value}</div>
          <div className="font-medium text-base mb-2 text-neutral-800">{card.title}</div>
          <div className="text-sm text-neutral-600">{card.description}</div>
        </div>
      ))}
    </div>
  );
}
