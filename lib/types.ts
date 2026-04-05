export interface PricingData {
  service: string;
  country: string;
  plan: string;
  localPrice: number;
  localCurrency: string;
  priceUSD: number;
  savingsPercent: number;
  symbol: string;
}

export interface AiModelData {
  model_id: string;
  model_name: string;
  category: string;
  input_cost: number;
  output_cost: number;
  context_length: string;
  modality: string;
}

export interface ServiceCountryParams {
  service: string;
  country: string;
}

export interface GuideData {
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  steps: Step[];
  vpnRequired: boolean;
}

export interface Step {
  number: number;
  title: string;
  description: string;
}
