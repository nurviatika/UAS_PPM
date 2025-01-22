import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import Icon from "react-native-vector-icons/Ionicons";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const navigation = useNavigation();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email dan password tidak boleh kosong!");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Error", "Password minimal 8 karakter!");
      return;
    }

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Login berhasil!");
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Firebase Error: ", error);
      switch (error.code) {
        case "auth/user-not-found":
          Alert.alert("Error", "Akun tidak ditemukan!");
          break;
        case "auth/wrong-password":
          Alert.alert("Error", "Password salah!");
          break;
        default:
          Alert.alert("Error", error.message || "Gagal login!");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TO DO LIST</Text>

      <TextInput
        style={[styles.input, { color: "#ab6d5e" }]} 
        placeholder="Email"
        placeholderTextColor="#B0B0B0"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, { color: "#ab6d5e" }]} 
          placeholder="Password"
          placeholderTextColor="#B0B0B0"
          secureTextEntry={!showPassword} 
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)} 
        >
          <Icon
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="#B0B0B0"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>SIGN IN</Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>
        Don’t have an account?{" "}
        <Text style={styles.signupLink} onPress={() => navigation.navigate("SignUp")}>
          Sign up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#F79E89",
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 15,
  },
  passwordContainer: {
    width: "100%",
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 20,
    top: 12,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#F79E89",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupText: {
    color: "#606060",
    fontSize: 14,
  },
  signupLink: {
    color: "#F79E89",
    fontWeight: "bold",
  },
});

export default SignInScreen;
