export type Language = 'hinglish' | 'english';

export interface ViralIdea {
  id: string;
  titleHinglish: string;
  titleEnglish: string;
  taglineHinglish: string;
  taglineEnglish: string;
  category: 'business' | 'devotion' | 'utility' | 'schemes' | 'social';
  difficulty: 'Very Easy' | 'Easy' | 'Medium';
  serverCost: '₹0 (100% Client-side)' | '< ₹500/month';
  viralScore: number; // out of 10
  pricingModel: '₹10/Month AutoPay' | '₹5 One-time per Export' | '₹9 Micro-Pack';
  targetAudienceHinglish: string;
  targetAudienceEnglish: string;
  theCorePainPoint: {
    hinglish: string;
    english: string;
  };
  whyPeoplePay10Rs: {
    hinglish: string;
    english: string;
  };
  viralLoopMechanism: {
    hinglish: string;
    english: string;
  };
  zeroCostTechSecret: {
    hinglish: string;
    english: string;
  };
  growthRoadmap: {
    step: string;
    descHinglish: string;
    descEnglish: string;
  }[];
  monetizationTriggerHinglish: string;
  monetizationTriggerEnglish: string;
  samplePromptForAI: string;
}

export interface CalculatorState {
  monthlyUsers: number;
  conversionRate: number; // in percentage e.g. 5
  monthlyPrice: number; // in INR
  architectureType: 'client-side' | 'cloud-server';
}
