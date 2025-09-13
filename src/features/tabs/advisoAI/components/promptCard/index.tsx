import { IMAGES } from '@/src/assets';
import { useHaptics } from '@/src/hooks';
import { useTheme } from '@/src/hooks/useTheme';
import { PromptItem } from '@/src/types/productPost';
import { HIT_SLOP } from '@/src/utils/helper';
import { m } from '@/src/utils/metrics';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { ImageBackground } from 'expo-image';
import React from 'react';
import { Pressable, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { useThemedStyles } from './styles';

interface PromptCardProps {
  index: number;
  item: PromptItem;
  onPress: () => void;
  onPressArrow: () => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ index, item, onPress, onPressArrow }) => {
  const { selection } = useHaptics();
  const colors = useTheme();
  const styles = useThemedStyles();
  return (
    <Animated.View entering={FadeInRight.delay(index * 100).duration(800)}>
      <Pressable onPress={() => {
        selection()
        onPress?.();
      }} style={styles.card}>
        <BlurView  style={styles.blurBG} intensity={50} tint='light'>
          <FontAwesome5 name={'brain'} size={m(30)} color={colors.appSecondary} />
          <Text numberOfLines={2} style={styles.title}>{item.product_name}</Text>
          <Text numberOfLines={3} style={styles.desc}>{item.prompt}</Text>
          <TouchableOpacity
            hitSlop={HIT_SLOP.large} onPress={() => {
              selection()
              onPressArrow?.();
            }} style={styles.arrowContainer}>
            <ImageBackground source={IMAGES.BG} contentFit='cover' style={styles.iconBG}>
              <AntDesign name="arrowright" size={m(16)} color={colors.appBlack} />
            </ImageBackground>
          </TouchableOpacity>
        </BlurView>
      </Pressable>
    </Animated.View>
  );
};

export default PromptCard;
