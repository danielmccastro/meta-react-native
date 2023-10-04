import * as React from "react";
import { View, Text } from "react-native";

export default function LittleLemonHeader() {
  return (
    <View style={{ flex: 0.1, backgroundColor: "#F4CE14" }}>
      <Text style={{ marginTop: 30,fontSize: 30, color: "black", textAlign: 'center' }}>
        Little Lemon
      </Text>
    </View>
  );
}
