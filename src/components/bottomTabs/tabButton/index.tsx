import { useTheme } from "@/src/hooks/useTheme";
import { useThemedStyles } from "@/src/styles";
import React, { useEffect } from "react";
import { Pressable } from "react-native";
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated";

type TabButtonProps = {
  onPress: () => void;
  label: string;
  icon: (color: string) => React.JSX.Element;
  isFocused: boolean;
};

export default function TabButton({ onPress, label, icon, isFocused }: TabButtonProps) {
  const styles = useThemedStyles();
  const flex = useSharedValue(isFocused ? 1.5 : 1);
  const colors = useTheme();

  useEffect(() => {
    flex.value = withSpring(isFocused ? 1.6 : 1, {
      damping: 8, // lower = more bounce
      stiffness: 120, // lower = softer spring
      mass: 0.6, // lighter mass feels more elastic
      overshootClamping: false, // allow overshoot
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    });
  }, [isFocused, flex]);

  const animatedStyle = useAnimatedStyle(() => ({
    flex: flex.value,
  }));

  return (
    <Animated.View style={[animatedStyle, styles.tabContainer]}>
      <Pressable
        onPress={onPress}
        style={[styles.tabIconContainer, isFocused && styles.activePill]}>
        {icon(isFocused ? colors.appSecondary : colors.appWhite)}
        {isFocused && <Animated.Text numberOfLines={1} entering={FadeIn.duration(800).springify().damping(12).stiffness(90)} style={styles.label}>{label}</Animated.Text>}
      </Pressable>
    </Animated.View>
  );
}
