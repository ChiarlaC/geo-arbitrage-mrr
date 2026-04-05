'use client';

import { useState, useMemo } from 'react';
import { AiModelData } from '@/lib/types';

interface AiCostCalculatorProps {
  models: AiModelData[];
}

export default function AiCostCalculator({ models }: AiCostCalculatorProps) {
  const [inputTokens, setInputTokens] = useState(1000000); // 1M tokens default
  const [outputTokens, setOutputTokens] = useState(1000000);
  const [selectedProvider, setSelectedProvider] = useState('all');

  // Extract unique providers
  const providers = useMemo(() => {
    const providerSet = new Set(models.map(m => m.model_name.split(':')[0]?.split(' ')[0]));
    return ['all', ...Array.from(providerSet)].filter(Boolean);
  }, [models]);

  // Calculate costs and sort by total cost
  const calculatedCosts = useMemo(() => {
    let filtered = models;

    if (selectedProvider !== 'all') {
      filtered = models.filter(m =>
        m.model_name.toLowerCase().includes(selectedProvider.toLowerCase())
      );
    }

    const costs = filtered.map(model => {
      const inputCost = (Number(model.input_cost) || 0) * (inputTokens / 1000000);
      const outputCost = (Number(model.output_cost) || 0) * (outputTokens / 1000000);
      const totalCost = inputCost + outputCost;

      return {
        model: model.model_name,
        inputCost,
        outputCost,
        totalCost,
        contextLength: model.context_length,
      };
    });

    return costs.sort((a, b) => a.totalCost - b.totalCost);
  }, [models, inputTokens, outputTokens, selectedProvider]);

  // Get cheapest model
  const cheapestModel = calculatedCosts[0];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        💰 AI Cost Calculator
      </h2>

      {/* Input Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Input Tokens
          </label>
          <input
            type="number"
            value={inputTokens}
            onChange={(e) => setInputTokens(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            step="100000"
          />
          <p className="text-xs text-gray-500 mt-1">
            {(inputTokens / 1000000).toFixed(2)}M tokens
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Output Tokens
          </label>
          <input
            type="number"
            value={outputTokens}
            onChange={(e) => setOutputTokens(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            step="100000"
          />
          <p className="text-xs text-gray-500 mt-1">
            {(outputTokens / 1000000).toFixed(2)}M tokens
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Provider Filter
          </label>
          <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {providers.map(provider => (
              <option key={provider} value={provider}>
                {provider === 'all' ? 'All Providers' : provider}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Presets */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-700 mb-3">Quick Presets:</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => { setInputTokens(100000); setOutputTokens(50000); }}
            className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
          >
            Small (100K in / 50K out)
          </button>
          <button
            onClick={() => { setInputTokens(1000000); setOutputTokens(1000000); }}
            className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
          >
            Medium (1M in / 1M out)
          </button>
          <button
            onClick={() => { setInputTokens(10000000); setOutputTokens(5000000); }}
            className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
          >
            Large (10M in / 5M out)
          </button>
        </div>
      </div>

      {/* Cheapest Model Highlight */}
      {cheapestModel && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🏆</span>
            <h3 className="text-lg font-bold text-green-900">Cheapest Option</h3>
          </div>
          <p className="text-green-800 font-semibold text-lg">
            {cheapestModel.model}
          </p>
          <p className="text-green-700 text-2xl font-bold mt-1">
            ${cheapestModel.totalCost.toFixed(4)}
          </p>
          <p className="text-sm text-green-600 mt-1">
            Input: ${cheapestModel.inputCost.toFixed(4)} • Output: ${cheapestModel.outputCost.toFixed(4)}
          </p>
        </div>
      )}

      {/* Results Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
                Rank
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
                Model
              </th>
              <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-gray-700">
                Input Cost
              </th>
              <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-gray-700">
                Output Cost
              </th>
              <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-gray-700">
                Total Cost
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {calculatedCosts.slice(0, 15).map((cost, index) => (
              <tr
                key={cost.model}
                className={`hover:bg-gray-50 ${index === 0 ? 'bg-green-50' : ''}`}
              >
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  #{index + 1}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                  {cost.model}
                  {cost.contextLength && (
                    <span className="ml-2 text-xs text-gray-500">
                      ({cost.contextLength.toLocaleString()} ctx)
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-right text-gray-700">
                  ${cost.inputCost.toFixed(4)}
                </td>
                <td className="px-4 py-3 text-sm text-right text-gray-700">
                  ${cost.outputCost.toFixed(4)}
                </td>
                <td className="px-4 py-3 text-sm text-right font-bold text-gray-900">
                  ${cost.totalCost.toFixed(4)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {calculatedCosts.length > 15 && (
          <p className="text-sm text-gray-500 text-center mt-4">
            Showing top 15 models. Total: {calculatedCosts.length} models
          </p>
        )}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-600">Models Compared</p>
          <p className="text-lg font-bold text-gray-900">{calculatedCosts.length}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-600">Cheapest</p>
          <p className="text-lg font-bold text-green-600">
            ${cheapestModel?.totalCost.toFixed(4)}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-600">Most Expensive</p>
          <p className="text-lg font-bold text-red-600">
            ${calculatedCosts[calculatedCosts.length - 1]?.totalCost.toFixed(4)}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-600">Price Range</p>
          <p className="text-lg font-bold text-purple-600">
            {cheapestModel && calculatedCosts.length > 0
              ? `${(calculatedCosts[calculatedCosts.length - 1].totalCost / cheapestModel.totalCost).toFixed(1)}x`
              : '-'}
          </p>
        </div>
      </div>
    </div>
  );
}
