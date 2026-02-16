import { GoogleGenAI, Type } from "@google/genai";
import { IntelligenceResponse, NewsItem } from "../types";
import { BASE_NATION_DATA, DEFAULT_BASE_DATA, MOCK_RSS_FEEDS } from "../baseData";

const getMockBriefing = (countryName: string): IntelligenceResponse => {
  const data = BASE_NATION_DATA[countryName] || Object.values(BASE_NATION_DATA).find(d => d.summary.includes(countryName)) || DEFAULT_BASE_DATA;

  return {
    summary: data.summary,
    politicalStability: data.stability,
    conflictPotential: data.isDeepIntel ? "SYSTEM_CACHE: Deep-Intel handoff available. Analysis stability high." : "NEURAL_HANDSHAKE_REQUIRED: Advanced kinetic assessment encrypted.",
    economicRisk: data.economic,
    keyThreats: data.threats,
    isAdvanced: data.isDeepIntel || false,
    source: data.isDeepIntel ? 'CACHED' : 'BASE',
    timestamp: new Date().toISOString()
  };
};

export const getGlobalNews = async (): Promise<NewsItem[]> => {
  await new Promise(r => setTimeout(r, 400));
  return MOCK_RSS_FEEDS.map(n => ({ ...n, timestamp: new Date().toLocaleTimeString() }));
};

export const getCountryBriefing = async (countryName: string, apiKey?: string, isStandalone?: boolean): Promise<IntelligenceResponse> => {
  if (isStandalone || !apiKey) {
    await new Promise(r => setTimeout(r, 800));
    return getMockBriefing(countryName);
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `Provide a senior-level geopolitical intelligence SITREP for ${countryName}. 
  Examine internal and external risk vectors, including governance stability, civil unrest, and territorial disputes.
  Structure the response as a professional intelligence packet.`;

  const response = await ai.models.generateContent({
    model: 'gemini-1.5-pro',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING, description: "A high-level one-sentence situational overview." },
          politicalStability: { type: Type.STRING, description: "Detailed analysis of governing regime and stability." },
          conflictPotential: { type: Type.STRING, description: "Assessment of internal unrest or external military conflict." },
          economicRisk: { type: Type.STRING, description: "Economic indicators affecting national security." },
          keyThreats: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of 3-5 specific identified threat vectors."
          },
        },
        required: ["summary", "politicalStability", "conflictPotential", "economicRisk", "keyThreats"],
        propertyOrdering: ["summary", "politicalStability", "conflictPotential", "economicRisk", "keyThreats"]
      },
      systemInstruction: "You are a Chief Geopolitical Intelligence Officer. Your reports are concise, analytical, and intended for high-level military and stability planning. Avoid conversational fillers."
    }
  });

  try {
    const text = response.text || "{}";
    const data = JSON.parse(text.trim()) as IntelligenceResponse;
    return {
      ...data,
      isAdvanced: true,
      source: 'LIVE',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error("Geopolitical parsing failed:", error);
    throw new Error("SEC_PARSE_ERROR: Data packet corrupted.");
  }
};
