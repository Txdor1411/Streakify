import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { logIn } from "../authService"; // ajustează calea dacă e nevoie

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleLogin = async () => {
    console.log("Trying login with:", email, password);
    try {
      const userCredential = await logIn(email, password);
      console.log("Login successful:", userCredential.user.email);
      router.replace("/(tabs)");
    } catch (error: any) {
      console.log("Login failed:", error.message);
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo and title */}
      <View style={styles.logoContainer}>
          <Image
            source={require("@/assets/images/logo.png")} // your logo image
            style={styles.logo}
          />
        <Text style={styles.title}>Login To Breezify</Text>
      </View>

      {/* Form card */}
      <View style={styles.formCard}>
        <TextInput
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="#999"
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#999"
          style={styles.input}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom link */}
      <Text style={styles.signupText}>
        Don’t have an account?{" "}
        <Text
          style={styles.signupLink}
          onPress={() => router.push("/signup")}
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: "#E8F0E4",
    alignItems: "center",
    justifyContent: "flex-start", 
    paddingTop: 30,              
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 140,
    height: 140,
    resizeMode: "contain",
    marginBottom: 10,
  },
  title: {
    fontSize: 29,
    fontWeight: "700",
    color: "#2C3A2D",
    textAlign: "center",
    marginBottom: 10,
  },
  formCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
  },
  loginButton: {
    backgroundColor: "#2C7A59",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 5,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  loginText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
  forgotPassword: {
    textAlign: "center",
    color: "#555",
    marginTop: 10,
    textDecorationLine: "underline",
    fontSize: 14,
  },
  signupText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    width: "100%",
    flexWrap: "nowrap",
  },
  signupLink: {
    color: "#2C7A59",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});