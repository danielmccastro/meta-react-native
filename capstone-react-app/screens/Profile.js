import React, { useState, useEffect } from "react";
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

const notificationPrefState = {
  orderStatus: true,
  password: true,
  offers: true,
  newsletter: true,
};

export default function Profile() {
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [notificationPref, setNotificationPref] = useState(
    notificationPrefState
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const setProfileValues = async (userAsyncStorage) => {
    const { firstName, email, lastName, phoneNumber, notificationPref } =
      userAsyncStorage;
    setFirstName(firstName);
    setLastName(lastName || null);
    setEmail(email);
    setPhoneNumber(phoneNumber || null);
    setNotificationPref(notificationPref || notificationPrefState);
  };

  const loadProfileData = async () => {
    try {
      const jsonString = await AsyncStorage.getItem("user");
      if (!jsonString) return;
      await setProfileValues(JSON.parse(jsonString));
    } catch (error) {
      console.log("Error loading profile data:", error);
      return;
    }
  };

  const pickFirstLetter = (firstName, lastName) => {
    const avatarText = "";
    firstName && lastName !== null
      ? (avatarText = firstName.charAt(0) + lastName.charAt(0))
      : null;
    console.log(avatarText);
    return avatarText;
  };

  useEffect(() => {
    pickFirstLetter(firstName, lastName);
    console.log(avatarText);
  }, []);

  const updateNotificationPref = (key, value) => {
    setNotificationPref((prev) => ({ ...prev, [key]: value }));
  };
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
            style={styles.img}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.headerText}>Personal information</Text>
          <Text style={styles.labelText}>Avatar</Text>
          <Text style={styles.labelText}>First Name</Text>
          <TextInput
            style={styles.inputBox}
            keyboardType="default"
            textContentType="none"
            /* value={} get from asyncstorage*/
          />
          <Text style={styles.labelText}>Last Name</Text>
          <TextInput
            style={styles.inputBox}
            keyboardType="default"
            textContentType="none"
          />
          <Text style={styles.labelText}>Email</Text>
          <TextInput
            style={styles.inputBox}
            keyboardType="default"
            textContentType="none"
            /* value={} get from asyncstorage*/
          />
          <Text style={styles.labelText}>Phone number</Text>
          <TextInput
            style={styles.inputBox}
            keyboardType="default"
            textContentType="none"
          />
          <Text style={styles.headerText}>Email notifications</Text>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={notificationPrefState.orderStatus}
              onValueChange={(value) =>
                updateNotificationPref("orderStatus", value)
              }
              style={styles.checkbox}
            />
            <Text style={styles.notificationText}>Order Statuses</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={notificationPrefState.password}
              onValueChange={(value) =>
                updateNotificationPref("password", value)
              }
              style={styles.checkbox}
            />
            <Text style={styles.notificationText}>Password changes</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={notificationPrefState.offers}
              onValueChange={(value) => updateNotificationPref("offers", value)}
              style={styles.checkbox}
            />
            <Text style={styles.notificationText}>Special offers</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={notificationPrefState.newsletter}
              onValueChange={(value) =>
                updateNotificationPref("newsletter", value)
              }
              style={styles.checkbox}
            />
            <Text style={styles.notificationText}>Newsletter</Text>
          </View>
          <Pressable style={styles.logoutBtn}>
            <Text style={styles.logoutText}>Log out</Text>
          </Pressable>
          <View style={styles.btnContainer}>
            <Pressable style={styles.changesBtn}>
              <Text style={styles.changesText}>Discard changes</Text>
            </Pressable>
            <Pressable style={styles.changesBtn}>
              <Text style={styles.changesText}>Save changes</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 30 },
  header: {
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    paddingVertical: 35,
    resizeMode: "contain",
  },
  avatar: {
    height: 50,
    backgroundColor: "black",
  },
  avatarText: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
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
