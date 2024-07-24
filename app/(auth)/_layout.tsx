import { Stack } from 'expo-router';
import React from 'react';

export default function TabLayout() {

  return (
    <Stack screenOptions={{
        headerShown: true
    }}>
        <Stack.Screen name='index' options={{title: "Login"}}/>
        <Stack.Screen name='signup' options={{title: "Signup"}}/>
        <Stack.Screen name='forget-pass' options={{title: "Forgot Password"}}/>
        <Stack.Screen name='otp-input' options={{title: "OTP"}}/>
        <Stack.Screen name='reset-password' options={{title: "Reset Password"}}/>
    </Stack>
  );
}
