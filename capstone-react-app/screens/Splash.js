import React, { useState } from "react";
import { View, Image, StyleSheet, Text } from "react-native";

export default function Splash() {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={require("../assets/Splash.png")} style={styles.img} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  imgContainer: { height: 350, alignItems: "center" },
  img: {
    flex: 1,
    aspectRatio: 1, 
    resizeMode: "contain"
  },
});
