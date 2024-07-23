import axios from "axios";

export async function login(userData){
    const res = await axios.post({
      username: userData.email,
      password: userData.password,
    });
    return res;
}