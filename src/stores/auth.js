import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const user = reactive({
      username: "",
    });

    function isLoggedIn() {
      // user 안에 user id 있는지 검사
    }

    async function setLoginUser() {
      const token = localStorage.getItem("accessToken");
      if (token) {
        // 토큰 디코딩 -> user 에 데이터 저장
      }
    }

    function login(token) {
      const { accessToken, refreshToken } = token;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setLoginUser();
    }

    function resetLocalStorage() {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }

    function logout() {
      resetLocalStorage();
    }

    return {
      user,
      isLoggedIn,
      setLoginUser,
      login,
      resetLocalStorage,
      logout,
    };
  },
  {
    persist: [
      {
        paths: ["user"],
        storage: localStorage,
      },
    ],
  }
);
