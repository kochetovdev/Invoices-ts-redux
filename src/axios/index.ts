import axios, { AxiosInstance } from "axios";

const BASE_URL = "http://localhost:3000";

export const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});
