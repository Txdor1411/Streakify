import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.view}>
      <Text style={{ color: "#0d1b2a", fontSize: 25, fontWeight: "bold" }}>
        Home screen
      </Text>
    </View>
  );
}

const styles= StyleSheet.create({
  view:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e1dd",
  },
  navButton:{
    width:100, 
        height:20, 
        backgroundColor: "coral", 
        borderRadius: 8,
        textAlign: "center",
  },
});