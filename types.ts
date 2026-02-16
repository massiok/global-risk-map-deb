
export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
  UNKNOWN = 'UNKNOWN'
}

export enum BaseType {
  NATO = 'NATO',
  STRATEGIC = 'STRATEGIC',
  NAVAL = 'NAVAL',
  AIRBASE = 'AIRBASE'
}

export interface MilitaryBase {
  id: string;
  name: string;
  type: BaseType;
  coordinates: [number, number]; // [longitude, latitude]
}

export interface IntelligenceResponse {
  summary: string;
  politicalStability: string;
  conflictPotential: string;
  economicRisk: string;
  keyThreats: string[];
  isAdvanced?: boolean;
  source?: 'CACHED' | 'LIVE' | 'BASE';
  timestamp?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  content: string;
  timestamp?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface LayerVisibility {
  risk: boolean;
  bases: boolean;
  hud: boolean;
}
