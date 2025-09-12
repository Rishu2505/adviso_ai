import { useTheme } from "@/src/hooks/useTheme";
import { h, v } from "@/src/utils/metrics";
import { Platform, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useThemedStyles = () => {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  return StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: colors.transParent,
      marginBottom: Platform.OS === 'ios' ? insets.bottom : 0
    },
    chatList: {
      paddingBottom: v(80),
      paddingHorizontal: h(18),
    },
  });
};
