'use client';

import { useState } from 'react';
import { AiModelData } from '@/lib/types';

type SortKey = 'model_name' | 'category' | 'input_cost' | 'output_cost' | 'context_length';
type SortDir = 'asc' | 'desc';

interface AiPricingTableProps {
  models: AiModelData[];
}

export default function AiPricingTable({ models }: AiPricingTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('input_cost');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  }

  const sorted = [...models].sort((a, b) => {
    let av: string | number;
    let bv: string | number;
    if (sortKey === 'input_cost' || sortKey === 'output_cost') {
      av = Number(a[sortKey]) || 0;
      bv = Number(b[sortKey]) || 0;
    } else if (sortKey === 'context_length') {
      av = parseInt(a.context_length) || 0;
      bv = parseInt(b.context_length) || 0;
    } else {
      av = a[sortKey];
      bv = b[sortKey];
    }
    if (av < bv) return sortDir === 'asc' ? -1 : 1;
    if (av > bv) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const arrow = (key: SortKey) => {
    if (sortKey !== key) return <span className="text-gray-300 ml-1">↕</span>;
    return <span className="text-blue-500 ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>;
  };

  const thClass = "px-4 py-3 cursor-pointer select-none hover:bg-gray-50 whitespace-nowrap";

  return (
    <section className="bg-white border border-gray-200 rounded-xl shadow-sm mb-12">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">AI Model Pricing Table</h2>
        <p className="text-gray-600 text-sm mt-1">
          Click any column header to sort. Real prices for Claude, GPT-4, Gemini, and more.
        </p>
      </div>
      <div className="max-h-[500px] overflow-y-auto overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full text-left text-sm">
          <thead className="sticky top-0 bg-white z-10 border-b-2 border-gray-300 text-gray-700 uppercase tracking-wide">
            <tr>
              <th className={thClass} onClick={() => handleSort('model_name')}>
                Model {arrow('model_name')}
              </th>
              <th className={thClass} onClick={() => handleSort('category')}>
                Category {arrow('category')}
              </th>
              <th className={thClass} onClick={() => handleSort('input_cost')}>
                Input $/1M {arrow('input_cost')}
              </th>
              <th className={thClass} onClick={() => handleSort('output_cost')}>
                Output $/1M {arrow('output_cost')}
              </th>
              <th className={thClass} onClick={() => handleSort('context_length')}>
                Context {arrow('context_length')}
              </th>
              <th className="px-4 py-3 whitespace-nowrap">Modality</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((model) => (
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
  );
}
