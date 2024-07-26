import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  ImageBackground,
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Share,
} from "react-native";
import { Switch } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
const CustomDrawer = (props: any) => {
  const handleLogout = () => {
    Alert.alert(
      "Log out",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => Logout(),
        },
      ],
      { cancelable: false }
    );
  };

  const shareApp = async ()=>{
    try{
    const result = await Share.share({
        message: "Check out the new cool e-commerce app with free Delivery, More Discounts and Ships across the world"
    })
    if (result.action === Share.sharedAction) {
        console.log("ACTION", result);
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  }

  const Logout = async ()=>{
    await AsyncStorage.clear();
    router.replace("/(auth)")
  }
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          backgroundColor: "#9288F9",
          marginTop: -50,
          zIndex: 10,
        }}
      >
        <ImageBackground
          source={require("../../assets/images/bg.jpg")}
          style={{ padding: 20 }}
        >
          <Image
            alt="Not find"
            source={require("../../assets/images/deadpool.png")}
            style={styles.userAvatar}
          />
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              marginBottom: 5,
              fontFamily: "Poppins_600SemiBold"
            }}
          >
            Mr. Deadpool
          </Text>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: "#ccc",
          // backgroundColor: colors.cardbackground,
        }}
      >
        <Text style={styles.preferences}>Preferences</Text>
        <View style={styles.switchTextContainer}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor="#f4f3f4"
            style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
          />
          <Text
            style={{
              fontSize: 15,
            }}
          >
            Dark Theme
          </Text>
        </View>
      </View>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <TouchableOpacity onPress={shareApp} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,

                marginLeft: 5,
              }}
            >
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ paddingVertical: 15 }}
          onPress={() => handleLogout()}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,

                marginLeft: 5,
              }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  userAvatar: {
    height: 67.5,
    width: 67.5,
    borderRadius: 40,
    marginBottom: 10,
    marginTop: 30,
    backgroundColor: "#fff",
    resizeMode: "contain",
  },
  switchTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 7,
    paddingVertical: 5,
  },
  preferences: {
    fontSize: 16,
    color: "#ccc",
    paddingTop: 10,
    fontWeight: "500",
    paddingLeft: 20,
  },
  switchText: {
    fontSize: 17,
    color: "",
    paddingTop: 10,
    fontWeight: "bold",
  },
});
