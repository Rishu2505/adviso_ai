import { useTheme } from "@/src/hooks/useTheme";
import { fonts } from "@/src/theme";
import { h, m, v } from "@/src/utils/metrics";
import { StyleSheet } from "react-native";

export const useThemedStyles = () => {
  const colors = useTheme();
  return StyleSheet.create({
    cardWrapper: {
      marginBottom: v(10),
    },
    card: {
      marginHorizontal: h(16),
      borderRadius: m(24),
      overflow: "hidden",
      borderColor: colors.appWhite,
      borderWidth: v(1),
    },
    blurContainer: {
      flex: 1,
      paddingHorizontal: h(12),
      paddingTop: v(12),
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: v(8),
    },
    avatar: {
      width: h(40),
      height: h(40),
      borderRadius: m(20),
      backgroundColor: colors.transParentWhite,
    },
    fullFlex: { flex: 1, paddingLeft: h(0) },
    userName: {
      fontFamily: fonts.PoppinsSemiBold,
      fontSize: m(14),
      color: colors.appBlack,
      fontWeight: "700",
    },
    meta: {
      fontFamily: fonts.SpaceMonoRegular,
      fontSize: m(12),
      color: colors.appBlack,
      opacity: 0.6,
    },
    text: {
      fontFamily: fonts.PoppinsRegular,
      fontSize: m(12),
      color: colors.appBlack,
      marginBottom: v(8),
    },
    image: {
      width: "100%",
      height: v(200),
      borderTopLeftRadius: m(12),
      borderTopRightRadius: m(12),
      backgroundColor: colors.transParentWhite,
    },
  });
};
