import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from "expo-router";





export default function TabsLayout() {
  return(

    <Tabs screenOptions={{tabBarActiveTintColor: "coral"}}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: "Home", 
          tabBarIcon:({color}) =>(
            <MaterialIcons name="home" size={24} color={color} />
        ), 
      }} 
      />
      <Tabs.Screen 
        name="login" 
        options={{ title: "Login" }} 
      />
    </Tabs>
  )
}
