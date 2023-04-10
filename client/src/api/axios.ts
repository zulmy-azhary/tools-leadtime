import axios from "axios";
import { SERVER_BASE_URL } from "../helpers/constants";
import Cookies from "js-cookie";

export default axios.create({
  baseURL: SERVER_BASE_URL
});

export const axiosProtected = () => {
  const accessToken = Cookies.get("accessToken");

  return axios.create({
    baseURL: SERVER_BASE_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};
