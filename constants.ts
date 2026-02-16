
import { RiskLevel, MilitaryBase, BaseType } from './types';

export const RISK_COLORS = {
  [RiskLevel.LOW]: '#0f172a',      // Neutral Slate 900 (Hidden/Stable)
  [RiskLevel.MEDIUM]: '#f59e0b',   // Amber 500
  [RiskLevel.HIGH]: '#f97316',     // Orange 500
  [RiskLevel.CRITICAL]: '#ef4444', // Red 500
  [RiskLevel.UNKNOWN]: '#0f172a'    // Neutral Slate 900
};

export const RISK_GRADIENTS = {
  [RiskLevel.LOW]: 'from-slate-800/10 to-slate-900/5',
  [RiskLevel.MEDIUM]: 'from-amber-500/20 to-amber-500/5',
  [RiskLevel.HIGH]: 'from-orange-500/20 to-orange-500/5',
  [RiskLevel.CRITICAL]: 'from-red-500/20 to-red-500/5',
  [RiskLevel.UNKNOWN]: 'from-slate-800/10 to-slate-900/5'
};

export const MOCK_BASES: MilitaryBase[] = [
  // Europe
  { id: 'ramstein', name: 'Ramstein Air Base', type: BaseType.NATO, coordinates: [7.5963, 49.4367] },
  { id: 'incirlik', name: 'Incirlik Air Base', type: BaseType.NATO, coordinates: [35.4258, 37.0019] },
  { id: 'rota', name: 'Naval Station Rota', type: BaseType.NATO, coordinates: [-6.3492, 36.6475] },
  { id: 'lakenheath', name: 'RAF Lakenheath', type: BaseType.NATO, coordinates: [0.5542, 52.4081] },
  { id: 'aviano', name: 'Aviano Air Base', type: BaseType.NATO, coordinates: [12.5964, 46.0319] },
  
  // Middle East & Africa
  { id: 'djibouti', name: 'Camp Lemonnier', type: BaseType.STRATEGIC, coordinates: [43.1494, 11.5475] },
  { id: 'bahrain', name: 'NSA Bahrain', type: BaseType.NAVAL, coordinates: [50.6074, 26.2131] },
  { id: 'al-udeid', name: 'Al Udeid Air Base', type: BaseType.AIRBASE, coordinates: [51.3148, 25.1171] },
  { id: 'kenya', name: 'Camp Simba', type: BaseType.STRATEGIC, coordinates: [40.9167, -2.2833] },
  { id: 'juffair', name: 'HMS Juffair', type: BaseType.NAVAL, coordinates: [50.601, 26.216] },
  
  // Indo-Pacific
  { id: 'yokosuka', name: 'Fleet Activities Yokosuka', type: BaseType.NAVAL, coordinates: [139.6719, 35.2931] },
  { id: 'guam', name: 'Andersen Air Force Base', type: BaseType.STRATEGIC, coordinates: [144.9245, 13.5783] },
  { id: 'okinawa', name: 'Kadena Air Base', type: BaseType.AIRBASE, coordinates: [127.7675, 26.3556] },
  { id: 'singapore', name: 'Changi Naval Base', type: BaseType.NAVAL, coordinates: [104.0247, 1.3217] },
  { id: 'darwin', name: 'RAAF Base Darwin', type: BaseType.AIRBASE, coordinates: [130.8767, -12.4147] },
  { id: 'subic', name: 'Subic Bay Hub', type: BaseType.STRATEGIC, coordinates: [120.3111, 14.8219] },
  { id: 'kunsan', name: 'Kunsan Air Base', type: BaseType.AIRBASE, coordinates: [126.6156, 35.9261] },

  // Americas
  { id: 'norfolk', name: 'Naval Station Norfolk', type: BaseType.NAVAL, coordinates: [-76.2972, 36.9375] },
  { id: 'san-diego', name: 'Naval Base San Diego', type: BaseType.NAVAL, coordinates: [-117.1222, 32.6847] },
  { id: 'manta', name: 'Manta Eloy Alfaro', type: BaseType.STRATEGIC, coordinates: [-80.6781, -0.9472] },
  { id: 'sao-paulo', name: 'Santos Naval Base', type: BaseType.NAVAL, coordinates: [-46.3333, -23.9333] },
  { id: 'falklands', name: 'Mount Pleasant', type: BaseType.STRATEGIC, coordinates: [-58.4472, -51.8231] },

  // Arctic / Others
  { id: 'diego-garcia', name: 'Diego Garcia Base', type: BaseType.STRATEGIC, coordinates: [72.4111, -7.3133] },
  { id: 'thule', name: 'Pituffik Space Base', type: BaseType.STRATEGIC, coordinates: [-68.7558, 76.5311] },
  { id: 'ascension', name: 'Ascension Island Base', type: BaseType.AIRBASE, coordinates: [-14.4147, -7.9333] }
];

export const MOCK_RISK_DATA: Record<string, { score: number; level: RiskLevel }> = {
  "USA": { score: 12, level: RiskLevel.LOW },
  "CAN": { score: 8, level: RiskLevel.LOW },
  "RUS": { score: 88, level: RiskLevel.CRITICAL },
  "CHN": { score: 68, level: RiskLevel.HIGH },
  "UKR": { score: 98, level: RiskLevel.CRITICAL },
  "AFG": { score: 92, level: RiskLevel.CRITICAL },
  "IRN": { score: 82, level: RiskLevel.HIGH },
  "SAU": { score: 52, level: RiskLevel.MEDIUM },
  "BRA": { score: 42, level: RiskLevel.MEDIUM },
  "IND": { score: 48, level: RiskLevel.MEDIUM },
  "DEU": { score: 18, level: RiskLevel.LOW },
  "FRA": { score: 22, level: RiskLevel.LOW },
  "GBR": { score: 20, level: RiskLevel.LOW },
  "AUS": { score: 10, level: RiskLevel.LOW },
  "JPN": { score: 12, level: RiskLevel.LOW },
  "ISR": { score: 78, level: RiskLevel.HIGH },
  "MEX": { score: 58, level: RiskLevel.HIGH },
  "NGA": { score: 72, level: RiskLevel.HIGH },
  "EGY": { score: 64, level: RiskLevel.HIGH },
  "PRK": { score: 94, level: RiskLevel.CRITICAL },
  "VEN": { score: 84, level: RiskLevel.HIGH }
};
