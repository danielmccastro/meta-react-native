import React, { useState } from "react";
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

export default function Profile() {
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
          <Text style={styles.notificationText}>Order Statuses</Text>
          <Text style={styles.notificationText}>Password changes</Text>
          <Text style={styles.notificationText}>Special offers</Text>
          <Text style={styles.notificationText}>Newsletter</Text>
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
