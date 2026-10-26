import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { store, persistor } from '@/app/store';
import RootNavigator from '@/navigation/RootNavigator';
import colors from './globals/colors';

/**
 * EN: App root component.
 * PT: Componente raíz do aplicativo
 */
export default function App() {
  const [showSplash, setShowSplash] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  });

  const splash = (
    <View style={styles.splash}>
      <Ionicons size={64} name='bus' color='#ffffff' />
    </View>
  );

  return (
    // EN: Provides the Redux store to the entire application.
    // PT: Disponibiliza a store do Redux para toda a aplicação.
    <Provider store={store}>

      {/*
        EN: Delays rendering until the persisted Redux state is rehydrated.
        PT: Adia a renderização até que o estado persistido do Redux seja restaurado. */}
      <PersistGate loading={splash} persistor={persistor} >

        {/*
          EN: Enable gestures handling across the application.
          PT: Habilita o gerenciamento de gestos em toda a aplicação. */}
        <GestureHandlerRootView style={{ flex: 1 }}>

          {/*
            EN: Provides safe area insets for screen and UI elements.
            PT: Disponibiliza as áreas seguras para telas e elementos da interface. */}
          <SafeAreaProvider>

            {/*
              EN: Makes the bottom sheet modal funcionality availabe throughout the component tree.
              PT: Disponibiliza a funcionalidade de modais 'bottom sheet' para todos os componentes. */}
            <BottomSheetModalProvider>
              
              {/*
                EN: Displays the splash screen while the app is initializing. Once initialization is complete, renders
                    the navigation container and the root navigator.
                PT: Exibe a tela de splash enquanto o aplicativo é inicializado. Após a inicialização, renderiza o
                    conteiner de navegação e o navegador principal. */}
              {showSplash ? (
                splash
              ) : (
                <NavigationContainer>
                  <RootNavigator />
                </NavigationContainer>
              )}

            </BottomSheetModalProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  /** EN: Splash screen layout. PT-BR: Layout da tela de splash. */
  splash: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});