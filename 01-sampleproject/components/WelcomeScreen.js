import React, { useState } from "react";
import { ScrollView, Text, TextInput, StyleSheet } from "react-native";

export default function WelcomeScreen() {
  const [firstName, onChangeFirstName] = useState("");
  return (
    <ScrollView
      indicatorStyle={"white"}
      style={styles.container}
      keyboardDismissMode="on-drag"
    >
      <Text style={styles.headerText}>Welcome to Little Lemon</Text>
      <Text style={styles.innerText}>
        Little Lemon is a charming neighborhood bistro that serves simple food
        and classic cocktails in a lively but casual environment. We would love
        to hear your experience with us!
      </Text>
      <TextInput
        value={firstName}
        placeholder="First Name"
        onChangeText={onChangeFirstName}
        style={styles.input}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerText: {
    padding: 40,
    fontSize: 30,
    color: "#EDEFEE",
    textAlign: "center",
  },
  innerText: {
    fontSize: 24,
    padding: 20,
    marginVertical: 8,
    color: "#EDEFEE",
    textAlign: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: "#EDEFEE",
    backgroundColor: "#EDEFEE",
  },
});
