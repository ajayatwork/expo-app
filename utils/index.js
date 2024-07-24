export const url = "http://nodemaster.visionvivante.com:4040/";

import axios from "axios";

export function request({
  method,
  path,
  body = null,
  params = null,
  headers = null,
}) {
  return axios({
    method: method || "get",
    url: url + path,
    data: body,
    params: params,
    headers: headers,
  });
}