import React, { useEffect, useContext, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { checkMenu } from "../db/database";

export default function Home() {
  const navigation = useNavigation();

  const [menuItems, setMenuItems] = useState([]);

  const loadData = async () => {
    try {
      const menuItems = await checkMenu();
      return setMenuItems(menuItems);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
    console.log(menuItems);
  }, []);

  return (
    <View style={styles.container}>
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
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItems}>
            <View style={styles.menuInfo}>
              <Text style={styles.menuTitle}>{item.name}</Text>
              <Text style={styles.menuPrice}>{"$" + item.price}</Text>
              <Text style={styles.menuDescription}>{item.description}</Text>
            </View>
            <View>
              <Image source={{ uri: item.image }} style={styles.imgDish} />
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "lightgray", // Separator color
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 45,
    paddingBottom: 15,
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
    top: 40,
  },
  imgLogo: {
    resizeMode: "contain",
    justifyContent: "center",
  },
  imgProfile: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  menuItems: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuInfo: { flex: 1 },
  imgDish: {
    resizeMode: "cover",
    width: 120,
    height: 120,
    margin: 10,
  },
  menuTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  menuDescription: {
    color: "gray",
  },
  menuPrice: {
    color: "gray",
    fontWeight: "bold",
  },
});
