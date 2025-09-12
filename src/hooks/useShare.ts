import { Share } from "react-native";

export const useShare = () => {
  const share = async (title: string, message: string, url?: string) => {
    try {
      const result = await Share.share({
        title,
        message: message,
        url,
      });

      return result;
    } catch (error) {
      console.warn("Share failed:", error);
    }
  };

  return { share };
};
