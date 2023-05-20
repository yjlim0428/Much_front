import axios from "axios";

const apiClient = axios.create({
  baseURL: "",
});

apiClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const setHeaderToken = (token) => {
  instance.defaults.headers.common["Authorization"] = token;
};

export default apiClient;
