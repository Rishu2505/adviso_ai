import { useTheme } from "@/src/hooks/useTheme";
import { fonts } from "@/src/theme";
import { h, m, v } from "@/src/utils/metrics";
import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");
const _itemSize = width * 0.45;
const _spacing = 8;

export const useThemedStyles = () => {
  const colors = useTheme();
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
    },
    scrollViewContentContainer: {
      paddingBottom: v(100),
    },
    mainView: {
      flex: 1,
    },
    image: {
      width: _itemSize,
      aspectRatio: 1,
      borderRadius: _spacing,
    },
    contentView: {
      alignItems: "center",
      paddingHorizontal: h(16),
    },
    avatarContainer: {
      width: h(80),
      height: v(80),
      borderRadius: m(80),
      overflow: "hidden",
      backgroundColor: colors.transParentWhite
    },
    blurContainer: { justifyContent: "center" },
    avatar: {
      width: h(74),
      height: v(74),
      borderRadius: m(74),
      alignSelf: "center",
      backgroundColor: colors.appGrey,
    },
    title: {
      color: colors.appBlack,
      fontFamily: fonts.SpaceMonoRegular,
      fontSize: m(28),
      textAlign: "center",
    },
    sub_title: {
      color: colors.appBlack,
      textAlign: "justify",
      fontSize: m(13),
      fontFamily: fonts.SpaceMonoRegular,
    },
  });
};
