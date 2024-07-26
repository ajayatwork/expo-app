import { router, Stack, useRootNavigationState } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { ToastProvider } from 'react-native-toast-notifications'
import "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Slot } from 'expo-router';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
} from '@expo-google-fonts/poppins';
import {
  HindSiliguri_300Light,
  HindSiliguri_400Regular,
  HindSiliguri_500Medium,
  HindSiliguri_600SemiBold,
  HindSiliguri_700Bold,
} from '@expo-google-fonts/hind-siliguri';

import { ActivityIndicator } from "react-native-paper";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [userToken, setUserToken] = useState<null | string>(null);
   const rootNavigation = useRootNavigationState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAppReady, setisAppReady] = useState(false);
  let [isFontLoaded] = useFonts({
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  HindSiliguri_300Light,
  HindSiliguri_400Regular,
  HindSiliguri_500Medium,
  HindSiliguri_600SemiBold,
  HindSiliguri_700Bold
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Simulate a delay for the splash screen
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsLoggedIn(true);
        setisAppReady(true);
        await SplashScreen.hideAsync();

      }finally {

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
          router.replace("/(home)")
        }
      } catch (error) {
        console.error("Failed to fetch the token from AsyncStorage", error);
      }
    };

    checkUserLoggedIn();

  }, [isAppReady, isLoggedIn]);
  if (!rootNavigation?.key) {
    return <Slot />;
  }
  if(!isFontLoaded) return null;
  return (
      <ToastProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {isLoggedIn ?   <Stack.Screen name="(home)" options={{ headerShown: false }} />
         : <Stack.Screen name="(auth)" options={{ headerShown: false }} />}
        <Stack.Screen name="+not-found" />
      </Stack>
      </ToastProvider>
  );
}