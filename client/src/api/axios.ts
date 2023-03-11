import axios from "axios";
import { SERVER_BASE_URL } from "../helpers/constant";

export default axios.create({
  baseURL: SERVER_BASE_URL
});
