import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Tabs } from "expo-router";

export default function TabsLayout() {
  return(
    <Tabs screenOptions=
    {
      { 
        tabBarStyle: { backgroundColor: "#1b263b", 
          paddingVertical: 10, 
          paddingHorizontal: 10,
          height: 55,
          borderRadius: 30,           
          marginHorizontal: 60,       
          position: 'absolute',       
          bottom: 20,                
          borderTopWidth: 0,         
          elevation: 5,               
          shadowColor: '#000000ff',        
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84, }, 
        tabBarActiveTintColor: "#e0e1dd", 
        tabBarInactiveTintColor: "#415a77"
      }
      
    }>
      <Tabs.Screen 
        name="index" 
        options={{ title: "Home", headerShown: false, tabBarIcon: ({ color, size }) => <AntDesign name="home" size={size} color={color} /> }}
      />
      <Tabs.Screen 
        name="add_habit" 
        options={{ title: "Habit",headerShown: false, tabBarIcon: ({ color, size }) => <AntDesign name="plus" size={size} color={color} /> }}
      />
      <Tabs.Screen 
        name="social" 
        options={{ title: "Social", headerShown: false, tabBarIcon: ({ color, size }) => <AntDesign name="team" size={size} color={color} /> }}
      />
      <Tabs.Screen 
        name="statistics" 
        options={{ title: "Statistics", headerShown: false, tabBarIcon: ({ color, size }) => <AntDesign name="line-chart" size={size} color={color} /> }}
      />
      <Tabs.Screen 
        name="settings" 
        options={{ title: "Settings", headerShown: false, tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} /> }}
      />
    </Tabs>
  )
}
