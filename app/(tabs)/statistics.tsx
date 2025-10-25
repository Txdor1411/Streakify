import { StyleSheet, Text, View } from "react-native";

export default function Statistics() {
  return (
    <View style={styles.Statistics}>
      <Text style={{ color: "#0d1b2a", fontSize: 25, fontWeight: "bold" }}>
        Statistics screen
      </Text>
    </View>
  );
}
const styles= StyleSheet.create({
  Statistics:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e1dd",
  },
});