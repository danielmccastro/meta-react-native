import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  FlatList,
  Alert,
  SectionList,
} from "react-native";
import Filters from "../components/Filters";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import {
  createTable,
  getMenuItems,
  saveMenuItems,
  filterByQueryAndCategories,
} from "../db/database";
import { getSectionListData, useUpdateEffect } from "../utils";
import debounce from "lodash.debounce";

const API_URL =
  "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";
const sections = ["starters", "mains", "desserts"];

export default function Home() {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [searchBarText, setSearchBarText] = useState("");
  const [query, setQuery] = useState("");
  const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false)
  );

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

      <View>
        <Text style={styles.orderTxt}>ORDER FOR DELIVERY!</Text>

        <Filters
          selections={filterSelections}
          onChange={handleFiltersChange}
          sections={sections}
        />

        <SectionList
          style={styles.sectionList}
          sections={data}
          keyExtractor={(item, index) => item.id || index}
          renderItem={({ item }) => (
            <View style={styles.menuInfo}>
              <Text style={styles.menuTitle}>{item.name}</Text>
              <Text style={styles.menuPrice}>${item.price}</Text>
              <Text style={styles.menuDescription}>{item.description}</Text>
              <Image
                style={styles.imgDish}
                source={{
                  uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`,
                }}
              />
            </View>
          )}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 0.5,
                width: "90%",
                backgroundColor: "grey",
                alignSelf: "center",
              }}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionList: {
    paddingHorizontal: 12,
  },
  sectionHeader: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
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
    fontSize: 18,
    textAlign: "center",
  },
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuInfo: { flex: 1 },
  imgDish: {
    resizeMode: "contain",
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
  filterScrollView: { marginTop: 20, display: "flex" },
  filterButton: {
    color: "black",
    borderRadius: 10,
    marginRight: 12,
  },
  filterButtonText: {
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
});
