import { request } from "../utils/index";
export const resetPassword = async (password, email) => {
  const response = await request({
    path: "auth/reset-password",
    method: "POST",
    body: { password: password, username: email },
  });
  return response;
};
