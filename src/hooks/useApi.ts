import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const callEndpoint = async <T = any>(config: AxiosRequestConfig): Promise<T | null> => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await axios(config);
      setData(res.data);
      return res.data as T;
    } catch (err: any) {
      console.log("API Error:", err?.response?.data || err.message);
      setError(err.message || "Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { callEndpoint, loading, data, error };
};
