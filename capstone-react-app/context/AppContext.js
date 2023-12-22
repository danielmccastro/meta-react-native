import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export default AppContext = createContext();

export const AppProvider = ({ children }) => {
  const initialState = {
    isLoading: true,
    isOnboardingCompleted: false,
  };

  const [globalState, setGlobalState] = useState(initialState);

  const userLogout = async () => {
    await AsyncStorage.removeItem("@user");
    setGlobalState({
      isLoading: false,
      isOnboardingCompleted: false,
    });
  };

  const getUser = async () => {
    const user = await AsyncStorage.getItem("@user");
    if (user) {
      user = JSON.parse(user);
    }
    return user;
  };

  const updateUser = async (userObject) => {
    if (userObject) {
      const user = (await AsyncStorage.getItem("@user")) || {};
      const updateUser = { ...JSON.parse(user), ...userObject };
      await AsyncStorage.setItem("@user", JSON.stringify(updateUser));
    }
    return updateUser;
  };

  return (
    <AppContext.Provider
      value={{ globalState, setGlobalState, updateUser, getUser, userLogout }}
    >
      {children}
    </AppContext.Provider>
  );
};
