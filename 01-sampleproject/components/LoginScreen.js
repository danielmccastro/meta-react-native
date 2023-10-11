import { useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";

export default function LoginScreen() {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Welcome to Little Lemon</Text>
      {isLoggedIn === true ? (
        <Text style={styles.regularText}>You are logged in!</Text>
      ) : (
      <>
      <Text style={styles.regularText}>Login to continue </Text>
      <TextInput
        style={styles.input}
        placeholder="email"
        value={email}
        onChange={onChangeEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        value={password}
        onChange={onChangePassword}
        keyboardType={"default"}
        secureTextEntry={true}
      />
        <Pressable style={styles.loginButton} onPress={() => setIsLoggedIn(!isLoggedIn)}>
          <Text style={buttonText}>Log in</Text>
        </Pressable>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    padding: 40,
    fontSize: 30,
    color: "#EDEFEE",
    textAlign: "center",
  },
  regularText: {
    fontSize: 24,
    padding: 20,
    marginVertical: 8,
    color: "#EDEFEE",
    textAlign: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: "#EDEFEE",
    backgroundColor: "#EDEFEE",
  },
  loginButton: {
    fontSize: 22,
    padding: 10,
    marginVertical: 8,
    margin: 100,
    backgroundColor: '#EE9972',
    borderColor: '#EE9972',
    borderWidth: 2,
    borderRadius: 50,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 25,
  }
});