import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import CustomDrawer from '@/components/shared/custom-drawer';
export default function HomeLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={(props)=> <CustomDrawer {...props}/>}>
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Home',
            title: 'Home'
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}



