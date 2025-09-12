import { useCallback, useState } from "react";
import { fetchRecommendations } from "../services";
import { Recommendation } from "../types/productPost";

export function useRecommendations() {
  const [data, setData] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRecommendations = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);

    try {
      const recs = await fetchRecommendations(query);
      //console.log("--recs--", recs);
      setData(recs);
    } catch (err: any) {
      console.error("Recommendation error:", err);
      setError(err.message || "Failed to fetch recommendations");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, []);

  return { data, loading, error, getRecommendations };
}
