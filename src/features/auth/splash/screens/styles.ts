import { useTheme } from "@/src/hooks/useTheme";
import { fonts } from "@/src/theme";
import { h, m, v } from "@/src/utils/metrics";
import { StyleSheet } from "react-native";

export const useThemedStyles = () => {
  const colors = useTheme();
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
    },
    mainView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    splashView: {
      height: v(100),
      width: h(100),
    },
    splash: {
      height: "100%",
      width: "100%",
    },
    appName: {
      fontSize: m(15),
      fontFamily: fonts.SpaceMonoRegular,
      color: colors.appBlack,
      textAlign: "center",
      marginTop: v(0),
    },
  });
};
