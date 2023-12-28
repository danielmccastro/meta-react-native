import React, { useState, useEffect, useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AppContext from "../context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Onboarding from "../screens/Onboarding";
import Profile from "../screens/Profile";
import Splash from "../screens/Splash";
import Home from "../screens/Home";

export default function App() {
  const Stack = createNativeStackNavigator();

  const { globalState, setGlobalState } = useContext(AppContext);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const user = await AsyncStorage.getItem("@user");
        if (user) {
          setGlobalState({
            isLoading: false,
            isOnboardingCompleted: true,
          });
        } else {
          setGlobalState({
            isLoading: false,
            isOnboardingCompleted: false,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkOnboardingStatus();
  }, []);
  if (globalState.isLoading) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {globalState.isOnboardingCompleted ? (
          <>
            <Stack.Screen name="Home" component={Home} 
            options={{headerShown: false}}/>
            <Stack.Screen name="Profile" component={Profile} 
            options={{headerShown: false}}/>
          </>
        ) : (
          <Stack.Screen name="Onboarding" component={Onboarding} 
          options={{headerShown: false}}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
