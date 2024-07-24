import { request } from "../utils/index";
export const submitOtp = async (OTP, email) => {
  console.log("Email", email, "otp", OTP)
  const response = await request({
    path: "auth/verify-otp",
    method: "POST",
    body: { otp: OTP, username: email },
  });
  return response;
};
