import axios, { AxiosInstance } from "axios";

let appInstance: AxiosInstance | null = null;

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  });

  instance.interceptors.request.use(async (config) => {
    config.headers["Content-Type"] = 'application/json';
    return config;
  });

  instance.interceptors.response.use(
    (response) => response);
  return instance;
};


const getAppInstance = (): AxiosInstance => {
  if (!appInstance) {
    appInstance = createAxiosInstance();
  }
  return appInstance;
};

export default getAppInstance();