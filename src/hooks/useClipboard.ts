import * as Clipboard from "expo-clipboard";
import { useToast } from "./useToast";

export const useClipboard = () => {
  const { showToast } = useToast();

  const copyToClipboard = async (text: string) => {
    try {
      await Clipboard.setStringAsync(text);
      showToast("success", "Copied");
    } catch (error) {
      showToast("error", "Copy failed");
      console.warn("Copy failed", error);
    }
  };

  return { copyToClipboard };
};
