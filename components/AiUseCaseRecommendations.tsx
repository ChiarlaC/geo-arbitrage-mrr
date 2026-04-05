'use client';

import { AiModelData } from '@/lib/types';
import { useMemo } from 'react';

interface AiUseCaseRecommendationsProps {
  models: AiModelData[];
}

interface UseCase {
  icon: string;
  title: string;
  description: string;
  priority: 'cost' | 'balanced' | 'quality';
  filterFunc: (model: AiModelData) => boolean;
}

export default function AiUseCaseRecommendations({ models }: AiUseCaseRecommendationsProps) {
  const useCases: UseCase[] = [
    {
      icon: '💬',
      title: 'Chatbot / Customer Support',
      description: 'High volume, quick responses, cost-sensitive',
      priority: 'cost',
      filterFunc: (m) => {
        const name = m.model_name.toLowerCase();
        return name.includes('haiku') || name.includes('flash') || name.includes('mini') || name.includes('nano');
      },
    },
    {
      icon: '💻',
      title: 'Code Generation & Review',
      description: 'Complex reasoning, accuracy critical',
      priority: 'quality',
      filterFunc: (m) => {
        const name = m.model_name.toLowerCase();
        return (name.includes('opus') || name.includes('gpt-4') || name.includes('claude-3')) &&
               !name.includes('mini') && !name.includes('haiku');
      },
    },
    {
      icon: '📄',
      title: 'Document Analysis / RAG',
      description: 'Long context, batch processing',
      priority: 'balanced',
      filterFunc: (m) => {
        return (parseInt(m.context_length) || 0) >= 100000;
      },
    },
    {
      icon: '✍️',
      title: 'Content Writing / Marketing',
      description: 'Creative, natural language, moderate volume',
      priority: 'balanced',
      filterFunc: (m) => {
        const name = m.model_name.toLowerCase();
        return name.includes('sonnet') || name.includes('gpt-4') || name.includes('gemini');
      },
    },
  ];

  const getRecommendationsForUseCase = (useCase: UseCase) => {
    const filtered = models.filter(useCase.filterFunc);

    // Sort by total cost (input + output average)
    const sorted = filtered.sort((a, b) => {
      const costA = (Number(a.input_cost) || 0) + (Number(a.output_cost) || 0);
      const costB = (Number(b.input_cost) || 0) + (Number(b.output_cost) || 0);
      return costA - costB;
    });

    // Return top 3
    return sorted.slice(0, 3);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        🎯 Model Recommendations by Use Case
      </h2>
      <p className="text-gray-600 mb-8">
        Find the best AI model for your specific application based on cost, performance, and quality trade-offs.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {useCases.map((useCase) => {
          const recommendations = getRecommendationsForUseCase(useCase);

          return (
            <div
              key={useCase.title}
              className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all"
            >
              {/* Use Case Header */}
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl">{useCase.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {useCase.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {useCase.description}
                  </p>
                  <span
                    className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded ${
                      useCase.priority === 'cost'
                        ? 'bg-green-100 text-green-800'
                        : useCase.priority === 'quality'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    Priority: {useCase.priority === 'cost' ? 'Low Cost' : useCase.priority === 'quality' ? 'High Quality' : 'Balanced'}
                  </span>
                </div>
              </div>

              {/* Recommendations */}
              <div className="space-y-3">
                {recommendations.length > 0 ? (
                  recommendations.map((model, index) => {
                    const totalCost = (Number(model.input_cost) || 0) + (Number(model.output_cost) || 0);

                    return (
                      <div
                        key={model.model_name}
                        className={`p-3 rounded-lg ${
                          index === 0 ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200' : 'bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              {index === 0 && <span className="text-sm">🥇</span>}
                              {index === 1 && <span className="text-sm">🥈</span>}
                              {index === 2 && <span className="text-sm">🥉</span>}
                              <p className="font-semibold text-sm text-gray-900">
                                {model.model_name}
                              </p>
                            </div>
                            <div className="flex items-center gap-3 mt-1 text-xs text-gray-600">
                              <span>In: ${(Number(model.input_cost) || 0).toFixed(2)}/1M</span>
                              <span>Out: ${(Number(model.output_cost) || 0).toFixed(2)}/1M</span>
                              {model.context_length && (
                                <span className="text-blue-600">
                                  {(parseInt(model.context_length) / 1000).toFixed(0)}K ctx
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <p className="text-sm font-bold text-gray-900">
                              ${totalCost.toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-500">total/1M</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-500 italic">No models match this use case</p>
                )}
              </div>

              {/* Estimated Monthly Cost */}
              {recommendations.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-600 mb-2">
                    <strong>Estimated monthly cost for typical usage:</strong>
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">1M input + 500K output tokens</span>
                    <span className="font-bold text-green-600">
                      ${((Number(recommendations[0].input_cost) || 0) +
                         (Number(recommendations[0].output_cost) || 0) * 0.5).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Tips */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
          <span>💡</span> Cost Optimization Tips
        </h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start gap-2">
            <span className="font-bold mt-0.5">•</span>
            <span><strong>Route by complexity:</strong> Use cheaper models (Haiku, Flash) for 70% of queries, premium models for 10%</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold mt-0.5">•</span>
            <span><strong>Enable prompt caching:</strong> Claude and GPT-4 offer 90% discounts on cached prompts</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold mt-0.5">•</span>
            <span><strong>Batch API requests:</strong> Save 50% with OpenAI and Anthropic batch APIs for non-urgent tasks</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold mt-0.5">•</span>
            <span><strong>Long context isn't always better:</strong> Use retrieval systems to reduce input token count</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
