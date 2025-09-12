import PRODUCT_CATALOG from "@/src/assets/jsons/productCatalog.json";
import axios from "axios";
import Constants from "expo-constants";
import { Recommendation } from "../types/productPost";

const OPENAI_API_KEY = Constants.expoConfig?.extra?.OPENAI_API_KEY;

export async function fetchRecommendations(
  query: string
): Promise<Recommendation[]> {
  if (!OPENAI_API_KEY) {
    throw new Error("Missing OpenAI API Key. Did you set OPENAI_API_KEY in .env?");
  }

  // 🚫 If query is empty or just spaces, return nothing
  if (!query || query.trim().length === 0) {
    return [];
  }

  // 🔍 Try to narrow catalog locally
  let relevantCatalog = PRODUCT_CATALOG.filter((p) => {
    const haystack = `${p.brand} ${p.product_name} ${p.category} ${p.description}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  if (relevantCatalog.length === 0) {
    relevantCatalog = PRODUCT_CATALOG.slice(0, 20);
  } else {
    relevantCatalog = relevantCatalog.slice(0, 20);
  }

  const prompt = `
  You are an AI Product Advisor.
  User asked: "${query}".
  From the PRODUCT_CATALOG, pick the **top 3 most relevant products** (or fewer if fewer exist).
  Respond ONLY in valid JSON. No text outside JSON.
  JSON format:
  [
    { 
      "product": { 
        "brand": "...", 
        "product_name": "...", 
        "price": 0, 
        "category": "...", 
        "description": "..." 
      }, 
      "reason": "..." 
    }
  ]

  PRODUCT_CATALOG: ${JSON.stringify(relevantCatalog)}
  `;

  try {
    const { data: chatData } = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an AI Product Advisor. Always respond with STRICT JSON only. No explanations. No markdown.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    let raw = chatData.choices?.[0]?.message?.content?.trim();
    if (!raw) throw new Error("Empty response from AI");

    // 🛠 Ensure JSON-only (strip markdown or text)
    const match = raw.match(/\[[\s\S]*\]/);
    if (match) raw = match[0];

    const parsed: Recommendation[] = JSON.parse(raw);

    return parsed.length > 0 ? parsed : [];
  } catch (err: any) {
    console.error("Recommendation fetch error:", err.response?.data || err.message);
    throw new Error(err.message || "Failed to fetch recommendations");
  }
}
