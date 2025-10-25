import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Tabs } from "expo-router";
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function TabsLayout() {
  return(
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <Tabs screenOptions=
        {{ 
          tabBarShowLabel: false,
          tabBarStyle: { 
            backgroundColor: "#1b263b", 
            paddingVertical: 10, 
            paddingHorizontal: 10,
            paddingBottom: 1,
            paddingTop: 6,
            height: 55,
            borderRadius: 30,           
            marginHorizontal: 60,       
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 30,                // Increased for Samsung devices
            borderTopWidth: 0,         
            elevation: 5,               
            shadowColor: '#000000ff',        
            shadowOffset: {
              width: 2,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            zIndex: 0,
          }, 
          tabBarActiveTintColor: "#e0e1dd", 
          tabBarInactiveTintColor: "#415a77"
        }}>
      <Tabs.Screen 
        name="index" 
        options={{  headerShown: false, tabBarIcon: ({ color, size }) => <AntDesign name="home" size={size} color={color} /> }}
      />
      <Tabs.Screen 
        name="add_habit" 
        options={{  headerShown: false, tabBarIcon: ({ color, size }) => <AntDesign name="plus" size={size} color={color} /> }}
      />
      <Tabs.Screen 
        name="social" 
        options={{  headerShown: false, tabBarIcon: ({ color, size }) => <AntDesign name="team" size={size} color={color}  /> }}
      />
      <Tabs.Screen 
        name="statistics" 
        options={{  headerShown: false, tabBarIcon: ({ color, size }) => <AntDesign name="line-chart" size={size} color={color} /> }}
      />
      <Tabs.Screen 
        name="settings" 
        options={{  headerShown: false, tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} /> }}
      />
    </Tabs>
      </View>
    </SafeAreaProvider>
  )
}
