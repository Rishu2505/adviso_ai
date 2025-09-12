export interface ExploreItemInfo {
  id: string;
  title: string;
  image: string;
}

export interface User {
  name: string;
  avatar: string;
}

export interface AI_ProductInfo {
  id: string;
  user: User;
  posted_in: string;
  time: string;
  text: string;
  image: string;
}

export interface Product {
  brand: string;
  product_name: string;
  price: number;
  category: string;
  description: string;
  //image: string;
}

export interface Recommendation {
  product: Product;
  reason: string;
}

export interface PromptItem {
  id: string;
  category: string;
  product_name: string;
  prompt: string;
}
