import { defineStore } from "pinia";
import { ref } from "vue";

export const useErrorStore = defineStore("error", () => {
  const error = ref(null);
  function setError(err) {
    error.value = err;
  }
  function clearError() {
    error.value = null;
  }

  return { error, setError, clearError };
});
