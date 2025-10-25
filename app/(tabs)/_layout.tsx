import AntDesign from '@expo/vector-icons/AntDesign';
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return(
    <Tabs screenOptions={{ tabBarStyle: { backgroundColor: "#1b263b" }, tabBarActiveTintColor: "#e0e1dd", tabBarInactiveTintColor: "#415a77" }}>
      <Tabs.Screen 
        name="index" 
        options={{ title: "Home", headerShown: false, tabBarIcon: ({ color, size }) => <AntDesign name="home" size={size} color={color} /> }}
      />
      <Tabs.Screen 
        name="login" 
        options={{ title: "Login",headerShown: false, tabBarIcon: ({ color, size }) => <AntDesign name="login" size={size} color={color} /> }}
      />
    </Tabs>
  )
}
