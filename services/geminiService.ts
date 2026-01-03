
import { GoogleGenAI } from "@google/genai";
import { PERSONAL_INFO, PROJECTS, EDUCATION, SKILLS, CERTIFICATIONS } from "../data";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const RESUME_CONTEXT = `
You are Eddie's personal AI assistant. Here is his resume data:
Name: ${PERSONAL_INFO.name}
Email: ${PERSONAL_INFO.email}
Phone: ${PERSONAL_INFO.phone}
Location: ${PERSONAL_INFO.location}
Bio: ${PERSONAL_INFO.bio}

Projects:
${PROJECTS.map(p => `- ${p.title}: ${p.description} (${p.link})`).join('\n')}

Education:
${EDUCATION.map(e => `- ${e.degree} at ${e.institution} (${e.period})`).join('\n')}

Skills:
${SKILLS.map(s => `- ${s.category}: ${s.items.join(', ')}`).join('\n')}

Certifications:
${CERTIFICATIONS.map(c => `- ${c.name} by ${c.issuer}`).join('\n')}

Instructions:
Answer questions about Eddie professionally. Keep answers concise and friendly.
`;

export const askEddieAI = async (question: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: question,
      config: {
        systemInstruction: RESUME_CONTEXT,
      },
    });
    return response.text || "I'm not sure about that, but Eddie is a great candidate!";
  } catch (error) {
    console.error("AI Error:", error);
    return "I am having trouble connecting to my brain right now. Please try again later!";
  }
};
