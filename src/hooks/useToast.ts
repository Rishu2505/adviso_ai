// src/hooks/useToast.ts
import Toast from "react-native-toast-message";

type ToastType = "success" | "error" | "info";

export const useToast = () => {
  const showToast = (
    type: ToastType,
    title: string,
    message?: string,
    position: "top" | "bottom" = "bottom"
  ) => {
    Toast.show({
      type,
      text1: title,
      text2: message,
      position,
      visibilityTime: 2000,
    });
  };

  return { showToast };
};
