import { Tabs } from "expo-router";
import { HomeIcon, ShoppingCart, Search } from "lucide-react-native";
export default function TabLayout() {
  return (
   <Tabs screenOptions={{
    tabBarActiveTintColor: '#19c563',
    tabBarInactiveTintColor: 'gray',
   }}>
    <Tabs.Screen name="index"  options={{title: "Home",
      tabBarIcon: ({focused})=><HomeIcon size={25} color={focused ? "#19c563" : "black"}/>}}/>
    <Tabs.Screen name="search"  options={{title: "Search", tabBarIcon: ({focused})=><Search size={25} color={focused ? "#19c563" : "black"}/>}}/>
    <Tabs.Screen name="cart"  options={{title: "Cart", tabBarIcon: ({focused})=><ShoppingCart size={25} color={focused ? "#19c563" : "black"}/>}}/>
   </Tabs>
  );
}