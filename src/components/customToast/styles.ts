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
      paddingHorizontal: h(20),
      paddingVertical: v(12),
      borderRadius: m(9999),
      marginBottom: v(80),
      borderColor: colors.appWhite,
      borderWidth: m(1.4),
      width: null,
      overflow:'hidden'
    },
    icon: {
      marginRight: h(10),
    },
    textContainer: {},
    title: {
      fontSize: m(14),
      fontFamily: fonts.SpaceMonoRegular,
      color: colors.appBlack,
      marginLeft: h(8)
    },
    infoText: {
      fontSize: m(12),
      fontFamily: fonts.SpaceMonoRegular,
      color: colors.appBlack,
      marginTop: v(2),
      opacity: 0.7,
    },
    success: {
      borderColor: colors.appWhite,
    },
    error: {
      borderColor: colors.appRed,
    },
    info: {
      borderColor: colors.appPrimary,
    },
  });
};
