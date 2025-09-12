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
      paddingHorizontal: h(35),
      marginBottom: v(33),
    },
    title: {
      fontSize: m(22),
      fontFamily: fonts.SpaceMonoRegular,
      color: colors.appBlack,
    },
  });
};
