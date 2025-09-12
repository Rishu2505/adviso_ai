import { useTheme } from "@/src/hooks/useTheme";
import { fonts } from "@/src/theme";
import { h, m, v } from "@/src/utils/metrics";
import { StyleSheet } from "react-native";

export const useThemedStyles = () => {
  const colors = useTheme();
  return StyleSheet.create({
    chipContainer: {
      paddingHorizontal: h(20),
      paddingVertical: v(6),
      borderRadius: m(100),
      marginRight: h(12),
      borderWidth: m(2),
      borderColor: colors.appWhite,
      overflow: "hidden",
    },
    chip: {
      justifyContent: "center",
    },
    chipInactive: {
      borderRadius: m(100),
      marginRight: h(12),
      borderWidth: m(2),
      borderColor: colors.appWhite,
      overflow: "hidden",
    },
    blurredView: {
      paddingHorizontal: h(20),
      paddingVertical: v(6),
    },
    contentRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    active: { backgroundColor: colors.transParent },
    label: {
      color: colors.appBlack,
      fontSize: m(14),
      fontFamily: fonts.SpaceMonoRegular,
    },
  });
};
