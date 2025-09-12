import PRODUCT_CATALOG from "@/src/assets/jsons/productCatalog.json";
import { PromptItem } from "../types/productPost";

export const predefinedPrompts: PromptItem[] = PRODUCT_CATALOG.flatMap((p, index) => {
  const basePrompts =
    p.category === "Healthtech and Wellness"
      ? [
          `Generate tips on how to use ${p.product_name} for better health.`,
          `Write a product review for ${p.product_name}.`,
          `Explain how ${p.product_name} compares with traditional alternatives.`,
        ]
      : p.category === "Entertainment"
      ? [
          `Write a fun social media post promoting ${p.product_name}.`,
          `Generate a viral TikTok idea using ${p.product_name}.`,
          `Explain why ${p.product_name} is perfect for families.`,
        ]
      : [
          `Tell me more about ${p.product_name}.`,
          `Write a short ad copy for ${p.product_name}.`,
          `Explain benefits of using ${p.product_name}.`,
        ];

  return basePrompts.map((prompt, i) => ({
    id: `prompt-${index}-${i}`,
    category: p.category,
    product_name: p.product_name,
    prompt,
  }));
});

