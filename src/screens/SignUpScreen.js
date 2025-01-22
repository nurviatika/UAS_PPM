import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";
import Icon from "react-native-vector-icons/Ionicons"; 

const SignUpScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

  const handleSignUp = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Semua kolom harus diisi!");
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("Error", "Email harus mengandung '@'!");
      return;
    }

    if (password.length < 8) { 
      Alert.alert("Error", "Password harus memiliki minimal 8 karakter!");
      return;
    }

    if (confirmPassword.length < 8) {
      Alert.alert("Error", "Confirm password harus memiliki minimal 8 karakter!");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Password dan Confirm Password tidak cocok!");
      return;
    }

    try {
      console.log("Mencoba membuat akun...");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("Akun berhasil dibuat:", user.uid);

      await setDoc(doc(firestore, "users", user.uid), {
        fullName,
        email,
        createdAt: new Date(),
      });

      Alert.alert("Success", `Welcome, ${fullName}! Akun Anda berhasil dibuat.`);
      navigation.navigate("SignIn");
    } catch (error) {
      console.error("Firebase Error:", error.code, error.message);
      switch (error.code) {
        case "auth/email-already-in-use":
          Alert.alert("Error", "Email sudah terdaftar. Gunakan email lain.");
          break;
        case "auth/invalid-email":
          Alert.alert("Error", "Format email tidak valid.");
          break;
        case "auth/network-request-failed":
          Alert.alert("Error", "Masalah jaringan. Periksa koneksi internet Anda.");
          break;
        default:
          Alert.alert("Error", error.message || "Gagal membuat akun.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={[styles.input, { color: "#ab6d5e" }]}
        placeholder="Full Name"
        placeholderTextColor="#B0B0B0"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={[styles.input, { color: "#ab6d5e" }]}
        placeholder="Email"
        placeholderTextColor="#B0B0B0"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
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

      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, { color: "#ab6d5e" }]}
          placeholder="Confirm Password"
          placeholderTextColor="#B0B0B0"
          secureTextEntry={!showConfirmPassword} 
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Icon
            name={showConfirmPassword ? "eye-off" : "eye"}
            size={24}
            color="#B0B0B0"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
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
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SignUpScreen;
