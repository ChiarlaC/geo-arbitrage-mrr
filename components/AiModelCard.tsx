import { AiModelData } from '@/lib/types';

interface AiModelCardProps {
  model: AiModelData;
}

export default function AiModelCard({ model }: AiModelCardProps) {
  // 提取提供商名称
  const provider = model.model_name.split(':')[0]?.trim() || 'Unknown';
  const modelName = model.model_name.split(':')[1]?.trim() || model.model_name;

  // 计算总成本（输入+输出）
  const totalCost = model.input_cost + model.output_cost;

  // 根据成本范围设置颜色
  const getCostColor = (cost: number) => {
    if (cost < 1) return 'text-green-600';
    if (cost < 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  // 格式化分类标签
  const categories = model.category.split(', ');

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{modelName}</h3>
          <p className="text-sm text-gray-500">{provider}</p>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
          {model.modality.split('->')[0]}
        </span>
      </div>

      {/* 成本信息 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Input Cost</p>
          <p className={`text-xl font-bold ${getCostColor(model.input_cost)}`}>
            ${model.input_cost.toFixed(2)}
          </p>
          <p className="text-xs text-gray-400">per 1M tokens</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Output Cost</p>
          <p className={`text-xl font-bold ${getCostColor(model.output_cost)}`}>
            ${model.output_cost.toFixed(2)}
          </p>
          <p className="text-xs text-gray-400">per 1M tokens</p>
        </div>
      </div>

      {/* 总成本 */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Total Cost (Input + Output)</span>
          <span className={`text-lg font-bold ${getCostColor(totalCost)}`}>
            ${totalCost.toFixed(2)}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full" 
            style={{ width: `${Math.min(totalCost * 10, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* 其他信息 */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Context Length</span>
          <span className="text-sm font-medium text-gray-900">{model.context_length}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Modality</span>
          <span className="text-sm font-medium text-gray-900">{model.modality}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Model ID</span>
          <span className="text-sm font-medium text-gray-900 truncate ml-2" title={model.model_id}>
            {model.model_id}
          </span>
        </div>
      </div>

      {/* 分类标签 */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
