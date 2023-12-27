import React, { useEffect, useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  FlatList
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import AppContext from "../context/AppContext";

export default function Home() {
  const navigation = useNavigation();

  const [menuItems, setMenuItems] = useState([]);

  const getMenu = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
      );
      const json = await response.json();
      setData(json.menu);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMenu();
    console.log(data);
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../assets/Logo.png")}
            accessible={true}
            accessibilityLabel={"Little Lemon Logo"}
            style={styles.imgLogo}
          />
          <Pressable
            onPress={() => {
              navigation.navigate("Profile");
            }}
            style={styles.avatarButton}
          >
            <Text>{"DC"}</Text>
          </Pressable>
        </View>
      </ScrollView>
      <View>
        <FlatList
          data={data}
          keyExtractor={({ item, index }) => item + index}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.description}</Text>
              <Text>{item.price}</Text>
            </View>
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 15,
  },
  imgLogo: {
    paddingVertical: 35,
    resizeMode: "contain",
    justifyContent: "center",
  },
  imgProfile: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
});
