import { IMAGES } from '@/src/assets';
import { useHaptics } from '@/src/hooks';
import { BlurView } from 'expo-blur';
import { ImageBackground } from 'expo-image';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { useThemedStyles } from './styles';

interface CategoryChipsProps {
    index: number;
    label: string;
    isActive: boolean;
    onPress: () => void;
}

const CategoryChips: React.FC<CategoryChipsProps> = ({ index, label, isActive, onPress }) => {
    const { selection } = useHaptics();
    const styles = useThemedStyles();

    return (
        <Animated.View entering={FadeInRight.delay(index * 100).duration(800)}>
            {isActive ?
                <ImageBackground source={IMAGES.BG} contentFit='cover' style={[styles.chipContainer]}>
                    <Pressable
                        style={[styles.chip]}
                        onPress={() => {
                            selection()
                            onPress?.();
                        }}>
                        <View style={styles.contentRow}>
                            <Text style={[styles.label]}>{label}</Text>
                        </View>
                    </Pressable>
                </ImageBackground>
                :
                <Pressable
                    style={[styles.chipInactive]}
                    onPress={() => {
                        selection()
                        onPress?.();
                    }}>
                    <BlurView style={styles.blurredView} intensity={50} tint='extraLight'>
                        <View style={styles.contentRow}>
                            <Text style={[styles.label]}>{label}</Text>
                        </View>
                    </BlurView>
                </Pressable>
            }
        </Animated.View>
    );
};

export default CategoryChips;
