
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

/**
 * Uses Gemini 2.5 Flash Image to edit an image based on user prompt.
 */
export const editImageWithAI = async (base64Image: string, prompt: string, mimeType: string = 'image/png'): Promise<string | null> => {
  try {
    const ai = getAIClient();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1],
              mimeType: mimeType,
            },
          },
          {
            text: `You are a professional salon style expert. Edit this image based on the request: "${prompt}". Provide only the edited image in the response.`,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("AI Image Edit Error:", error);
    return null;
  }
};

/**
 * Chat-based service recommendations using Gemini 3.
 */
export const getStyleAdvice = async (userPrompt: string): Promise<string> => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: "You are an expert beauty consultant for 'Glow & Go' Saloon. Provide concise, friendly, and professional advice on hair, skin, and nails. If a user asks for saloon recommendations, refer to Lumina, Gentry, or Velvet.",
      }
    });
    return response.text || "I'm sorry, I couldn't generate advice right now.";
  } catch (error) {
    console.error("AI Chat Error:", error);
    return "Something went wrong with our AI consultant.";
  }
};
