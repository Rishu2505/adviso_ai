import PRODUCT_CATALOG from "@/src/assets/jsons/productCatalog.json";

export const getCategories = () => {
  const categories = Array.from(
    new Set(PRODUCT_CATALOG.map((p) => p.category))
  );
  return ["All", ...categories];
};
