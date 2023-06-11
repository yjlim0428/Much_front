import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// import ApiService from "@/service/ApiService";
import apiClient from "@/service/config";
import _ from "lodash";

const app = createApp(App);
const pinia = createPinia(piniaPluginPersistedstate);

app.use(router);
app.use(pinia);
app.use(ElementPlus);
app.config.globalProperties.$_ = _;

app.mount("#app");
