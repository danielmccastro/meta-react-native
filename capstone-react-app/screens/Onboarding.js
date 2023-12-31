import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { validateEmail, validateFirstName } from "../utils";
import { useNavigation } from "@react-navigation/native";
import AppContext from "../context/AppContext";

export default function Onboarding() {
  const navigation = useNavigation();
  const [firstName, onChangeFirstName] = useState("");
  const [lastName, onChangeLastName] = useState("");
  const [email, onChangeEmail] = useState("");
  const user = { firstName, email };
  const isEmailValid = validateEmail(email);
  const isFirstNameValid = validateFirstName(firstName);
  const { setGlobalState, updateUser } = useContext(AppContext);

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  const setProfile = async () => {
    try {
      const userData = { firstName, lastName, email };
      await AsyncStorage.setItem("@user", JSON.stringify(userData));
      updateUser(userData);
      setGlobalState({
        isLoading: false,
        isOnboardingCompleted: true,
      });
      navigation.navigate("Profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              source={require("../assets/Logo.png")}
              accessible={true}
              accessibilityLabel={"Little Lemon Logo"}
              style={styles.img}
            />
          </View>
          <View style={styles.content}>
            <Text style={styles.headerText}>Let us get to know you</Text>
            <Text style={styles.labelText}>First Name</Text>
            <TextInput
              style={styles.inputBox}
              keyboardType="default"
              textContentType="name"
              onChangeText={onChangeFirstName}
            />
            <Text style={styles.labelText}>Last Name</Text>
            <TextInput
              style={styles.inputBox}
              keyboardType="default"
              textContentType="name"
              onChangeText={onChangeLastName}
            />
            <Text style={styles.labelText}>Email</Text>
            <TextInput
              style={styles.inputBox}
              keyboardType="email-address"
              textContentType="emailAddress"
              onChangeText={onChangeEmail}
            />
          </View>
          <View style={styles.footer}>
            <Pressable
              style={
                isEmailValid && isFirstNameValid
                  ? styles.btn
                  : styles.disabledBtn
              }
              onPress={() => setProfile(user) && console.log(user)}
              disabled={!isEmailValid || !isFirstNameValid}
            >
              <Text style={styles.labelText}>Next</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 45,
    paddingBottom: 15,
  },
  img: {
    paddingVertical: 35,
    resizeMode: "contain",
  },
  content: {
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#495E57",
    padding: 30,
  },
  headerText: {
    fontSize: 30,
    paddingBottom: 25,
    color: "white",
    marginTop: 10,
    fontFamily: "Karla",
  },
  labelText: {
    textAlign: "center",
    fontSize: 22,
    color: "white",
    fontFamily: "Karla",
  },
  inputBox: {
    height: 50,
    width: 280,
    margin: 15,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#EDEFEE",
  },
  footer: {
    flex: 1,
    alignItems: "flex-end",
  },
  btn: {
    marginEnd: 50,
    marginVertical: 30,
    backgroundColor: "#495E57",
    borderRadius: 10,
    padding: 7,
    paddingHorizontal: 30,
  },
  disabledBtn: {
    marginEnd: 50,
    marginVertical: 30,
    backgroundColor: "grey",
    opacity: 0.5,
    padding: 7,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
});
