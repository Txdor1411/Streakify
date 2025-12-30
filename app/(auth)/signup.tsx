import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { signup } from "../../services/authService";

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    if (!email || !password || !confirm) {
      Alert.alert("Missing info", "Please fill all fields.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Weak password", "Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      Alert.alert("No match", "Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await signup(email, password);
      router.replace("/(tabs)");
    } catch (e: any) {
      Alert.alert("Signup failed", e?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
      />

      <Pressable
        style={[styles.button, loading && { opacity: 0.6 }]}
        disabled={loading}
        onPress={onSignup}
      >
        <Text style={styles.buttonText}>{loading ? "Creating..." : "Create account"}</Text>
      </Pressable>

      <Pressable onPress={() => router.replace("/(auth)/login")}>
        <Text style={styles.link}>
          Already have an account? <Text style={styles.linkBold}>Log in</Text>
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#e0e1dd" },
  title: { fontSize: 32, fontWeight: "800", marginBottom: 20, color: "#0d1b2a" },
  input: {
    borderWidth: 1,
    borderColor: "#0d1b2a",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#415A77",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 6,
  },
  buttonText: { color: "#e0e1dd", fontSize: 16, fontWeight: "800" },
  link: { marginTop: 14, color: "#0d1b2a", textAlign: "center" },
  linkBold: { fontWeight: "900" },
});
