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
  let form_data = new FormData();
  form_data.append("first_name", userData.first_name);
  form_data.append("last_name", userData.last_name);
  form_data.append("email", userData.email);
  form_data.append("profile_pic", userData.profile_pic);
  // form_data.append("dob", userData.dob);
  form_data.append("country_code", userData.country_code);
  form_data.append("phone_number", userData.phone_number);
  form_data.append("address", userData.address);
  const response = await request({
    path: "profile/edit",
    method: "PUT",
    headers: {
      "x-access-token": token,
      "content-type": "multipart/form-data",
    },
    body: form_data,
  });
  return response;
}