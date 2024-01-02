import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  FlatList,
  SafeAreaView,
  Alert,
  SectionList,
} from "react-native";
import Filters from "../components/Filters";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import {
  createTable,
  getMenuItems,
  saveMenuItems,
  filterByQueryAndCategories,
} from "../db/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSectionListData, useUpdateEffect } from "../utils";
import debounce from "lodash.debounce";

const API_URL =
  "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";
const sections = ["starters", "mains", "desserts"];

export default function Home() {
  const navigation = useNavigation();
  const route = useRoute();

  const [data, setData] = useState([]);
  const [searchBarText, setSearchBarText] = useState("");
  const [query, setQuery] = useState("");
  const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false)
  );

  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const getInitials = (firstName, lastName) => {
    const firstNameChars = [...firstName];
    const lastNameChars = [...lastName];

    const initials = firstNameChars[0] + lastNameChars[0];

    return initials;
  };

  const setProfileValues = async (userAsyncStorage) => {
    try {
      const user = JSON.parse(userAsyncStorage);
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setImage(user.image || null);
    } catch (error) {
      console.log("Error setting profile values:", error);
    }
  };

  const loadProfileData = async () => {
    try {
      const jsonString = await AsyncStorage.getItem("@user");
      console.log("Retrieved JSON string:", jsonString);
      if (!jsonString) {
        console.log("No data retrieved from AsyncStorage");
        return;
      }
      console.log("Data retrieved from AsyncStorage:", jsonString);
      await setProfileValues(jsonString);
    } catch (error) {
      console.log("Error loading profile data:", error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await createTable();
        let menuItems = await getMenuItems();
        console.log("Retrieved menu items from database:", menuItems);
        if (!menuItems.length) {
          menuItems = await fetchData();
          console.log("Fetched menu items from API:", menuItems);
          saveMenuItems(menuItems);
        }
        const sectionListData = getSectionListData(menuItems);
        setData(sectionListData);
      } catch (e) {
        Alert.alert(e.message);
      }
    })();
  }, []);

  useUpdateEffect(() => {
    (async () => {
      const activeCategories = sections.filter((s, i) => {
        if (filterSelections.every((item) => item === false)) {
          return true;
        }
        return filterSelections[i];
      });
      try {
        const menuItems = await filterByQueryAndCategories(
          query,
          activeCategories
        );
        const sectionListData = getSectionListData(menuItems);
        setData(sectionListData);
      } catch (e) {
        Alert.alert(e.message);
      }
    })();
  }, [filterSelections, query]);

  const lookup = useCallback((q) => {
    setQuery(q);
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = (text) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };

  const handleFiltersChange = async (index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };

  const fetchData = async () => {
    let response = await fetch(API_URL);
    let json = await response.json();
    let results = json.menu.map((item, index) => ({
      ...item,
      id: index.toString(),
    }));
    console.log("Results variable: " + results);
    return results;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
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
          {loadProfileData() && image ? (
            <Image source={{ uri: image }} style={styles.imgProfile} />
          ) : (
            <Text style={styles.initialsText}>
              {getInitials(firstName, lastName)}
            </Text>
          )}
        </Pressable>
      </View>
      <ScrollView keyboardDismissMode={"on-drag"}>
        {/* HERO SECTION */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Little Lemon</Text>
          <Text style={styles.heroSubtitle}>Chicago</Text>
          <View style={styles.heroImgContainer}>
            <Text style={styles.heroDescription}>
              We are a family owned Mediterranean restaurant, focused on
              traditional recipes served with a modern twist.
            </Text>
            <Image
              source={require("../assets/Hero.png")}
              style={styles.imgHero}
            />
          </View>
          <Searchbar
            placeholder="Search"
            placeholderTextColor="black"
            onChangeText={handleSearchChange}
            value={searchBarText}
            style={styles.searchBar}
            iconColor="black"
            inputStyle={{ color: "black" }}
            elevation={0}
          />
        </View>
        {/* FILTER SECTION */}
        <View style={styles.container}>
          <Text style={styles.orderTxt}>ORDER FOR DELIVERY!</Text>
          <Filters
            selections={filterSelections}
            onChange={handleFiltersChange}
            sections={sections}
          />
          {/* MENU LIST SECTION */}

          <ScrollView style={styles.sectionList}>
            {data.map((section) => (
              <View key={section.name}>
                {section.data.map((item, index) => (
                  <View key={index} style={styles.item}>
                    <View style={styles.menuInfo}>
                      <Text style={styles.menuTitle}>{item.name}</Text>
                      <Text style={styles.menuDescription}>
                        {item.description}
                      </Text>
                      <Text style={styles.menuPrice}>${item.price}</Text>
                    </View>

                    {item.image === "grilledFish.jpg" ? (
                      <Image
                        style={styles.imgDish}
                        source={require("../assets/Grilledfish.png")}
                      />
                    ) : item.name === "Lemon Dessert" ? (
                      <Image
                        style={styles.imgDish}
                        source={require("../assets/Lemondessert.png")}
                      />
                    ) : (
                      <Image
                        style={styles.imgDish}
                        source={{
                          uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`,
                        }}
                      />
                    )}
                  </View>
                ))}
                <View
                  style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "grey",
                    alignSelf: "center",
                    marginTop: 20,
                  }}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  sectionList: {
    paddingHorizontal: 12,
  },
  sectionHeader: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 15,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    color: "black",
  },
  orderTxt: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Karla",
    marginTop: 20,
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
    fontFamily: "Markazi",
  },
  menuDescription: {
    color: "gray",
    fontSize: 16,
  },
  menuPrice: {
    color: "gray",
    fontWeight: "bold",
    fontSize: 18,
  },
  heroSection: {
    backgroundColor: "#495E57",
    padding: 20,
    position: "relative",
    overflow: "hidden",
  },
  heroTitle: {
    fontSize: 60,
    color: "#F4CE14",
    marginTop: -20,
    fontFamily: "Markazi",
  },
  heroSubtitle: {
    fontSize: 35,
    color: "#EDEFEE",
    marginTop: -20,
    fontFamily: "Markazi",
  },
  heroImgContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heroDescription: {
    fontSize: 15,
    color: "#EDEFEE",
    maxWidth: 200,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: "Karla",
  },
  imgHero: {
    height: 140,
    width: 120,
    marginTop: -30,
    borderRadius: 20,
  },
  searchBar: {
    marginTop: 20,
  },
});
