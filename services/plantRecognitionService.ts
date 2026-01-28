
import { IdentificationResult, Language } from '../types';
import { GoogleGenAI, Type } from "@google/genai";
import { PlantDatabaseService } from './plantDatabaseService';

// Helper to convert base64 data URL to raw base64 string
const cleanBase64 = (dataUrl: string) => {
  return dataUrl.split(',')[1];
};

export const PlantRecognitionService = {
  identify: async (imageUri: string, lang: Language = 'de'): Promise<IdentificationResult> => {
    // 1. Check if we have an API Key. If so, use Gemini
    if (process.env.API_KEY) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        // Dynamic prompt based on language
        const promptLang = lang === 'de' ? 'German' : lang === 'es' ? 'Spanish' : 'English';
        const promptText = `Identify this plant. Provide the common ${promptLang} name, the botanical name, a description (2 sentences) in ${promptLang}, an estimated confidence (0-1), and care info (water interval in days, light in ${promptLang}, temp). Response must be JSON.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-preview',
          contents: {
            parts: [
              {
                inlineData: {
                  mimeType: 'image/jpeg',
                  data: cleanBase64(imageUri),
                },
              },
              {
                text: promptText
              }
            ],
          },
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                botanicalName: { type: Type.STRING },
                description: { type: Type.STRING },
                confidence: { type: Type.NUMBER },
                careInfo: {
                  type: Type.OBJECT,
                  properties: {
                    waterIntervalDays: { type: Type.NUMBER },
                    light: { type: Type.STRING },
                    temp: { type: Type.STRING },
                  },
                  required: ["waterIntervalDays", "light", "temp"]
                }
              },
              required: ["name", "botanicalName", "confidence", "careInfo", "description"]
            }
          }
        });

        if (response.text) {
          return JSON.parse(response.text) as IdentificationResult;
        }
      } catch (error) {
        console.error("Gemini analysis failed, falling back to mock.", error);
      }
    }

    // 2. Mock Process (Fallback)
    return new Promise((resolve) => {
      setTimeout(() => {
        // Use the centralized database service for consistent mock results
        const randomResult = PlantDatabaseService.getRandomPlant(lang);
        
        // Create a clean IdentificationResult without categories/imageUri if we want to strictly adhere to that type, 
        // though Typescript allows extra props.
        // We simulate that the recognition might not be 100% like the db
        resolve({
            ...randomResult,
            confidence: 0.85 + Math.random() * 0.14
        });
      }, 2500);
    });
  }
};
