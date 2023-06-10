import axios from "axios";
import { useLoadingStore } from "@/stores/loading";
import { useErrorStore } from "@/stores/error";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// 응답 보낼 때
apiClient.interceptors.request.use(
  function (config) {
    useLoadingStore().startLoading();
    console.log("1");
    return config;
  },
  function (error) {
    console.log("2");
    useLoadingStore().endLoading();
    useErrorStore().setError({ ...error, type: "request" });
    return Promise.reject(error);
  }
);

// 응답 받은 후
apiClient.interceptors.response.use(
  function (response) {
    console.log(response);
    useLoadingStore().endLoading();

    // 파일 응답인 경우
    if (response.config.responseType === "blob") {
      return response;
    }

    if (response.data) {
      console.log("4");
      return response.data;
    }

    return response;
  },
  function (error) {
    console.log("3");
    useLoadingStore().endLoading();
    useErrorStore().setError({ ...error, type: "response" });
    return Promise.reject(error);
  }
);

export const setHeaderToken = (token) => {
  instance.defaults.headers.common["Authorization"] = token;
};

export default apiClient;
