import { Link } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { mapAuthError } from "@/lib/auth";
import { useAuth } from "@/lib/auth-context";

export default function SignupScreen() {
  const { signUpUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorText, setErrorText] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async () => {
    if (!email.trim() || !password || !confirmPassword) {
      setErrorText("All fields are required.");
      return;
    }

    if (password.length < 6) {
      setErrorText("Password should be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorText("Passwords do not match.");
      return;
    }

    setErrorText(null);
    setIsSubmitting(true);

    try {
      await signUpUser(email, password);
    } catch (error) {
      setErrorText(mapAuthError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create account</Text>
      <Text style={styles.subheading}>Build your streak one day at a time.</Text>

      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="#9e8b7f"
        style={styles.input}
        value={email}
      />
      <TextInput
        autoCapitalize="none"
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="#9e8b7f"
        secureTextEntry
        style={styles.input}
        value={password}
      />
      <TextInput
        autoCapitalize="none"
        onChangeText={setConfirmPassword}
        placeholder="Confirm password"
        placeholderTextColor="#9e8b7f"
        secureTextEntry
        style={styles.input}
        value={confirmPassword}
      />

      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}

      <Pressable
        disabled={isSubmitting}
        onPress={handleSignup}
        style={[styles.primaryButton, isSubmitting && styles.disabledButton]}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.primaryButtonText}>Sign up</Text>
        )}
      </Pressable>

      <Link href="/(auth)/login" style={styles.link}>
        Already have an account? Log in
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    backgroundColor: "#fff7ef",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  heading: {
    color: "#23160f",
    fontSize: 36,
    fontWeight: "800",
    marginBottom: 8,
  },
  subheading: {
    color: "#705c4d",
    fontSize: 16,
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#ffffff",
    borderColor: "#f0ddd2",
    borderRadius: 10,
    borderWidth: 1,
    color: "#23160f",
    fontSize: 16,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  error: {
    color: "#b42318",
    marginBottom: 12,
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: "#ff6f61",
    borderRadius: 10,
    marginBottom: 18,
    paddingVertical: 12,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledButton: {
    opacity: 0.65,
  },
  link: {
    color: "#a54d35",
    fontSize: 15,
    textAlign: "center",
  },
});