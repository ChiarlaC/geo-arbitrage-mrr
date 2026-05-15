'use client';

import { AiModelData } from '@/lib/types';
import { useState, useMemo } from 'react';

interface AiUseCaseRecommendationsProps {
  models: AiModelData[];
}

const USE_CASES = [
  {
    icon: '💬',
    title: 'Chatbot / Customer Support',
    description: 'High volume, cost-sensitive',
    priority: 'Low Cost',
    priorityClass: 'bg-green-100 text-green-800',
    filterFunc: (m: AiModelData) => {
      const n = m.model_name.toLowerCase();
      return n.includes('haiku') || n.includes('flash') || n.includes('mini') || n.includes('nano');
    },
  },
  {
    icon: '💻',
    title: 'Code Generation & Review',
    description: 'Complex reasoning, accuracy critical',
    priority: 'High Quality',
    priorityClass: 'bg-purple-100 text-purple-800',
    filterFunc: (m: AiModelData) => {
      const n = m.model_name.toLowerCase();
      return (n.includes('opus') || n.includes('gpt-4') || n.includes('claude-3')) &&
             !n.includes('mini') && !n.includes('haiku');
    },
  },
  {
    icon: '📄',
    title: 'Document Analysis / RAG',
    description: 'Long context, batch processing',
    priority: 'Balanced',
    priorityClass: 'bg-blue-100 text-blue-800',
    filterFunc: (m: AiModelData) => (parseInt(m.context_length) || 0) >= 100000,
  },
  {
    icon: '✍️',
    title: 'Content Writing / Marketing',
    description: 'Creative, moderate volume',
    priority: 'Balanced',
    priorityClass: 'bg-blue-100 text-blue-800',
    filterFunc: (m: AiModelData) => {
      const n = m.model_name.toLowerCase();
      return n.includes('sonnet') || n.includes('gpt-4') || n.includes('gemini');
    },
  },
];

export default function AiUseCaseRecommendations({ models }: AiUseCaseRecommendationsProps) {
  const [open, setOpen] = useState(false);

  const recommendations = useMemo(() =>
    USE_CASES.map(uc => {
      const top = [...models]
        .filter(uc.filterFunc)
        .sort((a, b) =>
          (Number(a.input_cost) + Number(a.output_cost)) -
          (Number(b.input_cost) + Number(b.output_cost))
        )[0];
      return { ...uc, top };
    }),
    [models]
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-12">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors rounded-xl"
      >
        <div className="flex items-center gap-2">
          <span>🎯</span>
          <span className="font-semibold text-gray-900">Model Recommendations by Use Case</span>
        </div>
        <span className="text-gray-400 text-sm">{open ? '▲ collapse' : '▼ expand'}</span>
      </button>

      {/* Compact summary — always visible */}
      <div className="px-6 pb-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {recommendations.map(uc => (
          <div key={uc.title} className="border border-gray-100 rounded-lg p-3 bg-gray-50">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-base">{uc.icon}</span>
              <span className="text-xs font-semibold text-gray-700 leading-tight">{uc.title}</span>
            </div>
            <span className={`inline-block px-1.5 py-0.5 text-xs rounded font-medium ${uc.priorityClass} mb-2`}>
              {uc.priority}
            </span>
            {uc.top ? (
              <>
                <p className="text-xs font-semibold text-gray-900 truncate">{uc.top.model_name}</p>
                <p className="text-xs text-green-700 font-bold mt-0.5">
                  ${(Number(uc.top.input_cost) + Number(uc.top.output_cost)).toFixed(2)}/1M
                </p>
              </>
            ) : (
              <p className="text-xs text-gray-400 italic">No match</p>
            )}
          </div>
        ))}
      </div>

      {/* Expanded detail */}
      {open && (
        <div className="px-6 pb-6 border-t border-gray-100 pt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {recommendations.map(uc => {
            const top3 = [...models]
              .filter(uc.filterFunc)
              .sort((a, b) =>
                (Number(a.input_cost) + Number(a.output_cost)) -
                (Number(b.input_cost) + Number(b.output_cost))
              )
              .slice(0, 3);

            return (
              <div key={uc.title} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span>{uc.icon}</span>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{uc.title}</p>
                    <p className="text-xs text-gray-500">{uc.description}</p>
                  </div>
                  <span className={`ml-auto px-2 py-0.5 text-xs rounded font-medium ${uc.priorityClass}`}>
                    {uc.priority}
                  </span>
                </div>
                <div className="space-y-2">
                  {top3.length > 0 ? top3.map((m, i) => (
                    <div key={m.model_name} className={`flex items-center justify-between p-2 rounded text-xs ${i === 0 ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span>{['🥇','🥈','🥉'][i]}</span>
                        <span className="font-medium text-gray-900 truncate">{m.model_name}</span>
                      </div>
                      <span className="font-bold text-gray-900 ml-2 shrink-0">
                        ${(Number(m.input_cost) + Number(m.output_cost)).toFixed(2)}
                      </span>
                    </div>
                  )) : (
                    <p className="text-xs text-gray-400 italic">No models match</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
