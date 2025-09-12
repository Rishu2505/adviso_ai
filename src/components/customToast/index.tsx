import { IMAGES } from '@/src/assets';
import { useTheme } from '@/src/hooks/useTheme';
import { m } from '@/src/utils/metrics';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { ImageBackground } from 'expo-image';
import React from 'react';
import { Text, View } from 'react-native';
import { useThemedStyles } from './styles';

interface Props {
  text1: string;
  text2?: string;
  type: 'success' | 'error' | 'info';
}

const CustomToast: React.FC<Props> = ({ text1, text2, type }) => {
  const styles = useThemedStyles()
  const colors = useTheme()
  const Icon =
    type === 'success' ? <MaterialIcons size={m(20)} name='celebration' color={colors.appBlack} /> : type === 'error' ? <MaterialIcons size={m(20)} name='error-outline' color={colors.appBlack} /> : <AntDesign size={m(20)} name='infocirlceo' color={colors.appBlack} />;

  return (
    <ImageBackground
      source={IMAGES.BG}
      contentFit='cover'
      style={[
        styles.container,
        type === 'success'
          ? styles.success
          : type === 'error'
            ? styles.error
            : styles.info,
      ]}
    >
      {Icon}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{text1}</Text>
        {!!text2 && <Text style={styles.infoText}>{text2}</Text>}
      </View>
    </ImageBackground>
  );
};
export default CustomToast;