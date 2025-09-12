import { useTheme } from "@/src/hooks/useTheme";
import { fonts } from "@/src/theme";
import { h, m, v } from "@/src/utils/metrics";
import { StyleSheet } from "react-native";

export const useThemedStyles = () => {
  const colors = useTheme();
  return StyleSheet.create({
    messageContainer: {
      marginVertical: v(0),
      backgroundColor: colors.transParent,
    },
    senderRow: {
      marginTop: v(29),
      marginBottom: v(29),
      backgroundColor: colors.transParent,
      overflow:'hidden',
      borderTopLeftRadius: m(10),
      borderTopRightRadius: m(10),
      borderBottomRightRadius: m(10),
    },
    blurredSenderContainer: {
      paddingHorizontal: h(15),
      paddingVertical: v(15),
      flexDirection: "row",
    },
    promptText: {
      color: colors.appBlack,
      fontFamily: fonts.SpaceMonoRegular,
      fontSize: m(11),
      flexShrink: 1,
      paddingHorizontal: h(12),
    },
    aiContainer: {
      backgroundColor: colors.transParent,
      borderTopLeftRadius: m(10),
      borderTopRightRadius: m(10),
      borderBottomLeftRadius: m(10),
      shadowColor: colors.appBlack,
      shadowOpacity: 0.05,
      shadowOffset: { width: v(0), height: v(5) },
      shadowRadius: m(10),
      elevation: v(5),
      overflow:'hidden'
    },
    blurredAIContainer: {
      flex: 1,
      paddingHorizontal: h(15),
      paddingVertical: v(15),
    },
    margin: {
      marginLeft: h(8),
    },
    aiHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: v(12),
    },
    aiLogo: {
      width: h(30),
      height: v(30),
      marginRight: h(10),
    },
    responseBox: {},
    responseText: {
      color: colors.appBlack,
      fontSize: m(11),
      fontFamily: fonts.SpaceMonoRegular,
    },
    regenerateContainer: {
      alignItems: "center",
      marginTop: v(15),
    },
    regenerateButton: {
      backgroundColor: colors.transParent,
      borderRadius: m(100),
      borderWidth: m(1),
      borderColor: colors.appWhite,
      overflow: "hidden",
    },
    blurContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: v(11),
    },
    regenerateText: {
      color: colors.appBlack,
      fontFamily: fonts.SpaceMonoRegular,
      fontSize: m(12),
      marginLeft: h(10),
    },
  });
};
