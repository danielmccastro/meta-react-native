import React from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  Image,
  View,
  useColorScheme,
} from "react-native";

export default function WelcomeScreen() {
  const colorScheme = useColorScheme();
  return (
    <ScrollView
      indicatorStyle={"white"}
      style={[
        styles.container,
        colorScheme === "light"
          ? { backgroundColor: "#fff" }
          : { backgroundColor: "#333333" },
      ]}
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
        <Text
          style={[
            styles.headerText,
            colorScheme === "light" ? { color: "black" } : { color: "white" },
          ]}
        >
          Little Lemon
        </Text>
      </View>
      <Text
        style={[
          styles.innerText,
          colorScheme === "light" ? { color: "black" } : { color: "white" },
        ]}
      >
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
    textAlign: "center",
  },
  innerText: {
    fontSize: 24,
    padding: 20,
    marginVertical: 8,
    textAlign: "center",
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
