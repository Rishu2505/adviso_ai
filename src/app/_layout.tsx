import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import 'react-native-reanimated';
import Toast, { BaseToastProps } from 'react-native-toast-message';
import { CustomToast } from '../components';
import { ThemeProvider } from '../components/themeProvider';

const toastConfig = {
  success: (props: BaseToastProps) => (
    <CustomToast {...props} type="success" text1={props.text1 ?? ""} text2={props.text2 ?? ""} />
  ),
  error: (props: BaseToastProps) => (
    <CustomToast {...props} type="error" text1={props.text1 ?? ""} text2={props.text2 ?? ""} />
  ),
  info: (props: BaseToastProps) => (
    <CustomToast {...props} type="info" text1={props.text1 ?? ""} text2={props.text2 ?? ""} />
  ),
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PoppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
    PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsSemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    SpaceMonoRegular: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(common)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
        <Toast config={toastConfig} />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
