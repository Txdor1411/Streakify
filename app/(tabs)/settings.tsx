import { useRouter } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { logout } from "../../services/authService";

export default function SettingsScreen() {
  const router = useRouter();

  const onLogout = async () => {
    Alert.alert(
      "Log out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log out",
          style: "destructive",
          onPress: async () => {
            try {
              await logout();
              router.replace("/(auth)/login");
            } catch (e) {
              Alert.alert("Error", "Could not log out.");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutText}>Log out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0e1dd",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#b00020",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 16,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },
});
