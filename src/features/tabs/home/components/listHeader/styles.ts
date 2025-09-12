import { useTheme } from "@/src/hooks/useTheme";
import { fonts } from "@/src/theme";
import { h, m, v } from "@/src/utils/metrics";
import { StyleSheet } from "react-native";

export const useThemedStyles = () => {
  const colors = useTheme();
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: v(12),
      paddingHorizontal: h(16),
    },
    title: {
      fontSize: m(15),
      fontFamily: fonts.SpaceMonoRegular,
      color: colors.text,
    },
    icon: {
      color: colors.appBlack,
    },
  });
};
