import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { login } from "../../services/authService";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing info", "Please enter email and password.");
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      router.replace("/(tabs)");
    } catch (e: any) {
      Alert.alert("Login failed", e?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in</Text>

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

      <Pressable
        style={[styles.button, loading && { opacity: 0.6 }]}
        disabled={loading}
        onPress={onLogin}
      >
        <Text style={styles.buttonText}>{loading ? "Logging in..." : "Log in"}</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/(auth)/signup")}>
        <Text style={styles.link}>
          Don&apos;t have an account? <Text style={styles.linkBold}>Sign up</Text>
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
