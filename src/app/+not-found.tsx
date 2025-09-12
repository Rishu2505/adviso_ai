import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { globalStrings } from '../constants';
import { useTheme } from '../hooks/useTheme';
import { fonts } from '../theme';
import { m, v } from '../utils/metrics';

export default function NotFoundScreen() {
  const styles = useThemedStyles()
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.mainContainer}>
        <Text style={styles.title}>{globalStrings.notExisted}</Text>
        <Link href="/" style={styles.link}>
          <Text >{globalStrings.goToHomeScreen}</Text>
        </Link>
      </View>
    </>
  );
}


export const useThemedStyles = () => {
  const colors = useTheme();
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      padding: v(20),
    },
    title: {
      fontSize: m(22),
      fontFamily: fonts.PoppinsSemiBold,
      textAlign: 'center',
      color: colors.text
    },
    link: {
      fontSize: m(18),
      fontFamily: fonts.PoppinsMedium,
      textAlign: 'center',
      marginTop: v(5),
      color: colors.appSecondary
    },
  });
};
