import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "./screens/Onboarding";
import ProfileScreen from "./screens/Profile";

const Stack = createNativeStackNavigator();

const isLoggedIn = false;

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        (!isLoggedIn ?
        <Stack.Screen name="Onboarding" component={OnboardingScreen} /> :
        <Stack.Screen name="Profile" component={ProfileScreen} />)
      </Stack.Navigator>
    </NavigationContainer>
  );
}
