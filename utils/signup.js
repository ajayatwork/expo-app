import { request } from "../utils/index";
export const signupApi = async (userData) => {
  const response = await request({
    path: "auth/signup",
    method: "POST",
    body: {
      email: userData.email,
      password: userData.password,
      first_name: userData.firstName,
      last_name: userData.last_name,
      dob: new Date(),
      phone_number: userData.phoneNo,
      address:userData.address
    },
  });
  return response;
};
