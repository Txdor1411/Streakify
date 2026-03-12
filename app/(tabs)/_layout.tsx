import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
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
            <Feather name="home" size={24} color="black" />
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

       <Tabs.Screen 
        name="social" 
        options={{ 
          headerShown: false,
          title: "Social", 
          tabBarIcon:({color}) =>(
            <Feather name="users" size={24} color="black" />
        ), 
      }} 
      />

             <Tabs.Screen 
        name="statistics" 
        options={{ 
          headerShown: false,
          title: "Statistics", 
          tabBarIcon:({color}) =>(
            <Feather name="bar-chart-2" size={24} color="black" />

            
        ), 
      }} 
      />

             <Tabs.Screen 
        name="settings" 
        options={{ 
          headerShown: false,
          title: "Settings", 
          tabBarIcon:({color}) =>(
            <AntDesign name="setting" size={24} color="black" />
        ), 
      }} 
      />
    </Tabs>
  )
}
