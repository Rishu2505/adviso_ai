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
      paddingHorizontal: h(16),
      paddingVertical: v(12),
    },
    title: {
      fontSize: m(22),
      fontFamily: fonts.SpaceMonoRegular,
      color: colors.appBlack,
      flex: 1,
      textAlign: "center",
    },
    leftIconContainer: {
      width: h(50),
      height: h(50),
      borderRadius: m(50),
      overflow: "hidden",
      justifyContent:'center',
      alignItems:'center'
    },
    icon: {
      color: colors.appBlack,
    },
    userImageContainer: {
      width: h(50),
      height: h(50),
      borderRadius: m(50),
      overflow: "hidden",
      justifyContent:'center',
      alignItems:'center',
      borderWidth:m(1),
      borderColor: colors.appWhite
    },
    userImage: {
      height:'100%',
      width:'100%'
    },
    rightRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    rightIconContainer: {
      width: h(50),
      height: h(50),
      borderRadius: m(50),
      overflow: "hidden",
      justifyContent:'center',
      alignItems:'center'
    },
  });
};
