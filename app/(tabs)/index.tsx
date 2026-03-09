import { useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { useAuth } from "@/lib/auth-context";

export default function Index() {
  const { signOutUser, user } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await signOutUser();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <View style={styles.view}>
      <Text style={styles.title}>Streakify</Text>
      <Text style={styles.subtitle}>You are signed in as:</Text>
      <Text style={styles.email}>{user?.email ?? "Unknown user"}</Text>

      <Pressable
        disabled={isLoggingOut}
        onPress={handleLogout}
        style={[styles.button, isLoggingOut && styles.buttonDisabled]}
      >
        {isLoggingOut ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Log out</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles= StyleSheet.create({
  view:{
    backgroundColor: "#fffdf9",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    color: "#252525",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 12,
  },
  subtitle: {
    color: "#6f625b",
    fontSize: 16,
    marginBottom: 8,
  },
  email: {
    color: "#3b2a20",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 28,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#ff6f61",
    borderRadius: 10,
    minWidth: 160,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});