import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { validateEmail } from "../utils";

export default function Onboarding() {
  const [firstName, onChangeFirstName] = useState("");
  const [email, onChangeEmail] = useState("");
  const isEmailValid = validateEmail(email);
  return (
    <>
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
            isEmailValid && firstName != "" ? styles.btn : styles.disabledBtn
          }
          onPress={() => {
            Alert.alert("Do nothing");
          }}
          disabled={!isEmailValid || firstName == ""}
        >
          <Text style={styles.labelText}>Next</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    paddingVertical: 35,
    resizeMode: "contain",
  },
  content: {
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#495E57",
    padding: 35,
  },
  headerText: {
    fontSize: 26,
    paddingBottom: 175,
    color: "white",
    marginTop: 50,
  },
  labelText: {
    textAlign: "center",
    fontSize: 22,
    color: "white",
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