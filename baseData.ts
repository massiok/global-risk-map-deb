import { RiskLevel } from './types';

export interface BaseCountryData {
    summary: string;
    stability: string;
    economic: string;
    threats: string[];
    isDeepIntel?: boolean;
}

export const BASE_NATION_DATA: Record<string, BaseCountryData> = {
    "USA": {
        summary: "Sovereign North American power with high institutional stability and global military reach.",
        stability: "Stable democratic framework with high civilian control. Recent political polarization monitored as internal friction vector.",
        economic: "World's largest economy. Global reserve currency status provides high resilience despite fiscal deficit levels.",
        threats: ["Foreign disinformation campaigns", "Critical infrastructure cyber-threats", "Internal political polarization"],
        isDeepIntel: true
    },
    "RUS": {
        summary: "Eurasian power currently engaged in high-intensity kinetic operations in the European sector.",
        stability: "Centralized executive authority. High internal security presence. Transition risks shielded by current war-time footing.",
        economic: "Resource-heavily economy facing major international sanctions. Pivot towards Eastern trade routes in progress.",
        threats: ["Kinetic escalation in Ukraine", "Long-term economic isolation", "Internal succession ambiguity"],
        isDeepIntel: true
    },
    "CHN": {
        summary: "Leading Eastern industrial and military power with expanding maritime and technological influence.",
        stability: "High centralized control. Bureaucratic efficiency optimized for long-term strategic implementation.",
        economic: "Global manufacturing hub. Current transition from export-led to consumption-led growth navigating debt-overhang risks.",
        threats: ["Taiwan Strait maritime friction", "Semi-conductor supply chain wars", "Demographic contraction"],
        isDeepIntel: true
    },
    "UKR": {
        summary: "Eastern European frontline state currently under active kinetic invasion.",
        stability: "War-time governance with unified institutional focus on national survival.",
        economic: "Significant infrastructure damage. High dependency on international multi-domain support for liquidity.",
        threats: ["Territorial integrity compromise", "Infrastructure annihilation", "Energy sector instability"],
        isDeepIntel: true
    },
    "ITA": {
        summary: "Strategic Mediterranean NATO member with significant cultural and industrial influence.",
        stability: "Stable democratic framework within European Union integration. Periodic executive transitions typical of multi-party system.",
        economic: "Third largest Eurozone economy. High public debt managed via ECB stability frameworks. Strong manufacturing sector.",
        threats: ["Mediterranean migration route pressure", "Public debt sustainability", "Energy dependency volatility"],
        isDeepIntel: true
    },
    "GBR": {
        summary: "Global North Atlantic maritime power and strategic nuclear state.",
        stability: "Highly stable constitutional monarchy with robust parliamentary history.",
        economic: "Leading global financial hub. Post-Brexit trade realignment remains a long-term strategic focus.",
        threats: ["Sub-sea cable infrastructure vulnerability", "Economic transition friction", "Northern Ireland protocol sensitivity"],
        isDeepIntel: true
    },
    "DEU": {
        summary: "Central European industrial heartland and key diplomatic anchor of the EU.",
        stability: "High institutional stability. Strong focus on coalition governance and legal frameworks.",
        economic: "Europe's largest economy. Transitioning industrial base towards green energy while managing supply chain dependencies.",
        threats: ["Energy cost volatility", "Industrial digitalization lag", "Far-right political surge"],
        isDeepIntel: true
    },
    "FRA": {
        summary: "Strategic Western European power with significant military and diplomatic reach in Africa and Indo-Pacific.",
        stability: "Resilient presidential system. Frequent civil unrest episodes managed through standard institutional channels.",
        economic: "Diversified economy with strong nuclear energy sector and aerospace industry.",
        threats: ["Social cohesion friction", "Strategic autonomy challenges", "Influence loss in Sahel region"],
        isDeepIntel: true
    },
    "JPN": {
        summary: "Major Indo-Pacific island nation with advanced technology and significant maritime security role.",
        stability: "Exceptional institutional continuity. Single-party dominance with high administrative efficiency.",
        economic: "Highly advanced export-led economy. Managing long-term demographic decline and regional trade shifts.",
        threats: ["East China Sea maritime disputes", "Demographic contraction", "Regional nuclear escalation"],
        isDeepIntel: true
    },
    "ISR": {
        summary: "Technologically advanced Levant state currently in a high-alert security posture.",
        stability: "War-time emergency governance. High social cohesion despite internal political complexity.",
        economic: "High-tech powerhouse. Economic resilience tested by prolonged military mobilization and regional isolation.",
        threats: ["Multi-front kinetic conflict", "Internal social polarization", "Regional diplomatic isolation"],
        isDeepIntel: true
    },
    "IRN": {
        summary: "Middle Eastern regional power with significant influence on maritime chokepoints.",
        stability: "Theocratic executive control. Internal opposition monitored by extensive security apparatus.",
        economic: "Significant energy reserves hampered by systemic international sanctions and currency volatility.",
        threats: ["Regional proxy escalation", "Internal social unrest", "Nuclear program diplomatic friction"],
        isDeepIntel: true
    },
    "SAU": {
        summary: "Leading Gulf energy power undergoing massive sovereign economic transition.",
        stability: "Unified monarchical authority. Strategic focus on Vision 2030 development goals.",
        economic: "World's largest oil exporter. Diversification into tech and tourism funded by large sovereign wealth funds.",
        threats: ["Regional maritime security", "Oil price volatility", "Regional military theater spillover"],
        isDeepIntel: true
    },
    "IND": {
        summary: "South Asian demographic power and emerging global industrial hub.",
        stability: "World's largest democracy. High institutional complexity with strong federalist structure.",
        economic: "World's fastest-growing large economy. Massive infrastructure expansion and digital service growth.",
        threats: ["Border friction in Himalayas", "Internal religious tensions", "Climate-driven water scarcity"],
        isDeepIntel: true
    },
    "BRA": {
        summary: "Leading South American power with vast environmental and agricultural resources.",
        stability: "Stable democratic framework. Frequent political shifts managed through constitutional processes.",
        economic: "Agricultural superpower. Diversifying industrial base and managing Amazonian environmental governance.",
        threats: ["Political polarization", "Environmental policy friction", "Economic inequality"],
        isDeepIntel: true
    },
    "CAN": {
        summary: "Arctic and North American power with vast natural resources and high stability.",
        stability: "Extremely high institutional stability. Federal parliamentary system with strong rule of law.",
        economic: "Resource-rich G7 economy. High integration with US markets and growing Arctic trade focus.",
        threats: ["Arctic sovereignty disputes", "Real estate market volatility", "Foreign influence operations"],
        isDeepIntel: true
    },
    "AUS": {
        summary: "Indo-Pacific maritime power and key strategic partner in the Southern Hemisphere.",
        stability: "Very high institutional stability with long-standing democratic traditions.",
        economic: "Resource-export powerhouse. Strengthening strategic ties with Quadrilateral partners while managing regional trade.",
        threats: ["Pacific influence competition", "Climate-driven extreme weather", "Critical infrastructure cyber-defenses"],
        isDeepIntel: true
    },
    "PRK": {
        summary: "Isolated East Asian nuclear state with high military mobilization.",
        stability: "Absolute centralized control. State-led mobilization with high internal security.",
        economic: "Command economy under severe international sanctions. Significant focus on military-industrial output.",
        threats: ["Widespread food insecurity", "Succession instability", "Kinetic escalation on Peninsula"],
        isDeepIntel: true
    },
    "TUR": {
        summary: "Strategic Eurasian bridge power with significant regional military influence.",
        stability: "Strong central executive. Diplomatic pivot role between NATO and Eurasian partners.",
        economic: "Large industrial base facing significant currency inflation but maintaining high export volume.",
        threats: ["Regional conflict spillover", "Currency stability risks", "Maritime friction in Mediterranean"],
        isDeepIntel: true
    },
    "EGY": {
        summary: "Arab and North African demographic power and guardian of the Suez Canal.",
        stability: "Centralized security state. Strategic focus on regional stability and mega-project development.",
        economic: "Large regional economy navigating debt restructuring and Suez revenue volatility.",
        threats: ["Regional food security", "Suez Canal maritime disruptions", "Border security in Sinai/Libya"],
        isDeepIntel: true
    },
    "MEX": {
        summary: "Leading North American industrial power and major global manufacturing hub.",
        stability: "Stable democratic system. Dealing with internal security challenges via centralized military-police coordination.",
        economic: "Major manufacturing exporter highly integrated into USMCA supply chains.",
        threats: ["Transnational cartel violence", "Trade policy friction", "Water scarcity in northern regions"],
        isDeepIntel: true
    }
};

export const MOCK_RSS_FEEDS = [
    { id: '1', title: 'Global News Feed', category: 'GEO', content: 'NATO high-command announces joint Baltic exercises. Regional tension increased.' },
    { id: '2', title: 'Tactical Alert', category: 'SEC', content: 'Suspected cyber-reconnaissance detected on Mediterranean sub-sea cables.' },
    { id: '3', title: 'Suez Traffic Update', category: 'ECON', content: 'Vessel transit volume through Suez Canal stable at 45 ships/day.' },
    { id: '4', title: 'Satellite Intel', category: 'SAT', content: 'New construction detected at high-altitude research facility in Himalayas.' },
    { id: '5', title: 'Sovereignty Report', category: 'GOV', content: 'Third-party mediation proposed for Arctic territorial dispute.' }
];

export const DEFAULT_BASE_DATA: BaseCountryData = {
    summary: "Standard sovereign sector with baseline geopolitical parameters.",
    stability: "Clearance Level 3 required for detailed institutional stability analysis.",
    economic: "Sector metrics currently within typical regional fluctuations.",
    threats: ["Regional instability spillover", "Economic volatility", "Resource competition"],
    isDeepIntel: false
};
