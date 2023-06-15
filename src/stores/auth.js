import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const user = reactive({
      username: "",
    });

    const token = reactive({
      accessToken: "",
      refreshToken: "",
    });

    function isLoggedIn() {
      // user 안에 user id 있는지 검사
    }

    async function setLoginUser(token) {
      // userdata = 토큰 디코딩한 값
      if (token) {
        // user.username = userdata.~~
      }
    }

    function login(token) {
      setToken(token);
      setLocalStorage(token);
      setLoginUser(token);
    }

    function setToken(token) {
      token.accessToken = token.accessToken;
      token.refreshToken = token.refreshToken;
    }

    function setLocalStorage({ token }) {
      localStorage.setItem("accessToken", token.accessToken);
      localStorage.setItem("refreshToken", token.refreshToken);
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
      token,
      isLoggedIn,
      setLoginUser,
      setToken,
      login,
      resetLocalStorage,
      logout,
    };
  },
  {
    persist: [
      {
        paths: ["token"],
        storage: localStorage,
      },
    ],
  }
);
