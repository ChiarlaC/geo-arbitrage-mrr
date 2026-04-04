import AiPricingDashboard from '@/components/AiPricingDashboard';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI API Pricing Comparison | Subpricing',
  description: 'Compare pricing for AI models across providers including OpenAI, Anthropic, Google, and more. Real-time cost analysis for GPT-5, Claude, Gemini, and other models.',
  keywords: ['AI pricing', 'API costs', 'GPT-5 pricing', 'Claude pricing', 'Gemini pricing', 'AI model comparison'],
};

export default function AiPricingPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'AI Pricing', href: '/ai-pricing' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumbs items={breadcrumbs} />
        
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI API Pricing Comparison
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Compare real-time pricing for AI models across providers. Analyze input/output costs, 
            context lengths, and modalities to find the most cost-effective solution for your use case.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Total Models</h3>
            <p className="text-3xl font-bold text-blue-600">20</p>
            <p className="text-gray-500 text-sm mt-2">Across 6 major providers</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Cost Range</h3>
            <p className="text-3xl font-bold text-green-600">$0.05 - $25</p>
            <p className="text-gray-500 text-sm mt-2">Per 1M output tokens</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Categories</h3>
            <p className="text-3xl font-bold text-purple-600">5</p>
            <p className="text-gray-500 text-sm mt-2">Text, Code, Image, Multimodal, Social Media</p>
          </div>
        </div>

        <AiPricingDashboard />
        
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-3">How to Use This Data</h3>
          <ul className="list-disc pl-5 text-blue-700 space-y-2">
            <li><strong>Input Costs:</strong> Price per 1 million input tokens processed</li>
            <li><strong>Output Costs:</strong> Price per 1 million output tokens generated</li>
            <li><strong>Context Length:</strong> Maximum tokens the model can process in one request</li>
            <li><strong>Modality:</strong> Types of input/output supported (text, image, video, etc.)</li>
          </ul>
          <p className="mt-4 text-blue-600 text-sm">
            Note: Prices are per 1M tokens and may vary based on usage volume and provider promotions.
          </p>
        </div>
      </div>
    </div>
  );
}
