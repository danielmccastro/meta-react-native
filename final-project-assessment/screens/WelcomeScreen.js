import * as React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/little-lemon-logo.png")}
        style={styles.logoImg}
      />
      <Text style={styles.text}>
        Little Lemon, your local Mediterranean Bistro
      </Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Subscribe")}
      >
        <Text style={styles.buttonText}>Newsletter</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  logoImg: { width: 200, height: 200, resizeMode: "contain" },
  text: { textAlign: "center", fontWeight: "bold", fontSize: 18, margin: 50 },
  button: {
    backgroundColor: "#3E524B",
    paddingHorizontal: 100,
    paddingVertical: 8,
    borderRadius: 5,
  },
  buttonText: { color: "white" },
});

export default WelcomeScreen;
