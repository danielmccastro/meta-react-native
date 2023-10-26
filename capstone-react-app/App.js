import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import OnboardingScreen from "./screens/Onboarding";
import ProfileScreen from "./screens/Profile";
import SplashScreen from "./screens/Splash";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboardingCompleted, setOnboardingCompleted] = useState(false);

  getItems = async () => {
    try {
      const values = await AsyncStorage.multiGet(["firstName", "email"]);
      values ? setOnboardingCompleted == true : setOnboardingCompleted == false;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getItems();
    setIsLoading(false);
  });
  if (isLoading) return <SplashScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isOnboardingCompleted ? (
          <Stack.Screen name="Profile" component={ProfileScreen} />
        ) : (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{headerShown: false}}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
