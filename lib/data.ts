import { PricingData, AiModelData } from './types';

// Sample data for development
// In production, this will be replaced by the preprocessed JSON from DeepSeek

export const samplePricingData: PricingData[] = [
  {
    service: 'Netflix',
    country: 'Turkey',
    plan: 'Standard HD',
    localPrice: 149.99,
    localCurrency: 'TRY',
    priceUSD: 3.37,
    savingsPercent: 78.3,
    symbol: '₺',
  },
  {
    service: 'Spotify',
    country: 'Argentina',
    plan: 'Individual',
    localPrice: 799,
    localCurrency: 'ARS',
    priceUSD: 0.85,
    savingsPercent: 85.2,
    symbol: 'ARS',
  },
  {
    service: 'YouTube Premium',
    country: 'India',
    plan: 'Individual',
    localPrice: 129,
    localCurrency: 'INR',
    priceUSD: 1.55,
    savingsPercent: 88.5,
    symbol: '₹',
  },
];

export const sampleAiModelData: AiModelData[] = [
  {
    model_id: 'qwen/qwen3.5-9b',
    model_name: 'Qwen: Qwen3.5-9B',
    category: 'Multimodal',
    input_cost: 0.05,
    output_cost: 0.15,
    context_length: '256K',
    modality: 'text+image+video->text',
  },
  {
    model_id: 'claude-3-haiku',
    model_name: 'Claude 3 Haiku',
    category: 'Text',
    input_cost: 0.25,
    output_cost: 1.25,
    context_length: '200K',
    modality: 'text',
  },
];

import pricingDataJson from '@/public/data.json';

export async function loadPricingData(): Promise<PricingData[]> {
  return pricingDataJson.subscriptions as PricingData[];
}

export async function loadAiModelData(): Promise<AiModelData[]> {
  // In production, fetch from public/ai-data.json
  try {
    // Use absolute URL for development
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000' 
      : '';
    const response = await fetch(`${baseUrl}/ai-data.json`);
    if (!response.ok) {
      throw new Error('Failed to load AI data');
    }
    return await response.json();
  } catch (error) {
    console.warn('Using sample AI model data due to error:', error);
    return sampleAiModelData;
  }
}

export function getPrice(service: string, country: string): PricingData | undefined {
  const allData = require('@/public/data.json');
  return allData.subscriptions.find(
    (item: PricingData) =>
      item.service.toLowerCase() === service.toLowerCase() &&
      item.country.toLowerCase() === country.toLowerCase()
  );
}
