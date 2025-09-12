import { useTheme } from "@/src/hooks/useTheme";
import { h, m, v } from "@/src/utils/metrics";
import { StyleSheet } from "react-native";

export const useThemedStyles = () => {
  const colors = useTheme();
  return StyleSheet.create({
    typingDots: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: v(6),
        paddingVertical: v(0),
      },
      dot: {
        width: v(8),
        height: v(8),
        borderRadius: m(8),
        backgroundColor: colors.appBlack,
      },
      aiLogo: {
        width: h(35),
        height: v(35),
        marginRight: h(5),
      },
  });
};
