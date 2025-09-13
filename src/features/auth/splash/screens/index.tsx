import { IMAGES } from '@/src/assets';
import { BlurView } from 'expo-blur';
import { ImageBackground } from 'expo-image';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { ZoomInDown } from 'react-native-reanimated';
import { strings } from './constants';
import { useThemedStyles } from './styles';

export function Splash() {
  const styles = useThemedStyles();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(tabs)/home");
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <ImageBackground source={IMAGES.BG} contentFit='cover' style={styles.mainView}>
        <Animated.View entering={ZoomInDown.duration(2000).springify().damping(12).stiffness(90)} style={styles.splashView}>
          <BlurView  intensity={10} tint="light">
            <Animated.Image source={IMAGES.LOGO} resizeMode='contain' style={styles.splash} />
            <Animated.Text style={styles.appName}>{strings.name}</Animated.Text>
          </BlurView>
        </Animated.View>
      </ImageBackground>
    </View>
  );
}
