import { StyleSheet, Text, View } from "react-native";

export default function Social() {
    return (
  <View style={styles.Social}>
    <Text style={{ color: "#0d1b2a", fontSize: 25, fontWeight: "bold" }}>
        Social screen
    </Text>
  </View>
    );
}

const styles= StyleSheet.create({
  Social:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e1dd",
  },
});