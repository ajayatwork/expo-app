import { request } from "../utils/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const getProfile = async () => {
  const token = await AsyncStorage.getItem('token');
  console.log("TOKEN", token);
  const response = await request({
    path: "profile",
    method: "GET",
    headers: {
      "x-access-token": token,
    },
  });
  return response;
};

export const updateProfile = async (userData)=>{
  const token = await AsyncStorage.getItem("token");
  const response = await request({
    path: "profile/edit",
    method: "PUT",
    headers: {
      "x-access-token": token,
      "content-type": "multipart/form-data",
    },
    body: { first_name: userData.first_name, last_name: userData.last_name, email: userData.email, profile_pic: userData.profile_pic, dob: userData.dob, country_code:userData.country_code, phone_number: userData.phone_number, address: userData.address },
  });
  return response;
}