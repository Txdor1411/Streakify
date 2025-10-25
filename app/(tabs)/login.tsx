import { StyleSheet, Text, View } from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.Login}>
    <Text style={{ color: "#0d1b2a", fontSize: 25, fontWeight: "bold" }}>Login Screen</Text>
    </View>
  );
}
const styles= StyleSheet.create({
  Login:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e1dd",
  },
});