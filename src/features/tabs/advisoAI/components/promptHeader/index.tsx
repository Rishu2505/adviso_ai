import { useHaptics } from '@/src/hooks';
import { useTheme } from '@/src/hooks/useTheme';
import { HIT_SLOP } from '@/src/utils/helper';
import { m } from '@/src/utils/metrics';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useThemedStyles } from './styles';

interface PromptHeaderProps {
  title: string;
}

const PromptHeader: React.FC<PromptHeaderProps> = ({ title }) => {
  const { selection } = useHaptics();
  const colors = useTheme();
  const styles = useThemedStyles();
  return (
    <Animated.View entering={FadeInUp}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          hitSlop={HIT_SLOP.large} onPress={() => {
            selection()
          }}>
          <AntDesign source="arrowright" size={m(22)} color={colors.appBlack} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default PromptHeader;
