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
    welcomeAnimationContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    welcomeContentContainer: {
      marginTop: v(50),
      marginBottom: v(10),
    },
    welcomeText: {
      fontSize: m(20),
      fontFamily: fonts.PoppinsRegular,
      color: colors.appBlack,
      textAlign: "center",
      marginTop: v(-25),
    },
    welcomeTextBold: {
      fontSize: m(20),
      color: colors.appBlack,
      textAlign: "center",
      marginLeft: h(5),
      fontFamily: fonts.PoppinsSemiBold,
      alignSelf: "flex-end",
      marginBottom: v(-2),
    },
    blurContainer: {
      height: v(0),
    },
    mainlistContainer: {
      flex: 1,
      marginTop: v(16),
    },
    innerlistContainer: {
      flex: 1,
      marginTop: v(0),
    },
    recommendationListContainer: {
      paddingBottom: h(0),
    },
    list: {
      flex: 1,
    },
    lottieContainer: {
      alignItems: "center",
      marginTop: v(0),
      position: "absolute",
      left: 0,
      right: 0,
      top: v(300),
      bottom: 0,
    },
    lottieWelcome: { width: h(140), height: v(50) },
    lottie: { width: h(120), height: v(120) },
    lottieText: {
      fontSize: m(14),
      fontFamily: fonts.SpaceMonoRegular,
      color: colors.appBlack,
      textAlign: "center",
      marginRight: m(5),
    },
    predefinedPromptsContentContainerUI: {
      paddingBottom: v(100),
    },
    predefinedPromptsAnimeContainerUI: {
      height: "100%",
      width: "100%",
      marginTop: v(-10),
      position: "absolute",
    },
    predefinedPromptsBlurContainerUI: {
      height: "100%",
      width: "100%",
    },
    categoryChipsListContentContainer: {
      paddingLeft: h(16),
    },
    promptsCardListContentContainer: {
      paddingLeft: h(16),
    },
    emptyUI: {
      flex: 1,
      height: height / 1.7,
      alignItems: "center",
      justifyContent: "center",
    },
    sorryAnimation: {
      height: v(100),
      width: h(100),
      borderRadius: m(24),
    },
    emptyText: {
      fontSize: m(13),
      fontFamily: fonts.SpaceMonoRegular,
      color: colors.appBlack,
      textAlign: "center",
      marginTop: v(10),
    },
  });
};
