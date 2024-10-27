import { View, Text } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "../store/store.js";
import { PersistGate } from "redux-persist/integration/react";

SplashScreen.preventAutoHideAsync();
const MainLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Baloo-Regular": require("../assets/fonts/Baloo-Regular.ttf"),
    "Algance-Regular": require("../assets/fonts/Algance-Regular.otf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="home" options={{ headerShown: false }} />
          {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
          <Stack.Screen name="auth" options={{ headerShown: false }} />
        </Stack>
      </PersistGate>
    </Provider>
  );
};

export default MainLayout;
