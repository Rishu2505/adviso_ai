import { useTheme } from "@/src/hooks/useTheme";
import { fonts } from "@/src/theme";
import { h, m, v } from "@/src/utils/metrics";
import { StyleSheet } from "react-native";

export const useThemedStyles = () => {
  const colors = useTheme();
  return StyleSheet.create({
    wrapper: {
      alignItems: "center",
      paddingHorizontal: h(16),
    },
    container: {
      height: v(45),
      borderRadius: m(100),
      borderColor: colors.appWhite,
      borderWidth: v(1.2),
      overflow: "hidden",
      alignItems: "center",
     
    },
    blur: {
      flex: 1,
      width: "100%",
      flexDirection: "row",
      paddingLeft: h(12),
      paddingRight: h(14),
      alignItems: "center",
    },
    input: {
      flex: 1,
      fontSize: m(16),
      color: colors.appBlack,
      fontFamily: fonts.SpaceMonoRegular,
      paddingLeft: h(10),
    },
    sendButton: {
      marginLeft: h(20),
    },
  });
};
