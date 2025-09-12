import { useHaptics } from "@/src/hooks";
import { useThemedStyles } from "@/src/styles";
import { BlurView } from "expo-blur";
import React, { useEffect } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { TabButton } from "..";

type TabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
  tabItems: {
    name: string;
    label: string;
    icon: (color: string) => React.JSX.Element;
  }[];
};

export default function TabBar({ state, descriptors, navigation, tabItems }: TabBarProps) {
  const styles = useThemedStyles();
  const { selection } = useHaptics();
  const translateX = useSharedValue(0);

  useEffect(() => {
    // small horizontal kick
    translateX.value = 10;
    // bounce back to 0
    translateX.value = withSpring(0, {
      damping: 12, // lower = more bounce
      stiffness: 90, // lower = softer spring
      mass: 0.6, // lighter mass feels more elastic
      overshootClamping: false, // allow overshoot
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    });
  }, [state.index, translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View style={[animatedStyle]}>
      <BlurView intensity={10} tint="light" style={styles.tabBar} >
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;
          const onPress = () => {
            selection();
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const item = tabItems.find((i) => i.name === route.name);
          if (!item) return null;

          return (
            <TabButton
              key={route.key}
              onPress={onPress}
              label={item.label}
              icon={item.icon}
              isFocused={isFocused}
            />
          );
        })}
      </BlurView>
    </Animated.View>
  );
}
