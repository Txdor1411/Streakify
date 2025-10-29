// app/(tabs)/index.tsx
import { signOut } from "firebase/auth";
import { Button, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../lib/firebaseConfig";

export default function TabsHome() {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // _layout.tsx will automatically redirect to /auth/login
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome, {user?.email ?? "User"}!
      </Text>
      <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
