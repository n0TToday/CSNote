<template>
  <n-form ref="formRef" :model="model" :rules="rules" size="large" :show-label="false">
    <n-form-item path="name">
      <n-input v-model:value="model.userName" placeholder="昵称" />
    </n-form-item>
    <n-form-item path="phone">
      <n-input v-model:value="model.userPhone" placeholder="手机号码" />
    </n-form-item>
    <n-form-item path="code">
      <div class="flex-y-center w-full">
        <n-input v-model:value="model.code" placeholder="验证码" />
        <div class="w-18px"></div>
        <n-button size="large" :disabled="isCounting" :loading="smsLoading" @click="handleSmsCode">
          {{ label }}
        </n-button>
      </div>
    </n-form-item>
    <n-form-item path="pwd">
      <n-input v-model:value="model.password" type="password" show-password-on="click" placeholder="密码" />
    </n-form-item>
    <n-form-item path="confirmPwd">
      <n-input v-model:value="model.confirmPwd" type="password" show-password-on="click" placeholder="确认密码" />
    </n-form-item>
    <n-space :vertical="true" :size="18">
      <login-agreement v-model:value="agreement" />
      <n-button type="primary" size="large" :loading="loginLoading" :block="true" :round="true" @click="handleSubmit">
        确定
      </n-button>
      <n-button size="large" :block="true" :round="true" @click="toLoginModule('pwd-login')">返回</n-button>
    </n-space>
  </n-form>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs } from 'vue';
import type { FormInst, FormRules } from 'naive-ui';
import { useRouterPush } from '@/composables';
import { useSmsCode } from '@/hooks';
import { formRules, getConfirmPwdRule } from '@/utils';
import { useAuthStore } from '~/src/store';

const { toLoginModule } = useRouterPush();
const { label, isCounting, loading: smsLoading, start } = useSmsCode();
const { create, loginLoading } = useAuthStore();
const formRef = ref<HTMLElement & FormInst>();

const model = reactive({
  userName: '',
  userPhone: '',
  code: '',
  password: '',
  confirmPwd: ''
});

const rules: FormRules = {
  userPhone: formRules.phone,
  code: formRules.code,
  password: formRules.pwd,
  confirmPwd: getConfirmPwdRule(toRefs(model).password)
};

const agreement = ref(false);

function handleSmsCode() {
  start();
  model.code = '123456';
}

async function handleSubmit() {
  await formRef.value?.validate();
  create(model);
}
</script>

<style scoped></style>
