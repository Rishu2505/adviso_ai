import { useTheme } from "@/src/hooks/useTheme";
import { fonts } from "@/src/theme";
import { h, m, v } from "@/src/utils/metrics";
import { StyleSheet } from "react-native";

export const useThemedStyles = () => {
  const colors = useTheme();
  return StyleSheet.create({
    card: {
      width: h(170),
      height: v(200),
      backgroundColor: colors.transParent,
      borderRadius: m(20),
      marginBottom: v(10),
      borderWidth: m(1),
      overflow: "hidden",
      borderColor: colors.appWhite,
      marginRight: h(16),
    },
    blurBG: {
      flex: 1,
      paddingHorizontal: h(9),
      paddingBottom: v(11),
      paddingTop: v(14),
      justifyContent: "center",
      alignItems: "center",
    },
    icon: {
      marginBottom: v(10),
    },
    title: {
      marginTop: v(5),
      color: colors.appBlack,
      fontFamily: fonts.SpaceMonoRegular,
      fontSize: m(13),
      marginBottom: v(4),
      textAlign: "center",
    },
    desc: {
      color: colors.appBlack,
      fontSize: m(10),
      fontFamily: fonts.SpaceMonoRegular,
      marginBottom: v(11),
      textAlign: "center",
      opacity: 0.7,
    },
    arrowContainer: {
      backgroundColor: colors.transParentWhite,
      height: v(34),
      width: h(34),
      borderRadius: m(34),
      overflow:'hidden',
      borderWidth:.5,
      borderColor: colors.appPrimary
    },
    iconBG: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });
};
