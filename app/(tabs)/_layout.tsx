import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Tabs } from "expo-router";
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTheme } from "../ThemeProvider";

export default function TabsLayout() {
  const { dark } = useTheme();


  console.log("TabsLayout: dark =", dark);

  const tabBarBg = dark ? "#080c16ff" : "#1b263b";
  const tabBarActive = dark ? "#e0e1dd" : "#e0e1dd";
  const tabBarInactive = dark ? "#9ca3af" : "#415a77";
  const outerBg = dark ? "#05060a" : "#e0e1dd";

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: outerBg }}>
        <View
          style={{
            position: 'absolute',
            left: 60,
            right: 60,
            bottom: 30,
            height: 55,
            borderRadius: 30,
            backgroundColor: tabBarBg,
            elevation: 18,
            zIndex: 9998,
          }}
        />
        <Tabs
          screenOptions={() => ({
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: 'transparent',
              paddingVertical: 10,
              paddingHorizontal: 10,
              paddingBottom: 9,
              paddingTop: 6,
              height: 55,
              borderRadius: 30,
              marginHorizontal: 60,
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 30,
              borderTopWidth: 0,
              elevation: 5,
              shadowColor: "#000000ff",
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              zIndex: 0,
            },
            tabBarActiveTintColor: "#e0e1dd",
            tabBarInactiveTintColor: "#415a77",
          })}
        >
          <Tabs.Screen
            name="index"
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size, focused }) =>
                focused ? (
                  <AntDesign name="home" size={size + 5} color={color} />
                ) : (
                  <AntDesign name="home" size={size} color={color} />
                ),
            }}
          />

          <Tabs.Screen
            name="add_habit"
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size, focused }) =>
                focused ? (
                  <AntDesign name="plus" size={size + 5} color={color} />
                ) : (
                  <AntDesign name="plus" size={size} color={color} />
                ),
            }}
          />

          <Tabs.Screen
            name="social"
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size, focused }) =>
                focused ? (
                  <AntDesign name="team" size={size + 5} color={color} />
                ) : (
                  <AntDesign name="team" size={size} color={color} />
                ),
            }}
          />

          <Tabs.Screen
            name="statistics"
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size, focused }) =>
                focused ? (
                  <AntDesign name="line-chart" size={size + 5} color={color} />
                ) : (
                  <AntDesign name="line-chart" size={size} color={color} />
                ),
            }}
          />

          <Tabs.Screen
            name="settings"
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size, focused }) =>
                focused ? (
                  <Ionicons
                    name="settings-outline"
                    size={size + 5}
                    color={color}
                  />
                ) : (
                  <Ionicons
                    name="settings-outline"
                    size={size}
                    color={color}
                  />
                ),
            }}
          />
        </Tabs>
      </View>
    </SafeAreaProvider>
  );
}
