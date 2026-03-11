import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from "expo-router";




export default function TabsLayout() {
  return(

    <Tabs screenOptions={{tabBarActiveTintColor: "coral"}}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          headerShown: false,
          title: "Home", 
          tabBarIcon:({color}) =>(
            <MaterialIcons name="home" size={24} color={color} />
        ), 
      }} 
      />
            <Tabs.Screen 
        name="add_habit" 
        options={{ 
          headerShown: false,
          title: "Add Habit", 
          tabBarIcon:({color}) =>(
            <AntDesign name="plus" size={24} color="black" />
        ), 
      }} 
      />
    </Tabs>
  )
}
