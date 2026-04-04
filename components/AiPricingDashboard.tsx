'use client';

import { useState, useEffect } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Line,
} from 'recharts';
import { AiModelData } from '@/lib/types';
import { loadAiModelData } from '@/lib/data';
import AiModelCard from './AiModelCard';

export default function AiPricingDashboard() {
  const [models, setModels] = useState<AiModelData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await loadAiModelData();
        setModels(data);
      } catch (error) {
        console.error('Failed to load AI model data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(models.map(model => model.category.split(', ')[0])))];

  // Filter models by selected category
  const filteredModels = selectedCategory === 'All' 
    ? models 
    : models.filter(model => model.category.includes(selectedCategory));

  // Prepare chart data (top 10 by input cost for visibility)
  const chartData = filteredModels
    .slice(0, 10)
    .map(model => ({
      name: model.model_name.split(':')[1]?.trim() || model.model_name,
      inputCost: model.input_cost,
      outputCost: model.output_cost,
      totalCost: model.input_cost + model.output_cost,
      contextLength: parseInt(model.context_length) || 0,
    }))
    .sort((a, b) => b.totalCost - a.totalCost);

  // Calculate statistics
  const avgInputCost = filteredModels.length > 0 
    ? filteredModels.reduce((sum, model) => sum + model.input_cost, 0) / filteredModels.length 
    : 0;
  const avgOutputCost = filteredModels.length > 0 
    ? filteredModels.reduce((sum, model) => sum + model.output_cost, 0) / filteredModels.length 
    : 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading AI pricing data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <Tabs.Root 
        defaultValue="All" 
        className="w-full"
        onValueChange={(value) => setSelectedCategory(value)}
      >
        <Tabs.List className="flex flex-wrap gap-2 border-b border-gray-200 pb-2 mb-6">
          {categories.map(category => (
            <Tabs.Trigger
              key={category}
              value={category}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Average Input Cost</h3>
          <p className="text-3xl font-bold text-blue-600">${avgInputCost.toFixed(2)}</p>
          <p className="text-gray-500 text-sm">per 1M tokens</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Average Output Cost</h3>
          <p className="text-3xl font-bold text-green-600">${avgOutputCost.toFixed(2)}</p>
          <p className="text-gray-500 text-sm">per 1M tokens</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Models in Category</h3>
          <p className="text-3xl font-bold text-purple-600">{filteredModels.length}</p>
          <p className="text-gray-500 text-sm">available models</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Cost Comparison</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={80}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                yAxisId="left"
                label={{ value: 'Cost ($ per 1M tokens)', angle: -90, position: 'insideLeft' }}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right"
                label={{ value: 'Context Length (K tokens)', angle: 90, position: 'insideRight' }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'inputCost') return [`$${value}`, 'Input Cost'];
                  if (name === 'outputCost') return [`$${value}`, 'Output Cost'];
                  if (name === 'totalCost') return [`$${value}`, 'Total Cost'];
                  return [value, name];
                }}
              />
              <Legend />
              <Bar 
                yAxisId="left"
                dataKey="inputCost" 
                name="Input Cost" 
                fill="#3b82f6" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                yAxisId="left"
                dataKey="outputCost" 
                name="Output Cost" 
                fill="#10b981" 
                radius={[4, 4, 0, 0]}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="contextLength" 
                name="Context Length (K)" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <p className="text-gray-500 text-sm mt-4">
          Comparing input/output costs and context lengths for top {chartData.length} models in {selectedCategory} category.
        </p>
      </div>

      {/* Model Cards Grid */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-6">AI Models ({filteredModels.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModels.map(model => (
            <AiModelCard key={model.model_id} model={model} />
          ))}
        </div>
      </div>
    </div>
  );
}
