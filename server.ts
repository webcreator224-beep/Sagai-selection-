import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { PRODUCTS } from './src/data/products.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini Client if key exists
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  aiClient = new GoogleGenAI({ apiKey });
}

// AI Stylist Endpoint
app.post('/api/stylist', async (req, res) => {
  try {
    const { prompt, currentProduct } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const catalogSummary = PRODUCTS.map(p => 
      `- ${p.title} (${p.category}, Fabric: ${p.fabric}, Price: ₹${p.price}, Colors: ${p.colors.map(c => c.name).join(', ')})`
    ).join('\n');

    const systemInstruction = `You are Sagai Selection's Senior Master Stylist & Royal Concierge.
You provide warm, expert, luxurious advice on Indian ethnic wear, occasion styling (Sangeet, Reception, Haldi, Workwear, Festive gatherings), color harmony, fabric care, and bespoke fitting (Chanderi silk, Chikankari, Zardozi, Velvet).

Available Catalog:
${catalogSummary}

Guidelines:
1. Respond concisely with royal elegance, warmth, and high-fashion expertise.
2. Recommend 1-2 specific garments from the catalog if relevant.
3. Keep response under 150 words.`;

    if (aiClient) {
      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `${systemInstruction}\n\nUser Question: ${prompt}${currentProduct ? `\nViewing Garment: ${currentProduct}` : ''}` }] }
        ]
      });

      const replyText = response.text || "Welcome to Sagai Selection. Our master tailors recommend pure Chanderi silk with subtle gold zardozi for evening celebrations.";
      return res.json({ reply: replyText });
    } else {
      // Rule-based luxury concierge fallback when GEMINI_API_KEY is placeholder
      let fallbackReply = "As Sagai's Master Stylist, I recommend pairing warm Gulabi Mauve or Kesar Ochre hues for daytime festivities like Haldi & Mehendi. For evening receptions, our Neelam Royal Velvet or Noor Tissue Silk ensembles lend incomparable regal drama.";
      
      const lower = prompt.toLowerCase();
      if (lower.includes('haldi') || lower.includes('yellow')) {
        fallbackReply = "For Haldi ceremonies, our 'Kesar Ochre Festive Sharara Set' crafted in crinkled viscose with intricate gota patti border work is the quintessential vibrant, joyful choice.";
      } else if (lower.includes('sangeet') || lower.includes('night') || lower.includes('reception')) {
        fallbackReply = "For evening Sangeets & Receptions, 'Neelam Royal Velvet Embroidered Kurta Set' or 'Noor Tissue Silk' offers luminous metallic shimmer that catches palace candlelight beautifully.";
      } else if (lower.includes('size') || lower.includes('fit') || lower.includes('alteration')) {
        fallbackReply = "Our Royal Silhouette Size Chart runs true to traditional relaxed Indian tailoring. We offer complimentary bespoke length & bust alterations (-2\" to +2\") prior to dispatch!";
      }

      return res.json({ reply: fallbackReply });
    }
  } catch (err: any) {
    console.error('Stylist API Error:', err);
    return res.status(500).json({ error: 'Stylist concierge unavailable temporarily.' });
  }
});

// Mounting Vite in development or static serving in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = await vite.transformIndexHtml(url, `
          <!doctype html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Sagai Selection - Heritage Couture</title>
              <meta name="description" content="Luxury Indian Ethnic Wear, Handcrafted Chanderi Silks, Chikankari Anarkalis & Bespoke Trousseau Ensembles." />
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet" />
              <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
            </head>
            <body class="bg-[#faf9fa] text-[#1b1c1d] antialiased">
              <div id="root"></div>
              <script type="module" src="/src/main.tsx"></script>
            </body>
          </html>
        `);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
