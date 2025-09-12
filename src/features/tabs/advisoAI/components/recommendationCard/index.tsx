import { Recommendation } from "@/src/types/productPost";
import { BlurView } from "expo-blur";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeInDown, FadeOutUp, LinearTransition } from "react-native-reanimated";
import { ExpandableDescription } from "..";
import { useThemedStyles } from "./styles";

interface RecommendationCardProps {
    item: Recommendation;
    index: number;
    onPress?: (id: string) => void;
    expanded: boolean;
    onToggleExpand: (id: string) => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ item, index, onPress, expanded, onToggleExpand }) => {
    const styles = useThemedStyles();

    return (
        <Animated.View
            key={item.product.description}
            layout={LinearTransition.springify().damping(15).stiffness(90)}
            entering={FadeInDown.duration(800)}
            exiting={FadeOutUp.duration(300)}
            style={styles.cardWrapper}>
            <Pressable
                style={styles.card}
                onPress={() => onPress?.(item.product.product_name)}>
                <BlurView intensity={50} tint="extraLight" style={styles.blurContainer}>
                    <View style={styles.headerRow}>
                        <View style={styles.fullFlex}>
                            <Text style={styles.userName}>{item.product.product_name}</Text>
                            <Text style={styles.meta}>
                                {item.product.category}
                            </Text>
                        </View>
                    </View>

                    <ExpandableDescription
                        description={item.reason}
                        expanded={expanded}
                        onToggleExpand={() => onToggleExpand(item.product.product_name)}
                        index={index}
                    />
                </BlurView>
            </Pressable>
        </Animated.View>
    );
};

export default RecommendationCard;
