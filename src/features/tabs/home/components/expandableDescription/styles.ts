import { useTheme } from "@/src/hooks/useTheme";
import { fonts } from "@/src/theme";
import { h, m, v } from "@/src/utils/metrics";
import { StyleSheet } from "react-native";

export const useThemedStyles = () => {
  const colors = useTheme();
  return StyleSheet.create({
    storeDescContainer: {},
    storeDesc: {
      fontFamily: fonts.SpaceMonoRegular,
      fontSize: m(12),
      color: colors.appBlack,
      marginBottom: v(8),
    },
    bold: {
      fontFamily: fonts.SpaceMonoRegular,
    },
    more: {
      fontFamily: fonts.PoppinsSemiBold,
      color: colors.appBlack,
      marginBottom: h(-5),
      fontSize: m(13),
      opacity: 0.5,
    },
  });
};
