import { BlurView } from "expo-blur";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import Animated, { FadeInDown, LinearTransition } from "react-native-reanimated";
import { ExpandableDescription } from "..";
import { strings } from "./constants";
import { useThemedStyles } from "./styles";

interface TrendingCardProps {
    item: {
        id: string;
        user: {
            name: string;
            avatar: string;
        };
        posted_in: string;
        time: string;
        text: string;
        image: string;
    };
    index: number;
    onPress?: (id: string) => void;
    expanded: boolean;
    onToggleExpand: (id: string) => void;
}

const TrendingCard: React.FC<TrendingCardProps> = ({ item, index, onPress, expanded, onToggleExpand }) => {
    const styles = useThemedStyles();

    return (
        <Animated.View
            layout={LinearTransition.springify().damping(15).stiffness(90)}
            entering={FadeInDown.delay(index * 100).duration(800)}
            style={styles.cardWrapper}>
            <Pressable
                style={styles.card}
                onPress={() => onPress?.(item.id)}>
                <BlurView intensity={50} tint="extraLight" style={styles.blurContainer}>

                    <View style={styles.headerRow}>
                        <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
                        <View style={styles.fullFlex}>
                            <Text style={styles.userName}>{item.user.name}</Text>
                            <Text style={styles.meta}>
                                {strings.postedIn}{item.posted_in} • {item.time}
                            </Text>
                        </View>
                    </View>

                    <ExpandableDescription
                        description={item.text}
                        expanded={expanded}
                        onToggleExpand={() => onToggleExpand(item.id)}
                        index={index}
                    />

                    <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
                </BlurView>
            </Pressable>
        </Animated.View>
    );
};

export default TrendingCard;
