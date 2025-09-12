import { useTheme } from "@/src/hooks/useTheme";
import { fonts } from "@/src/theme";
import { h, m, v } from "@/src/utils/metrics";
import { StyleSheet } from "react-native";

export const useThemedStyles = () => {
  const colors = useTheme();
  return StyleSheet.create({
    card: {
      width: h(80),
      height: v(80),
      borderRadius: m(16),
      overflow: "hidden",
      marginRight: h(12),
      backgroundColor: colors.transParent,
      borderColor: colors.appWhite,
      borderWidth: v(1),
    },
    image: {
      width: "100%",
      height: "100%",
      backgroundColor: colors.transParentWhite
    },
    overlay: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      paddingVertical: v(6),
      paddingHorizontal: h(8),
    },
    title: {
      color: colors.appWhite,
      fontSize: m(10),
      fontFamily: fonts.SpaceMonoRegular,
    },
  });
};
