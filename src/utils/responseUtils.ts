import productCatalog from "@/src/assets/jsons/productCatalog.json";
import { Product } from "../types/productPost";

export const getRandomResponseByPrompt = (
  category: string
): string | null => {
  const entry = (productCatalog as Product[]).filter(
    (item) => item.category === category
  );

  if (entry.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * entry.length);
  return entry[randomIndex].description;
};
