import { request } from "../utils/index";
export const signupApi = async (userData, country) => {
  const response = await request({
    path: "auth/signup",
    method: "POST",
    body: {
      email: userData.email.toLowerCase(),
      password: userData.password,
      first_name: userData.firstName,
      last_name: userData.last_name,
      dob: userData.dob,
      phone_number: userData.phoneNo,
      address: userData.address,
      country_code: country.callingCode[0],
    },
  });
  return response;
};
