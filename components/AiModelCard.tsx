import { AiModelData } from '@/lib/types';

interface AiModelCardProps {
  model: AiModelData;
}

const costBadge = (total: number) => {
  if (total <= 0.5) return { label: 'Budget', className: 'bg-green-100 text-green-800' };
  if (total <= 2) return { label: 'Balanced', className: 'bg-blue-100 text-blue-800' };
  return { label: 'Premium', className: 'bg-purple-100 text-purple-800' };
};

export default function AiModelCard({ model }: AiModelCardProps) {
  const provider = model.model_name.split(':')[0]?.trim() || 'Unknown';
  const modelName = model.model_name.split(':')[1]?.trim() || model.model_name;
  const totalCost = model.input_cost + model.output_cost;
  const badge = costBadge(totalCost);

  // Derive a simple "best for" tag by model name and modality
  const bestFor = (() => {
    const lowerName = model.model_name.toLowerCase();
    if (lowerName.includes('haiku') || lowerName.includes('flash') || lowerName.includes('nano')) {
      return 'Best for: Chatbots & High Volume';
    }
    if (lowerName.includes('opus') || lowerName.includes('gpt-4')) {
      return 'Best for: Complex Reasoning';
    }
    if (model.modality.toLowerCase().includes('image')) {
      return 'Best for: Vision & Image Gen';
    }
    if (model.modality.toLowerCase().includes('code')) {
      return 'Best for: Code Generation';
    }
    if (model.modality.toLowerCase().includes('video')) {
      return 'Best for: Video & Multimodal';
    }
    return 'Best for: General Purpose';
  })();

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-xl hover:scale-105 transition-all duration-200 ease-out">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{modelName}</h3>
          <p className="text-sm text-gray-500">{provider}</p>
        </div>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${badge.className}`}>
          {badge.label}
        </span>
      </div>

      {/* Best For Tag */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-full">
          {bestFor}
        </span>
      </div>

      {/* Cost Info */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="text-center bg-blue-50 rounded-lg p-3">
          <p className="text-xs text-gray-600 mb-1">Input Cost</p>
          <p className="text-lg font-bold text-blue-700">${model.input_cost.toFixed(2)}</p>
          <p className="text-xs text-gray-500">per 1M tokens</p>
        </div>
        <div className="text-center bg-green-50 rounded-lg p-3">
          <p className="text-xs text-gray-600 mb-1">Output Cost</p>
          <p className="text-lg font-bold text-green-700">${model.output_cost.toFixed(2)}</p>
          <p className="text-xs text-gray-500">per 1M tokens</p>
        </div>
      </div>

      {/* Total Cost */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Total Cost</span>
          <span className="text-xl font-bold text-gray-900">${totalCost.toFixed(2)}</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">per 1M input + 1M output tokens</p>
      </div>

      {/* Additional Details */}
      <div className="space-y-2 border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">Context Length</span>
          <span className="text-sm font-semibold text-gray-800">
            {model.context_length ? `${(parseInt(model.context_length) / 1000).toFixed(0)}K` : 'N/A'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">Modality</span>
          <span className="text-sm font-semibold text-gray-800">{model.modality}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">Category</span>
          <span className="text-sm font-semibold text-gray-800">{model.category}</span>
        </div>
      </div>
    </div>
  );
}
