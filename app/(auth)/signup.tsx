import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { signUp } from "../authService";

export default function SignUpScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const router = useRouter();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await signUp(email, password);
      router.replace("/Home");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.logo}
          />
        </View>
        <Text style={styles.title}>Create Your{"\n"}Breezify Account</Text>

      {/* Form */}
      <View style={styles.formCard}>
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#999"
          style={styles.input}
        />
        <TextInput
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#999"
          autoCapitalize="none"
          keyboardType="email-address"
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
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholderTextColor="#999"
          style={styles.input}
        />

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Log In */}
      <Text style={styles.loginText}>
        Already have an account?{" "}
        <Text style={styles.loginLink} onPress={() => router.push("../login")}>
          Log In
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
  },
  title: {
    fontSize: 29,
    fontWeight: "700",
    color: "#2C3A2D",
    textAlign: "center",
    fontFamily: "System",
    marginBottom: 20,
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
    marginBottom: 20,
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
  signUpButton: {
    backgroundColor: "#2C7A59",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  signUpText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
  loginText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    width: "100%",
    flexWrap: "nowrap",
  },
  loginLink: {
    color: "#2C7A59",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});