import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs, useRouter } from "expo-router";
import { useEffect } from "react";

function RouteGuard({children}: {children: React.ReactNode}) {

  const router = useRouter();
  const isAuth = false;

  useEffect(()=>{
    if(!isAuth){
      router.replace("/auth");
    }
  });

  return <>{children}</>
}




export default function TabsLayout() {
  return(
    <RouteGuard>
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
    </RouteGuard>
  )
}
