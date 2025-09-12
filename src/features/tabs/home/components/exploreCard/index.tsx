import { useHaptics } from "@/src/hooks";
import { BlurView } from "expo-blur";
import React from "react";
import { Image, Pressable, Text } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { useThemedStyles } from "./styles";

interface ExploreCardProps {
    index: number;
    title: string;
    image: string;
    onPress: () => void;
}

const ExploreCard: React.FC<ExploreCardProps> = ({ index, title, image, onPress }) => {
    const { selection } = useHaptics();
    const styles = useThemedStyles();

    return (
        <Animated.View entering={FadeInRight.delay(index * 100).duration(800)}>
            <Pressable
                style={styles.card}
                onPress={() => {
                    selection();
                    onPress?.();
                }}>

                <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />

                <BlurView intensity={10} tint="light" style={styles.overlay}>
                    <Text style={styles.title} numberOfLines={1}>
                        {title}
                    </Text>
                </BlurView>

            </Pressable>
        </Animated.View>
    );
};

export default ExploreCard;
