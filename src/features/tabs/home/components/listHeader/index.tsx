import { HIT_SLOP } from "@/src/utils/helper";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";
import { useThemedStyles } from "./styles";

interface ListHeaderProps {
    title: string;
    style?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    showIcon?: boolean;
    onIconPress?: () => void;
}

const ListHeader: React.FC<ListHeaderProps> = ({
    title,
    style,
    containerStyle,
    showIcon = false,
    onIconPress,
}) => {
    const styles = useThemedStyles();

    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={[styles.title, style]}>{title}</Text>
            {showIcon && (
                <Pressable onPress={onIconPress} hitSlop={HIT_SLOP.tiny}>
                    <Feather name="more-horizontal" size={22} color={styles.icon.color} />
                </Pressable>
            )}
        </View>
    );
};

export default ListHeader;
