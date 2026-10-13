import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { store } from '@/app/store';
import RootNavigator from '@/navigation/RootNavigator';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from './globals/colors';

export default function App() {
  const [showSplash, setShowSplash] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  });

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <BottomSheetModalProvider>
            {showSplash ? (
              <View style={styles.splash}>
                <Ionicons 
                  size={64}
                  name='bus' 
                  color='#ffffff'
                />
              </View>
            ) : (
              <NavigationContainer>
                <RootNavigator />
              </NavigationContainer>
            )}
          </BottomSheetModalProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});