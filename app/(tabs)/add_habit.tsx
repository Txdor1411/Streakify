import { StyleSheet, Text, View } from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.Habbit}>
    <Text style={{ color: "#0d1b2a", fontSize: 25, fontWeight: "bold" }}>Here you add habits</Text>
    </View>
  );
}
const styles= StyleSheet.create({
  Habbit:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e1dd",
  },
});