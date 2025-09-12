import { useTheme } from "@/src/hooks/useTheme";
import { fonts } from "@/src/theme";
import { h, m, v } from "@/src/utils/metrics";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export const useThemedStyles = () => {
  const colors = useTheme();
  const { bottom } = useSafeAreaInsets();
  return StyleSheet.create({
    tabBar: {
      flexDirection: "row",
      backgroundColor: colors.transParentBlack,
      left: 0,
      right: 0,
      bottom: bottom,
      borderRadius: m(100),
      marginHorizontal: h(30),
      padding: v(8),
      position: "absolute",
      alignItems: "center",
      overflow: "hidden",
    },
    tabContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    tabIconContainer: {
      flex: 1,
      height: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: m(100),
      paddingHorizontal: h(5),
      paddingVertical: v(10),
    },
    activePill: {
      backgroundColor: colors.appWhite,
    },
    label: {
      marginLeft: h(8),
      fontSize: m(15),
      fontFamily: fonts.SpaceMonoRegular,
      color: colors.appBlack,
    },
  });
};
