import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import AiPricingDashboard from '@/components/AiPricingDashboard';
import AiCostCalculator from '@/components/AiCostCalculator';
import AiUseCaseRecommendations from '@/components/AiUseCaseRecommendations';
import AiPricingTable from '@/components/AiPricingTable';
import NordVPNBanner from '@/components/NordVPNBanner';
import aiDataJson from '@/public/ai-data.json';
import { AiModelData } from '@/lib/types';

// SEO-first metadata with long-tail keywords directly in title/description
export const metadata: Metadata = {
  title: 'AI API Pricing 2026: Claude, GPT-4, Gemini Cost Comparison',
  description:
    'Compare Claude API pricing, GPT-4 cost, OpenAI API rates, Anthropic pricing, and Google Gemini API costs. Find the cheapest AI API across providers with real-time model pricing.',
  keywords: [
    'claude api pricing',
    'gpt-4 cost',
    'gpt-4 api cost',
    'anthropic pricing',
    'openai api cost',
    'gemini api pricing',
    'ai model comparison',
    'cheapest ai api',
  ],
  alternates: {
    canonical: 'https://subpricing.com/ai-pricing',
  },
};

// Server-rendered page to expose pricing data to crawlers (no JS required for core content)
export default async function AiPricingPage() {
  const aiModels = aiDataJson as AiModelData[];

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'AI Pricing', href: '/ai-pricing' },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the cheapest AI API in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The cheapest AI APIs are typically small/fast models like Claude Haiku, GPT-4o Mini, and Gemini Flash, which cost under $0.50 per 1M tokens. Use the calculator above to compare costs for your specific token volume.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is Claude API pricing calculated?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Claude API pricing is charged per 1M tokens, with separate rates for input (prompt) and output (completion) tokens. Claude Haiku is the most affordable, while Claude Opus is the most capable and expensive.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does GPT-4 cost compare to Claude and Gemini?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'GPT-4 pricing is generally higher than Gemini Flash and Claude Haiku, but comparable to Claude Sonnet. For high-volume use cases, Gemini Flash and Claude Haiku offer the best cost-performance ratio.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does context length mean for AI API pricing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Context length is the maximum number of tokens a model can process in one request. Longer context windows (like Gemini\'s 1M token context) are useful for RAG and document analysis, but every token in the context counts toward your input cost.',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI API Pricing Comparison 2026: Claude, GPT-4, Gemini
          </h1>
          <p className="text-lg text-gray-700 max-w-4xl">
            Compare <strong>Claude API pricing</strong>, <strong>GPT-4 cost</strong>, and <strong>Gemini API pricing</strong>
            across OpenAI, Anthropic, Google, and emerging providers. Find the <strong>cheapest AI API</strong> for your use case.
          </p>
        </header>

        {/* 1. Calculator — primary action */}
        <section className="mb-12">
          <AiCostCalculator models={aiModels} />
        </section>

        {/* 2. Sortable pricing table */}
        <AiPricingTable models={aiModels} />

        {/* 3. Interactive dashboard — tabs, chart, model cards */}
        <div className="mb-12">
          <AiPricingDashboard models={aiModels} />
        </div>

        {/* 4. Use case recommendations — collapsed by default */}
        <AiUseCaseRecommendations models={aiModels} />

        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-3">How to Use This Data</h3>
          <ul className="list-disc pl-5 text-blue-700 space-y-2">
            <li>
              <strong>Input Costs:</strong> Compare $/1M input tokens for <strong>Claude API pricing</strong>,
              <strong> GPT-4 cost</strong>, and <strong>Gemini pricing</strong>.
            </li>
            <li>
              <strong>Output Costs:</strong> Check completion pricing to find the <strong>cheapest AI API</strong> for your
              use case.
            </li>
            <li>
              <strong>Context Length:</strong> Long contexts help RAG and agents — see Anthropic and Gemini limits.
            </li>
            <li>
              <strong>Modality:</strong> Text, code, image, and multimodal support for each model.
            </li>
          </ul>
          <p className="mt-4 text-blue-700 text-sm">
            Prices are per 1M tokens and may vary by region or volume tiers. Last updated automatically from provider
            documentation.
          </p>
        </div>

        {/* NordVPN Affiliate Banner */}
        <NordVPNBanner />
      </div>
    </div>
  );
}
