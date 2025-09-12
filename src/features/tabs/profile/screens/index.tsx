import { IMAGES } from '@/src/assets';
import { CustomScreenHeader } from '@/src/components';
import { useApi } from '@/src/hooks';
import { useAuth } from '@/src/hooks/useAuth';
import { useGlobalThemedStyles } from '@/src/styles';
import { BlurView } from 'expo-blur';
import { ImageBackground } from 'expo-image';
import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown, LinearTransition } from 'react-native-reanimated';
import { strings } from './constants';
import { useThemedStyles } from './styles';

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));
const _initialDelay = 200;

export function Profile() {
  const globalStyles = useGlobalThemedStyles()
  const styles = useThemedStyles()
  const scrollRef = useRef<Animated.ScrollView>(null);
  const { token, user, isAuthenticated, login, logout } = useAuth();
  const { callEndpoint, loading, data, error } = useApi();
  const [visibleText, setVisibleText] = useState('');
  const typingSpeed = 10;

  useEffect(() => {
    setVisibleText('');
    let currentIndex = 0;
    const chars = [...strings.info];
    let interval: ReturnType<typeof setInterval>;

    const delayTimeout = setTimeout(() => {
      interval = setInterval(() => {
        setVisibleText(prev => {
          const nextChar = chars[currentIndex];
          currentIndex++;
          if (currentIndex >= chars.length) {
            clearInterval(interval);
          }

          requestAnimationFrame(() => {
            scrollRef.current?.scrollToEnd({ animated: true });
          });
          return prev + (nextChar ?? '');
        });
      }, typingSpeed);
    }, 0);

    return () => {
      clearTimeout(delayTimeout);
      clearInterval(interval);
    };
  }, []);

  // log whenever auth state changes
  useEffect(() => {
    console.log("Auth State Changed:", { token, user, isAuthenticated });
  }, [token, user, isAuthenticated]);

  // for testing login functionality
  const _login = () => {
    login("demo-token", { id: "1", name: "Mukesh" })
  }

  // for testing logout functionality
  const _logout = () => {
    logout()
  }

  // log whenever API state changes
  useEffect(() => {
    console.log("🔄 Loading:", loading, "📦 Data:", data, "⚠️ Error:", error);
  }, [loading, data, error]);

  // API Tests
  const testGet = () =>
    callEndpoint({
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/posts/1",
    });

  const testPost = () =>
    callEndpoint({
      method: "POST",
      url: "https://jsonplaceholder.typicode.com/posts",
      data: { title: "foo", body: "bar", userId: 1 },
    });

  const testPut = () =>
    callEndpoint({
      method: "PUT",
      url: "https://jsonplaceholder.typicode.com/posts/1",
      data: { id: 1, title: "updated title", body: "updated body", userId: 1 },
    });

  const testDelete = () =>
    callEndpoint({
      method: "DELETE",
      url: "https://jsonplaceholder.typicode.com/posts/1",
    });

  // Run tests once on mount
  useEffect(() => {
    const runTests = async () => {
      console.log("🚀 Starting API tests...");

      console.log("▶️ Running GET...");
      await testGet();
      await wait(2000);

      console.log("▶️ Running POST...");
      await testPost();
      await wait(2000);

      console.log("▶️ Running PUT...");
      await testPut();
      await wait(2000);

      console.log("▶️ Running DELETE...");
      await testDelete();

      console.log("🎉 Finished API tests!");
    };

    runTests();
  }, []);

  const header_UIContainer = () => {
    return (
      <CustomScreenHeader
        title={strings.title}
        showUserImage
        userImage={strings.userImage}
        onUserPress={() => console.log("Avatar pressed")}
        showRightIcon
        rightIconName="settings"
        onRightPress={() => console.log("right icon pressed")}
      />
    )
  }

  return (
    <ImageBackground source={IMAGES.BG} contentFit='cover' style={globalStyles.mainContainer}>
        {header_UIContainer()}
        <Animated.ScrollView layout={LinearTransition.springify().damping(15).stiffness(90)} ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContentContainer}>
          <View style={styles.mainView}>
            <View
              style={styles.contentView}>
              <Animated.View entering={FadeInDown.duration(600)} style={styles.avatarContainer}>
                <BlurView intensity={50} tint="light" style={[StyleSheet.absoluteFill, styles.blurContainer]}>
                  <Image source={{ uri: `https://portfolio-lake-three-21.vercel.app/me.png` }} resizeMode="cover" style={styles.avatar} />
                </BlurView>
              </Animated.View>
              <Animated.Text
                entering={FadeInDown.springify()
                  .damping(12)
                  .delay(_initialDelay + 100)}
                style={styles.title}>
                {strings.name}
              </Animated.Text>
              <Animated.Text
                entering={FadeInDown.springify()
                  .damping(12)
                  .delay(_initialDelay + 200)}
                style={styles.sub_title}>
                {visibleText}
              </Animated.Text>
            </View>
          </View>
        </Animated.ScrollView>
    </ImageBackground>
  );
}
