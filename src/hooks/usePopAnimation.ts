import { useEffect } from "react";
import {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

export function usePopAnimation(isActive: boolean) {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (isActive) {
      // pop
      scale.value = withTiming(1.2, { duration: 150 }, () => {
        scale.value = withTiming(1);
      });
    } else {
      // reset subtle shrink
      scale.value = withTiming(1.1, { duration: 150 }, () => {
        scale.value = withTiming(1);
      });
    }
  }, [isActive, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return animatedStyle;
}
