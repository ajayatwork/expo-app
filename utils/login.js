import {request} from '../utils/index'
export const loginToApi = async(userData)=>{
  const response = await request({
    path: "auth/login",
    method: "POST",
    body: {username: userData.email.toLowerCase(), password: userData.password}
  })
  return response;
}