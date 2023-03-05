import axios from "axios";
import { BASE_URL } from "../helpers/constant";

export default axios.create({
  baseURL: BASE_URL
});
