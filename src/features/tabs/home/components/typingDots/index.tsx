import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";
import { useThemedStyles } from "./styles";
const AnimatedDot = ({ delay }: { delay: number }) => {
    const progress = useSharedValue(0);
    const styles = useThemedStyles()
    useEffect(() => {
        const timeout = setTimeout(() => {
            progress.value = withRepeat(
                withSequence(
                    withTiming(1, { duration: 300 }),
                    withTiming(0, { duration: 300 })
                ),
                -1,
                false
            );
        }, delay);

        return () => clearTimeout(timeout);
    }, [delay]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: -6 * progress.value },
            { scale: 1 + 0.3 * progress.value },
        ],
        opacity: 0.5 + 0.5 * progress.value,
    }));

    return <Animated.View style={[styles.dot, animatedStyle]} />;
};

const TypingDots = () => {
    const styles = useThemedStyles()
    const dots = [0, 1, 2];

    return (
        <View style={styles.typingDots}>
            {/* <Image source={IMAGES.LOGO} style={styles.aiLogo} /> */}
            {dots.map((_, index) => (
                <AnimatedDot key={index} delay={index * 150} />
            ))}
        </View>
    );
};

export default TypingDots;
