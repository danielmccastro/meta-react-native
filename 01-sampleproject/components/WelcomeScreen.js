import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Image,
  View,
} from "react-native";

export default function WelcomeScreen() {
  const [firstName, onChangeFirstName] = useState("");
  return (
    <ScrollView
      indicatorStyle={"white"}
      style={styles.container}
      keyboardDismissMode="on-drag"
    >
      <View style={styles.headerWrapper}>
        <Image
          source={require("../img/littleLemonLogo.png")}
          style={styles.logo}
          resizeMode="cover"
          accessible={true}
          accessibilityLabel={"Little Lemon Logo"}
        />
        <Text style={styles.headerText}>Little Lemon</Text>
      </View>
      <Text style={styles.innerText}>
        Little Lemon is a charming neighborhood bistro that serves simple food
        and classic cocktails in a lively but casual environment. We would love
        to hear your experience with us!
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerText: {
    paddingRight: 10,
    paddingLeft: 20,
    paddingTop: 30,
    paddingBottom: 10,
    fontSize: 30,
    color: '#EDEFEE',
    textAlign: 'center',
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
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },
});
