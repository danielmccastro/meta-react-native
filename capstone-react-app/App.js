import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "./screens/Onboarding";
import ProfileScreen from "./screens/Profile";
import SplashScreen from "./screens/Splash";

const Stack = createNativeStackNavigator();

const isLoggedIn = false;

export default function App() {
  return (
  <SplashScreen />
    /* <NavigationContainer>
      <Stack.Navigator>
        (isLoggedIn ?
        <Stack.Screen name="Profile" component={ProfileScreen} /> :
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />)
      </Stack.Navigator>
    </NavigationContainer> */
  );
}
