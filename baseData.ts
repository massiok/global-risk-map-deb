import { RiskLevel } from './types';

export interface BaseCountryData {
    summary: string;
    stability: string;
    economic: string;
    threats: string[];
}

export const BASE_NATION_DATA: Record<string, BaseCountryData> = {
    "USA": {
        summary: "Sovereign North American power with high institutional stability and global military reach.",
        stability: "Stable democratic framework with high civilian control. Recent political polarization monitored as internal friction vector.",
        economic: "World's largest economy. Global reserve currency status provides high resilience despite fiscal deficit levels.",
        threats: ["Foreign disinformation campaigns", "Critical infrastructure cyber-threats", "Internal political polarization"]
    },
    "RUS": {
        summary: "Eurasian power currently engaged in high-intensity kinetic operations in the European sector.",
        stability: "Centralized executive authority. High internal security presence. Transition risks shielded by current war-time footing.",
        economic: "Resource-heavily economy facing major international sanctions. Pivot towards Eastern trade routes in progress.",
        threats: ["Kinetic escalation in Ukraine", "Long-term economic isolation", "Internal succession ambiguity"]
    },
    "CHN": {
        summary: "Leading Eastern industrial and military power with expanding maritime and technological influence.",
        stability: "High centralized control. Bureaucratic efficiency optimized for long-term strategic implementation.",
        economic: "Global manufacturing hub. Current transition from export-led to consumption-led growth navigating debt-overhang risks.",
        threats: ["Taiwan Strait maritime friction", "Semi-conductor supply chain wars", "Demographic contraction"]
    },
    "UKR": {
        summary: "Eastern European frontline state currently under active kinetic invasion.",
        stability: "War-time governance with unified institutional focus on national survival.",
        economic: "Significant infrastructure damage. High dependency on international multi-domain support for liquidity.",
        threats: ["Territorial integrity compromise", "Infrastructure annihilation", "Energy sector instability"]
    },
    "ITA": {
        summary: "Strategic Mediterranean NATO member with significant cultural and industrial influence.",
        stability: "Stable democratic framework within European Union integration. Periodic executive transitions typical of multi-party system.",
        economic: "Third largest Eurozone economy. High public debt managed via ECB stability frameworks. Strong manufacturing sector.",
        threats: ["Mediterranean migration route pressure", "Public debt sustainability", "Energy dependency volatility"]
    },
    "GBR": {
        summary: "Global North Atlantic maritime power and strategic nuclear state.",
        stability: "Highly stable constitutional monarchy with robust parliamentary history.",
        economic: "Leading global financial hub. Post-Brexit trade realignment remains a long-term strategic focus.",
        threats: ["Sub-sea cable infrastructure vulnerability", "Economic transition friction", "Northern Ireland protocol sensitivity"]
    }
};

export const DEFAULT_BASE_DATA: BaseCountryData = {
    summary: "Standard sovereign sector with baseline geopolitical parameters.",
    stability: "Clearance Level 3 required for detailed institutional stability analysis.",
    economic: "Sector metrics currently within typical regional fluctuations.",
    threats: ["Regional instability spillover", "Economic volatility", "Resource competition"]
};
