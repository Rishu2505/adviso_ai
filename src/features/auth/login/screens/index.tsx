import { useGlobalThemedStyles } from '@/src/styles';
import React, { useEffect } from 'react';
import { View } from 'react-native';

export function Login() {
  const globalStyles = useGlobalThemedStyles();

  useEffect(() => {
  }, []);

  return (
    <View style={globalStyles.mainContainer}>
    
    </View>
  );
}
