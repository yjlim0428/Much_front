import { defineStore } from "pinia";
import { ref } from "vue";

export const useAlertStore = defineStore("modal", () => {
  const isOpen = ref(false);
  const message = ref("");
  const btnLeft = ref({});
  const btnRight = ref({});

  function openModal(modalMessage, leftBtnConfig, rightBtnConfig) {
    isOpen.value = true;
    message.value = modalMessage;
    btnLeft.value = leftBtnConfig;
    btnRight.value = rightBtnConfig;
  }
  function closeModal() {
    isOpen.value = false;
  }

  return { isOpen, message, openModal, closeModal, btnLeft, btnRight };
});
