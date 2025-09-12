import { useTheme } from "@/src/hooks/useTheme";
import { fonts } from "@/src/theme";
import { h, m, v } from "@/src/utils/metrics";
import { Dimensions, StyleSheet } from "react-native";
const { height } = Dimensions.get("window");

export const useThemedStyles = () => {
  const colors = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    blurContainer: {
      height: v(0),
    },
    innerlistContainer: {
      flex: 1,
      marginTop: v(16)
    },
    exploreListContainer: {
      paddingHorizontal: h(16),
    },
    trendingListContainer: {
      paddingBottom: h(100),
      
    },
    list: {
      flex: 1,
    },
    emptyUI: {
      flex: 1,
      height: height / 2,
      alignItems: "center",
      justifyContent: "center",
    },
    sorryAnimation: {
      height: v(100),
      width: h(100),
      borderRadius: m(24)
    },
    emptyText: {
      fontSize: m(13),
      fontFamily: fonts.SpaceMonoRegular,
      color: colors.appBlack,
      textAlign: "center",
      marginTop: v(10)
    },
  });
};
