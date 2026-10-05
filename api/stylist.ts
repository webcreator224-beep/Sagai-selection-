import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';
import { PRODUCTS } from '../src/data/products';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { prompt, currentProduct } = req.body || {};

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const catalogSummary = PRODUCTS.map(p => 
      `- ${p.title} (${p.category}, Fabric: ${p.fabric}, Price: ₹${p.price}, Colors: ${p.colors.map(c => c.name).join(', ')})`
    ).join('\n');

    const systemInstruction = `You are Sagai Selection's Senior Master Stylist & Royal Concierge.
You provide warm, expert, luxurious advice on Indian ethnic wear, occasion styling (Sangeet, Reception, Haldi, Trousseau), color harmony, fabric care, and bespoke fitting (Chanderi silk, Chikankari, Zardozi, Velvet).

Available Catalog:
${catalogSummary}

Guidelines:
1. Respond concisely with royal elegance, warmth, and high-fashion expertise.
2. Recommend 1-2 specific garments from the catalog if relevant.
3. Keep response under 150 words.`;

    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      const aiClient = new GoogleGenAI({ apiKey });
      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `${systemInstruction}\n\nUser Question: ${prompt}${currentProduct ? `\nViewing Garment: ${currentProduct}` : ''}` }] }
        ]
      });

      const replyText = response.text || "Welcome to Sagai Selection. Our master tailors recommend pure Chanderi silk with subtle gold zardozi for evening celebrations.";
      return res.status(200).json({ reply: replyText });
    } else {
      let fallbackReply = "As Sagai's Master Stylist, I recommend pairing warm Gulabi Mauve or Kesar Ochre hues for daytime festivities like Haldi & Mehendi. For evening receptions, our Neelam Royal Velvet or Noor Tissue Silk ensembles lend incomparable regal drama.";
      
      const lower = String(prompt).toLowerCase();
      if (lower.includes('haldi') || lower.includes('yellow')) {
        fallbackReply = "For Haldi ceremonies, our 'Kesar Ochre Festive Sharara Set' crafted in crinkled viscose with intricate gota patti border work is the quintessential vibrant, joyful choice.";
      } else if (lower.includes('sangeet') || lower.includes('night') || lower.includes('reception')) {
        fallbackReply = "For evening Sangeets & Receptions, 'Neelam Royal Velvet Embroidered Kurta Set' or 'Noor Tissue Silk' offers luminous metallic shimmer that catches palace candlelight beautifully.";
      } else if (lower.includes('size') || lower.includes('fit') || lower.includes('alteration')) {
        fallbackReply = "Our Royal Silhouette Size Chart runs true to traditional relaxed Indian tailoring. We offer complimentary bespoke length & bust alterations (-2\" to +2\") prior to dispatch!";
      }

      return res.status(200).json({ reply: fallbackReply });
    }
  } catch (err: any) {
    console.error('Stylist API Error:', err);
    return res.status(200).json({ 
      reply: "For celebratory gatherings, our master tailors recommend pure Chanderi silk ensembles paired with hand-embroidered organza dupattas for timeless elegance." 
    });
  }
}
