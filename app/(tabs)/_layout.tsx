import { Stack, Tabs } from "expo-router";

export default function TabsLayout() {
  return(
    <Tabs>
      <Stack.Screen 
        name="index" 
        options={{ title: "Home" }} 
      />
      <Stack.Screen 
        name="login" 
        options={{ title: "Login" }} 
      />
    </Tabs>
  )
}
