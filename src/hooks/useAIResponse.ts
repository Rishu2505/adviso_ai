import axios from "axios";
import Constants from "expo-constants";
import { useState } from "react";

const OPENAI_API_KEY = Constants.expoConfig?.extra?.OPENAI_API_KEY;

export const useAIResponse = () => {
  const [api_loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Retry helper function (handles 429)
  const retry = async (
    fn: () => Promise<any>,
    retries = 3,
    delay = 1000
  ): Promise<any> => {
    let lastError;
    for (let i = 0; i < retries; i++) {
      try {
        return await fn();
      } catch (err: any) {
        lastError = err;
        const status = err.response?.status;
        console.warn(`Attempt ${i + 1} failed: ${status}`);
        if (status !== 429) throw err;
        await new Promise((res) => setTimeout(res, delay));
      }
    }
    throw lastError;
  };

  const getResponse = async (prompt: string): Promise<string | null> => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await retry(() =>
        axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 50,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
          }
        )
      );

      const content = res.data?.choices?.[0]?.message?.content ?? "No response";
      setResponse(content);
      return content;
    } catch (err: any) {
      console.log("OpenAI API Error:", err?.response?.data || err.message);
      setError("Hang on — we’re resolving a temporary issue.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { getResponse, api_loading, response, error };
};
