<script setup>
import { computed, onMounted, reactive, ref, watchEffect } from "vue";
import { BaseInput, BaseButton, BaseSelect } from "@/components/base";
import logo from "@/assets/logo.svg";
import apiClient from "@/service/config";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const classList = [
  { code: "하수", name: "하수" },
  { code: "중수", name: "중수" },
  { code: "고수", name: "고수" },
];

const inputs = reactive({
  id: "",
  pw: "",
  pwCheck: "",
  phoneNumber: "",
  authNumber: "",
  username: "",
  positionParent: "",
  positionChild: "",
  class: "",
});

const validation = reactive({
  id: {
    valid: null,
    msg: null,
  },
  username: {
    valid: null,
    msg: null,
  },
  pwCheck: {
    valid: null,
    msg: null,
  },
  sendMessage: {
    send: false,
  },
  authNumber: {
    msg: null,
  },
});

// get 포지션
const positionData = ref([]);
async function getPosition() {
  const { code, message, result } = await apiClient.get(`/common/positions`);
  if (code === 200) {
    return result.positions;
  }
}
onMounted(async () => {
  positionData.value = await getPosition();
});

const positionComputed = computed(() => {
  for (let item of positionData.value) {
    if (item.code === inputs.positionParent) {
      return item.children;
    }
  }
  return [];
});
watchEffect(() => {
  if (inputs.positionParent) {
    inputs.positionChild = [];
  }
});

// 아이디 중복
async function getIdVaildation() {
  if (inputIsEmpty(inputs.id)) return;

  const { code, message, result } = await apiClient.get(
    `/common/id-validation?id=${inputs.id}`
  );

  if (code === 200) {
    alert("사용 가능한 아이디입니다.");
    validation.id.valid = true;
    validation.id.msg = "사용 가능한 아이디 입니다.";
  } else {
    alert(message);
    validation.id.valid = false;
    validation.id.msg = message;
  }
}

// 닉네임 중복
async function getUserNameVaildation() {
  if (inputIsEmpty(inputs.username)) return;

  const { code, message, result } = await apiClient.get(
    `/common/name-validation?nickname=${inputs.username}`
  );

  if (code === 200) {
    alert("사용 가능한 닉네임입니다.");
    validation.username.valid = true;
    validation.username.msg = "사용 가능한 닉네임입니다.";
  } else {
    alert(message);
    validation.username.valid = false;
    validation.username.msg = message;
  }
}

// 핸드폰 인증 번호 전송
async function postSendMessage() {
  if (inputIsEmpty(inputs.phoneNumber)) return;
  const { code, message, result } = await apiClient.post(
    `/sms/join-certification?phoneNumber=${inputs.phoneNumber}`
  );

  if (code === 200) {
    alert(
      `${result.phoneNumber}로 인증 메세지를 전송했습니다. ${result.remainTimeInSeconds}초 안에 인증을 완료해주세요.`
    );
    validation.sendMessage.send = true;
    return;
  } else {
    alert(message);
  }
}

// 핸드폰 인증 확인
async function postCheckMessage() {
  if (inputIsEmpty(inputs.authNumber)) return;
  const { code, message, result } = await apiClient.post(
    `/sms/join-verification`,
    {
      phoneNumber: inputs.phoneNumber,
      certificationNumber: inputs.authNumber,
    }
  );

  if (code === 200) {
    alert("인증을 완료하였습니다.");
    validation.authNumber.msg = "인증 완료";
    return;
  } else {
    alert(message);
  }
}

async function singup() {
  const { code, message, result } = await apiClient.post(`/user`, {
    id: inputs.id,
    password: inputs.pw,
    nickname: inputs.username,
    phoneNumber: inputs.phoneNumber,
    positionParent: inputs.positionParent,
    positionChild: inputs.positionChild,
    positionClass: inputs.class,
  });

  if (code === 200) {
    alert("회원가입을 완료하였습니다.");
    await authStore.login({
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
    router.push("/");
  } else {
    alert(message);
  }
}

// 입력 칸 비었는지 확인
function inputIsEmpty(value) {
  if (value === "") {
    alert("입력 후 진행해주세요.");
    return true;
  } else {
    return false;
  }
}

watchEffect(() => {
  if (inputs.pwCheck !== "" && inputs.pw !== inputs.pwCheck) {
    validation.pwCheck.msg = "비밀번호와 다릅니다.";
  } else {
    validation.pwCheck.msg = null;
  }
});
</script>
<template>
  <div class="container">
    <img class="logo" :src="logo" />

    <!-- 아이디 -->
    <div class="wrapper">
      <BaseInput
        :label="'아이디'"
        :required="true"
        v-model="inputs.id"
        :width="240"
        :placeholder="'아이디 입력'"
      >
        <!-- <template #label>
          <div class="label">
            <spna class="label__text--required">아이디</spna>
          </div>
        </template> -->
        <template #button>
          <BaseButton :label="'중복 확인'" @onClick="getIdVaildation" />
        </template>
        <template #bottomtext v-if="validation.id.msg">
          <div
            :class="{
              'bottomtext--success': validation.id.valid,
              'bottomtext--err': !validation.id.valid,
            }"
          >
            <span>{{ validation.id.msg }} </span>
          </div>
        </template>
      </BaseInput>
      <BaseInput
        v-model="inputs.pw"
        :width="360"
        :placeholder="'비밀번호 입력'"
        :type="'password'"
      >
        <template #label>
          <div class="label">
            <spna class="label__text--required">비밀번호</spna>
          </div>
        </template>
      </BaseInput>
      <BaseInput
        v-model="inputs.pwCheck"
        :width="360"
        :placeholder="'비밀번호 확인'"
        :type="'password'"
      >
        <template #label>
          <div class="label">
            <spna class="label__text--required">비밀번호 확인</spna>
          </div>
        </template>

        <template #bottomtext v-if="validation.pwCheck.msg">
          <div
            :class="{
              'bottomtext--success': validation.pwCheck.valid,
              'bottomtext--err': !validation.pwCheck.valid,
            }"
          >
            <span>{{ validation.pwCheck.msg }} </span>
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
        <template #bottomtext v-if="validation.username.msg">
          <div
            :class="{
              'bottomtext--success': validation.username.valid,
              'bottomtext--err': !validation.username.valid,
            }"
          >
            <span>{{ validation.username.msg }} </span>
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
          <BaseButton :label="'인증번호 받기'" @onClick="postSendMessage" />
        </template>
      </BaseInput>

      <BaseInput
        v-model="inputs.authNumber"
        :width="240"
        :placeholder="'인증번호 입력'"
      >
        <template #button>
          <BaseButton
            :label="'인증번호 확인'"
            :disabled="!validation.sendMessage.send"
            @onClick="postCheckMessage"
          />
        </template>
        <template #bottomtext v-if="validation.authNumber.msg">
          <div class="bottomtext--success">
            <span>{{ validation.authNumber.msg }} </span>
          </div>
        </template>
      </BaseInput>
    </div>

    <template v-if="positionData">
      <div class="wrapper">
        <BaseSelect :dataList="positionData" v-model="inputs.positionParent">
          <template #label>
            <div class="label">
              <span class="label__text"> 포지션 설정</span>
            </div>
          </template>
        </BaseSelect>
        <BaseSelect
          :dataList="positionComputed"
          v-model="inputs.positionChild"
        />
        <BaseSelect :dataList="classList" v-model="inputs.class" />
      </div>
    </template>

    <BaseButton
      label="가입 완료"
      :width="150"
      :bgColor="'#6b71fc'"
      :fontColor="'#fff'"
      @onClick="singup"
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

    /* & .label {
      font-size: 12px;
      margin-bottom: 5px;
      &__text {
        &--required::before {
          content: "\002A"+ " ";
          color: #ff636c;
        }
      }
    } */
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
          font-size: 10px;
        }
      }
      &--err {
        & > span {
          color: #ff636c;
          font-size: 10px;
        }
      }
    }
  }
}
</style>
