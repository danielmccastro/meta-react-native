import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import Checkbox from "expo-checkbox";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppContext from "../context/AppContext";
import { useNavigation } from "@react-navigation/native";
import {
  validateEmail,
  validateFirstName,
  validatePhoneNumber,
} from "../utils";
import { removeDatabase } from "../db/database";

const notificationPrefState = {
  orderStatus: true,
  password: true,
  offers: true,
  newsletter: true,
};

export default function Profile() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState("");
  const [notificationPref, setNotificationPref] = useState(
    notificationPrefState
  );

  const { userLogout, updateUser } = useContext(AppContext);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      updateUser({ image: image });
    }
  };

  const clearImage = async () => {
    setImage(null);
  };

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
      setEmail(user.email || "");
      setPhoneNumber(user.phoneNumber || "");
      setNotificationPref(user.notificationPref || notificationPrefState);
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

  const saveProfileChanges = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      alert("Invalid phone number format.");
      return;
    }
    if (!validateEmail(email)) {
      alert("Invalid email format.");
      return;
    }
    if (!validateFirstName(firstName)) {
      alert("Invalid name format.");
      return;
    }
    try {
      updateUser({
        firstName,
        lastName,
        email,
        phoneNumber,
        notificationPref,
        image,
      });
      navigation.replace("Home");
    } catch (error) {
      alert("An error has occured.");
      console.log(error);
    }
  };

  const discardProfileChanges = async () => {
    loadProfileData();
    alert("All changes have been discarded.");
  };

  const updateNotificationPref = (key, value) => {
    setNotificationPref((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    loadProfileData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.navigate("Home")}
          style={styles.returnButton}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Image
          source={require("../assets/Logo.png")}
          accessible={true}
          accessibilityLabel={"Little Lemon Logo"}
          style={styles.img}
        />
        <Pressable onPress={pickImage} style={styles.returnButton}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImg} />
          ) : (
            <Text>{getInitials(firstName, lastName)}</Text>
          )}
        </Pressable>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.headerText}>Personal information</Text>

          <Text style={styles.labelText}>Avatar</Text>
          <View style={styles.avatarSection}>
            <Pressable onPress={pickImage} style={styles.avatarBtn}>
              {image ? (
                <Image source={{ uri: image }} style={styles.profileImg} />
              ) : (
                <Text>{getInitials(firstName, lastName)}</Text>
              )}
            </Pressable>

            <Pressable style={styles.changeImageBtn} onPress={pickImage}>
              <Text style={styles.changesText}>Change</Text>
            </Pressable>
            <Pressable style={styles.removeImageBtn} onPress={clearImage}>
              <Text style={styles.changesText}>Remove</Text>
            </Pressable>
          </View>

          <Text style={styles.labelText}>First Name</Text>
          <TextInput
            style={styles.inputBox}
            keyboardType="default"
            textContentType="none"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />
          <Text style={styles.labelText}>Last Name</Text>
          <TextInput
            style={styles.inputBox}
            keyboardType="default"
            textContentType="none"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />
          <Text style={styles.labelText}>Email</Text>
          <TextInput
            style={styles.inputBox}
            keyboardType="default"
            textContentType="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Text style={styles.labelText}>Phone number</Text>
          <TextInput
            style={styles.inputBox}
            keyboardType="default"
            textContentType="none"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
          <Text style={styles.headerText}>Email notifications</Text>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={notificationPref.orderStatus}
              onValueChange={(value) =>
                updateNotificationPref("orderStatus", value)
              }
              style={styles.checkbox}
            />
            <Text style={styles.notificationText}>Order Statuses</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={notificationPref.password}
              onValueChange={(value) =>
                updateNotificationPref("password", value)
              }
              style={styles.checkbox}
            />
            <Text style={styles.notificationText}>Password changes</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={notificationPref.offers}
              onValueChange={(value) => updateNotificationPref("offers", value)}
              style={styles.checkbox}
            />
            <Text style={styles.notificationText}>Special offers</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={notificationPref.newsletter}
              onValueChange={(value) =>
                updateNotificationPref("newsletter", value)
              }
              style={styles.checkbox}
            />
            <Text style={styles.notificationText}>Newsletter</Text>
          </View>
          <Pressable
            style={styles.logoutBtn}
            onPress={() => userLogout() && removeDatabase()}
          >
            <Text style={styles.logoutText}>Log out</Text>
          </Pressable>
          <View style={styles.btnContainer}>
            <Pressable
              style={styles.changesBtn}
              onPress={discardProfileChanges}
            >
              <Text style={styles.changesText}>Discard changes</Text>
            </Pressable>
            <Pressable style={styles.changesBtn} onPress={saveProfileChanges}>
              <Text style={styles.changesText}>Save changes</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 45,
    paddingBottom: 15,
  },
  returnButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    resizeMode: "contain",
  },
  profileImg: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  avatarSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  avatarBtn: {
    display: "flex",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
  },
  changeImageBtn: {
    backgroundColor: "#495E57",
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  removeImageBtn: {
    backgroundColor: "#FF7276",
    padding: 10,
    borderWidth: 1,
    borderColor: "#495E57",
  },
  content: {
    flex: 1,
    borderTopColor: "#EDEFEE",
    borderStyle: "solid",
    borderTopWidth: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    margin: 10,
  },
  labelText: {
    marginTop: 10,
    marginLeft: 15,
    fontSize: 12,
    color: "gray",
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
    marginLeft: 15,
  },
  notificationText: {
    marginTop: 10,
    marginLeft: 15,
    fontSize: 14,
    color: "gray",
    fontWeight: "bold",
  },
  inputBox: {
    height: 40,
    padding: 10,
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 16,
    borderColor: "#EDEFEE",
  },
  footer: {
    alignItems: "flex-end",
  },
  btn: {
    marginEnd: 50,
    marginVertical: 30,
    backgroundColor: "#495E57",
    borderRadius: 10,
    padding: 7,
    paddingHorizontal: 30,
  },
  disabledBtn: {
    marginEnd: 50,
    marginVertical: 30,
    backgroundColor: "grey",
    opacity: 0.5,
    padding: 7,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  logoutBtn: {
    backgroundColor: "#F4CE14",
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
  },
  logoutText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  changesBtn: {
    backgroundColor: "#495E57",
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
  },
  changesText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "#EDEFEE",
  },
});
