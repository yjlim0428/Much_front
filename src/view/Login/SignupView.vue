<script setup>
import { onMounted, reactive, ref } from "vue";
import { BaseInput, BaseButton, BaseSelect } from "@/components/base";
import logo from "@/assets/logo.svg";
import apiClient from "@/service/config";

const inputs = reactive({
  id: "",
  pw: "",
  pwCheck: "",
  phoneNumber: "",
  authNumber: "",
  username: "",
  position1: "",
  position2: "",
  position3: "",
});

const validation = reactive({
  usernameValidate: true,
  usernameResultMsg: null,
});

async function getUserNameVaildation() {
  const { code, message, result } = await apiClient.get(
    `common/name-validation?nickname=${inputs.username}`
  );

  if (code === 2002 || code === 2003 || code === 1000) {
    alert(message);
    validation.usernameValidate = false;
    validation.usernameResultMsg = message;
  }
  if (code === 200) {
    alert("사용 가능한 닉네임입니다.");
    validation.usernameValidate = true;
    validation.usernameResultMsg = "사용 가능한 닉네임입니다.";
  }
}

const positionData = ref([]);
async function getPosition() {
  const { code, message, result } = await apiClient.get(`/common/positions`);
  if (code === 200) {
    positionData.value = result.positions;
  }
}
onMounted(async () => {
  positionData.value = await getPosition();
});
</script>
<template>
  <div class="container">
    <img class="logo" :src="logo" />

    <!-- 닉네임 -->
    <div class="wrapper">
      <BaseInput v-model="inputs.id" :width="360" :placeholder="'아이디 입력'">
        <template #label>
          <div class="label">
            <spna class="label__text--required">아이디</spna>
          </div>
        </template>

        <template #bottomtext v-if="validation.usernameResultMsg">
          <div
            :class="{
              'bottomtext--success': validation.usernameValidate,
              'bottomtext--err': !validation.usernameValidate,
            }"
          >
            <span>{{ validation.usernameResultMsg }} </span>
          </div>
        </template>
      </BaseInput>
      <BaseInput
        v-model="inputs.pw"
        :width="360"
        :placeholder="'비밀번호 입력'"
      >
        <template #label>
          <div class="label">
            <spna class="label__text--required">비밀번호</spna>
          </div>
        </template>

        <template #bottomtext v-if="validation.usernameResultMsg">
          <div
            :class="{
              'bottomtext--success': validation.usernameValidate,
              'bottomtext--err': !validation.usernameValidate,
            }"
          >
            <span>{{ validation.usernameResultMsg }} </span>
          </div>
        </template>
      </BaseInput>
      <BaseInput
        v-model="inputs.pwCheck"
        :width="360"
        :placeholder="'비밀번호 확인'"
      >
        <template #label>
          <div class="label">
            <spna class="label__text--required">비밀번호 확인</spna>
          </div>
        </template>

        <template #bottomtext v-if="validation.usernameResultMsg">
          <div
            :class="{
              'bottomtext--success': validation.usernameValidate,
              'bottomtext--err': !validation.usernameValidate,
            }"
          >
            <span>{{ validation.usernameResultMsg }} </span>
          </div>
        </template>
      </BaseInput>
    </div>

    <div class="wrapper">
      <BaseInput
        v-model="inputs.username"
        :width="240"
        :placeholder="'닉네임 입력'"
      >
        <template #label>
          <div class="label">
            <spna class="label__text--required">닉네임</spna>
          </div>
        </template>
        <template #button>
          <BaseButton :label="'중복 확인'" @onClick="getUserNameVaildation" />
        </template>
        <template #bottomtext v-if="validation.usernameResultMsg">
          <div
            :class="{
              'bottomtext--success': validation.usernameValidate,
              'bottomtext--err': !validation.usernameValidate,
            }"
          >
            <span>{{ validation.usernameResultMsg }} </span>
          </div>
        </template>
      </BaseInput>
    </div>

    <!-- 전화번호, 인증번호  -->
    <div class="wrapper">
      <BaseInput
        v-model="inputs.phoneNumber"
        :width="240"
        :placeholder="'핸드폰 번호 입력'"
      >
        <template #label>
          <div class="label">
            <spna class="label__text--required">전화번호</spna>
          </div>
        </template>
        <template #button>
          <BaseButton :label="'인증번호 받기'" />
        </template>
      </BaseInput>
      <BaseInput
        v-model="inputs.authNumber"
        :width="240"
        :placeholder="'인증번호 입력'"
      >
        <template #button>
          <BaseButton :label="'인증번호 확인'" />
        </template>
      </BaseInput>
    </div>

    <div class="wrapper">
      <BaseSelect>
        <template #label>
          <div class="label">
            <span class="label__text"> 포지션 설정</span>
          </div>
        </template>
      </BaseSelect>
      <BaseSelect />

      <BaseSelect />
    </div>

    <BaseButton
      label="가입 완료"
      :width="150"
      :bgColor="'#6b71fc'"
      :fontColor="'#fff'"
    />
  </div>
</template>
<style lang="scss" scoped>
.container {
  min-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding: 100px 0;
  & > .wrapper {
    & > * + * {
      margin-top: 10px;
    }
    margin-bottom: 33px;

    & .label {
      font-size: 12px;
      margin-bottom: 5px;
      &__text {
        &--required::before {
          content: "\002A"+ " ";
          color: #ff636c;
        }
      }
    }
  }

  & > .logo {
    width: 100px;
    margin: 0 0 78px 0;
  }

  & :deep() {
    .inputbox {
    }
    .base-button {
      margin-left: 10px;
    }
    .bottomtext {
      margin-top: 10px;

      &--success {
        & > span {
          color: #6b71fc;
          font-size: 13px;
        }
      }
      &--err {
        & > span {
          color: #ff636c;
          font-size: 13px;
        }
      }
    }
  }
}
</style>
