import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Onboarding from "./screens/Onboarding";
import Profile from "./screens/Profile";
import Splash from "./screens/Splash";
import { AccessibilityInfo } from "react-native";

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboardingCompleted, setOnboardingCompleted] = useState(false);

  getItems = async () => {
    try {
      const values = await AsyncStorage.multiGet(["firstName", "email"]);
      console.log(values);
      values[0][1] != null && values[1][1] != null
        ? setOnboardingCompleted(true)
        : setOnboardingCompleted(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getItems();
    setIsLoading(false);
  }, []);

  if (isLoading) return <Splash />;
  return (
    <Profile options={{ headerShown: false }} />

    /*  <NavigationContainer>
      <Stack.Navigator>
        {isOnboardingCompleted ? (
          <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
        ) : (
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
        </NavigationContainer> */
  );
}
