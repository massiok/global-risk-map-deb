
import { GoogleGenAI, Type } from "@google/genai";
import { IntelligenceResponse } from "../types";

const getMockBriefing = (countryName: string): IntelligenceResponse => {
  return {
    summary: `UNLINKED SITREP: Analyzing sector ${countryName} via local heuristics (Standalone Mode).`,
    politicalStability: "LOCAL_BUFFER: Internal data indicates stable governing hierarchy with moderate bureaucracy.",
    conflictPotential: "LOCAL_BUFFER: Low probability of kinetic escalation in the immediate 72-hour window.",
    economicRisk: "LOCAL_BUFFER: Sovereign credit metrics remain within baseline parameters for this sector.",
    keyThreats: [
      "Cyber-espionage escalation in banking sector",
      "Localized infrastructure degradation",
      "Supply chain bottlenecking in transport nodes"
    ]
  };
};

export const getCountryBriefing = async (countryName: string, apiKey?: string, isStandalone?: boolean): Promise<IntelligenceResponse> => {
  if (isStandalone || !apiKey) {
    // Artificial delay to simulate processing
    await new Promise(r => setTimeout(r, 800));
    return getMockBriefing(countryName);
  }

  // Always use gemini-1.5-pro for complex geopolitical and analytical tasks.
  // Instantiate GoogleGenAI right before the call to use the most up-to-date API key.
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
    return JSON.parse(text.trim()) as IntelligenceResponse;
  } catch (error) {
    console.error("Geopolitical parsing failed:", error);
    throw new Error("SEC_PARSE_ERROR: Data packet corrupted.");
  }
};
