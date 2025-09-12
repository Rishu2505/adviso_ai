import { useTheme } from "@/src/hooks/useTheme";
import { fonts } from "@/src/theme";
import { h, m, v } from "@/src/utils/metrics";
import { StyleSheet } from "react-native";

export const useThemedStyles = () => {
  const colors = useTheme();
  return StyleSheet.create({
    chip: {
      backgroundColor: colors.background,
      paddingHorizontal: h(20),
      paddingVertical: v(6),
      borderRadius: m(100),
      marginRight: h(12),
      justifyContent: "center",
      borderWidth: m(2),
      borderColor: colors.appSecondary,
    },
    contentRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    active: {backgroundColor: colors.appSecondary},
    label: {
      color: colors.appSecondary,
      fontSize: m(14),
      fontFamily: fonts.PoppinsSemiBold,
    },
    activeLabel: {
      color: colors.background,
      fontSize: m(14),
      fontFamily: fonts.PoppinsSemiBold,
    },
  });
};
