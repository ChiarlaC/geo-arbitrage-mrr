import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import AiPricingDashboard from '@/components/AiPricingDashboard';
import AiCostCalculator from '@/components/AiCostCalculator';
import AiUseCaseRecommendations from '@/components/AiUseCaseRecommendations';
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

  // Basic aggregates for quick-read stats
  const totalModels = aiModels.length;
  const providers = Array.from(new Set(aiModels.map((m) => m.model_name.split(':')[0]?.trim())));
  const avgInput =
    aiModels.reduce((sum, m) => sum + (Number(m.input_cost) || 0), 0) / Math.max(aiModels.length, 1);
  const avgOutput =
    aiModels.reduce((sum, m) => sum + (Number(m.output_cost) || 0), 0) / Math.max(aiModels.length, 1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI API Pricing Comparison 2026: Claude, GPT-4, Gemini
          </h1>
          <p className="text-lg text-gray-700 max-w-4xl">
            Compare <strong>Claude API pricing</strong>, <strong>GPT-4 cost</strong>, and <strong>Gemini API pricing</strong>
            across OpenAI, Anthropic, Google, and emerging providers. This server-rendered page exposes real-time
            <strong> AI model costs</strong> so search engines and users can find the <strong>cheapest AI API</strong> without
            waiting for client-side JavaScript.
          </p>
        </header>

        {/* Interactive Cost Calculator - MOVED TO TOP */}
        <section className="mb-12">
          <AiCostCalculator models={aiModels} />
        </section>

        {/* Use Case Recommendations */}
        <section className="mb-12">
          <AiUseCaseRecommendations models={aiModels} />
        </section>

        {/* SEO-visible stats to ensure crawlers see key pricing facts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Models Indexed</h3>
            <p className="text-3xl font-bold text-blue-600">{totalModels}</p>
            <p className="text-gray-500 text-sm">Across {providers.length}+ providers</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Avg Input Cost</h3>
            <p className="text-3xl font-bold text-green-600">${avgInput.toFixed(2)}</p>
            <p className="text-gray-500 text-sm">per 1M input tokens (OpenAI, Anthropic, Google)</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Avg Output Cost</h3>
            <p className="text-3xl font-bold text-purple-600">${avgOutput.toFixed(2)}</p>
            <p className="text-gray-500 text-sm">per 1M output tokens across GPT-4, Claude, Gemini</p>
          </div>
        </div>

        {/* Server-rendered data table for crawlers (no JS needed) */}
        <section className="bg-white border border-gray-200 rounded-xl shadow-sm mb-12">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">AI Model Pricing Table (Server Rendered)</h2>
            <p className="text-gray-600 text-sm mt-1">
              Real prices for Claude, GPT-4, Gemini, and more — exposed in HTML for SEO visibility.
            </p>
          </div>
          <div className="max-h-[500px] overflow-y-auto overflow-x-auto border border-gray-200 rounded-lg">
            <table className="min-w-full text-left text-sm">
              <thead className="sticky top-0 bg-white z-10 border-b-2 border-gray-300 text-gray-700 uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3">Model</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Input $/1M</th>
                  <th className="px-4 py-3">Output $/1M</th>
                  <th className="px-4 py-3">Context</th>
                  <th className="px-4 py-3">Modality</th>
                </tr>
              </thead>
              <tbody>
                {aiModels.map((model) => (
                  <tr key={model.model_id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-gray-900">{model.model_name}</td>
                    <td className="px-4 py-3 text-gray-700">{model.category}</td>
                    <td className="px-4 py-3 text-gray-900">${Number(model.input_cost).toFixed(4)}</td>
                    <td className="px-4 py-3 text-gray-900">${Number(model.output_cost).toFixed(4)}</td>
                    <td className="px-4 py-3 text-gray-700">{model.context_length}</td>
                    <td className="px-4 py-3 text-gray-700">{model.modality}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Keep interactive dashboard for users; crawlers already saw server HTML above */}
        <AiPricingDashboard />

        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
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
