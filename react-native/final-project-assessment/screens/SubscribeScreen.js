import React, { useState } from "react";
import { validateEmail } from "../utils";
import {
  View,
  Image,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";

const SubscribeScreen = () => {
  const [email, onChangeEmail] = useState("");
  const isEmailValid = validateEmail(email);
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/little-lemon-logo-grey.png")}
        style={styles.logoImg}
      />
      <Text style={styles.text}>
        Subscribe to our newsletter for our latest delicious recipes!
      </Text>
      <TextInput
        style={styles.inputBox}
        value={email}
        onChangeText={onChangeEmail}
        placeholder={"Type your email"}
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <Pressable
        style={isEmailValid ? styles.button : styles.disabledButton}
        onPress={() => {
          Alert.alert("Thanks for subscribing. Stay tuned!");
        }}
        disabled={!isEmailValid}
      >
        <Text style={styles.buttonText}>Subscribe</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  logoImg: { width: 100, height: 100, resizeMode: "contain", margin: 25 },
  text: { textAlign: "center", fontSize: 18, margin: 20 },
  button: {
    backgroundColor: "#3E524B",
    paddingHorizontal: 110,
    paddingVertical: 8,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: 'grey',
    opacity: 0.5,
    paddingHorizontal: 110,
    paddingVertical: 8,
    borderRadius: 5,
  },
  buttonText: { color: "white" },
  inputBox: {
    height: 40,
    width: 280,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: "EDEFEE",
    backgroundColor: "#EDEFEE",
  },
});

export default SubscribeScreen;
