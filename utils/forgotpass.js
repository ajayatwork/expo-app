import { request } from "../utils/index";
export const forgotPass = async (userData) => {
  console.log("userdata", userData)
  const response = await request({
    path: "auth/forgot-password/otp",
    method: "POST",
    body: { username: userData.email },
  });
  return response;
};
