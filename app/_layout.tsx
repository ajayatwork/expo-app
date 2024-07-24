import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { ToastProvider } from 'react-native-toast-notifications'
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRootNavigationState, Redirect } from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [userToken, setUserToken] = useState<null | string>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const rootNavigationState = useRootNavigationState();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Simulate a delay for the splash screen
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {

        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const data = await AsyncStorage.getItem("token");
        if (data) {
          console.log("Data2143", data);
          setIsLoggedIn(true);
          setUserToken(data);
          <Redirect href={'/(home)'}/>
        }
      } catch (error) {
        console.error("Failed to fetch the token from AsyncStorage", error);
      }
    };

    checkUserLoggedIn();
  }, []);

  if (!loaded && !rootNavigationState?.key) {
    return null;
  }
  return (
      <ToastProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="(home)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        )}
        <Stack.Screen name="+not-found" />
      </Stack>
      </ToastProvider>
  );
}