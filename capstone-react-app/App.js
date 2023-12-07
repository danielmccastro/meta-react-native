import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Onboarding from "./screens/Onboarding";
import Profile from "./screens/Profile";
import Splash from "./screens/Splash";

const Stack = createNativeStackNavigator();

export default function App() {
  const [state, setState] = useState({
    isLoading: true,
    isOnboardingCompleted: false,
  });

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const flag = await AsyncStorage.getItem("onboardingFlag");
        setState({
          isLoading: false,
          isOnboardingCompleted: flag === "true",
        });
      } catch (error) {
        setState({
          isLoading: false,
          isOnboardingCompleted: false,
        });
      }
    };

    checkOnboardingStatus();
  }, []);
  if (state.isLoading) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {state.isOnboardingCompleted ? (
          <Stack.Screen name="Profile" component={Profile} />
        ) : (
          <Stack.Screen name="Onboarding" component={Onboarding} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
