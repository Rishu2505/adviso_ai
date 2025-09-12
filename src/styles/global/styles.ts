import { useTheme } from "@/src/hooks/useTheme";
import { getStatusBarHeight } from "@/src/utils/helper";
import { StyleSheet } from "react-native";

export const useGlobalThemedStyles = () => {
  const colors = useTheme();
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: getStatusBarHeight(),
    },
  });
};
