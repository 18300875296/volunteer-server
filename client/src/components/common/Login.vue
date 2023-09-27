<template>
  <cookie-dialog :show-dialog="showDialog" @on-close="handleClose">
    <template #header>
      <section class="header">
        <span :class="[!isSelect ? 'isSelect' : '']" @click="isSelect = false">登录</span>
        <span class="gap-line"></span>
        <span :class="[isSelect ? 'isSelect' : '']" @click="isSelect = true">注册</span>
      </section>
    </template>
    <template v-if="isSelect" #body>
      <cookie-form ref="formRef" :model="Form" :rules="rules">
        <cookie-form-item prop="email">
          <cookie-input v-model="Form.email" type="text" placeholder="请输入邮箱" name="email"></cookie-input>
        </cookie-form-item>
        <cookie-form-item prop="password">
          <cookie-input v-model="Form.password" type="password" placeholder="请输入密码" name="password"></cookie-input>
        </cookie-form-item>
        <cookie-form-item prop="rePassword">
          <cookie-input
            v-model="Form.rePassword"
            type="password"
            placeholder="请确认密码"
            name="rePassword"
          ></cookie-input>
        </cookie-form-item>
        <cookie-form-item prop="code">
          <cookie-input v-model="Form.code" type="text" placeholder="验证码" name="code">
            <template #code>
              <div :class="['code-container', { disabled: isDisable }]" @click="handleCode">
                <span>{{ countdown ? `${countdown}秒后重新发送` : `发送验证码` }}</span>
              </div>
            </template>
          </cookie-input>
        </cookie-form-item>
      </cookie-form>
      <cookie-button type="submit" class="register-button" @click="handleSubmit">注册</cookie-button>
    </template>
    <template v-else #body>
      <cookie-form ref="formRef" :model="Form2" class="form-container" :rules="rules2">
        <cookie-form-item prop="email">
          <cookie-input v-model="Form2.email" type="text" placeholder="请输入邮箱" name="email"></cookie-input>
        </cookie-form-item>
        <cookie-form-item prop="password">
          <cookie-input
            v-model="Form2.password"
            type="password"
            placeholder="请输入密码"
            name="password"
          ></cookie-input>
        </cookie-form-item>
      </cookie-form>
      <cookie-button type="submit" class="register-button" @click="handleSubmit2">登录</cookie-button>
    </template>
  </cookie-dialog>
</template>
<script setup lang="ts">
import { ref, reactive, onBeforeUnmount, watch } from 'vue';
import CookieInput from '@/components/cookie-input/CookieInput.vue';
import CookieForm from '@/components/cookie-form/CookieForm.vue';
import CookieDialog from '@/components/cookie-dialog/CookieDialog.vue';
import CookieButton from '@/components/cookie-button/CookieButton.vue';
import CookieFormItem from '@/components/cookie-form/CookieFormItem.vue';
import useUserStore from '@/store/user';

const props = defineProps({
  showLoginDialog: {
    type: Boolean,
    default: false,
  },
});
const showDialog = ref(false);
const emits = defineEmits(['onClose']); // 暴露给外部的方法
watch(
  () => props.showLoginDialog,
  () => {
    showDialog.value = props.showLoginDialog;
  },
  { immediate: true },
);
const handleClose = () => {
  showDialog.value = false; // 关闭的时候触发
  emits('onClose');
};
const isSelect = ref(false);
const countdown = ref(); // 验证码计数
const isDisable = ref(false);
const formRef = ref<any>(); // 获取表单元素

const userStore = useUserStore();

// 表单验证规则
const Form = reactive({
  email: '',
  password: '',
  rePassword: '',
  code: '',
});
const Form2 = reactive({
  email: '',
  password: '',
});
// 定义密码验证规则
const validatePass = (rule: any, value: any, callback: any) => {
  const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`[\]{}|;:'",.<>/?\\-]).{8,}$/;
  if (!pattern.test(value)) {
    callback(new Error('密码必须包含大小写字母、数字、特殊字符且至少8位'));
  }
  if (value && Form.rePassword && value !== Form.rePassword) {
    callback(new Error('两次密码不相同'));
  }
  callback();
};
// 定义确认密码验证规则
const validateRepass = (rule: any, value: any, callback: any) => {
  const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`[\]{}|;:'",.<>/?\\-]).{8,}$/;
  if (!pattern.test(value)) {
    callback(new Error('密码必须包含大小写字母、数字、特殊字符且至少8位'));
  }
  if (value && Form.password && value !== Form.password) {
    callback(new Error('两次密码不相同'));
  }
  callback();
};
// 定义校验规则
const rules = {
  email: [
    { required: true, message: '邮箱不能为空' },
    {
      required: true,
      pattern: /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/,
      message: '请输入正确的邮箱格式',
    },
  ],
  password: [
    { required: true, message: '密码不能为空' },
    { require: true, validator: validatePass },
  ],
  rePassword: [
    { required: true, message: '密码不能为空' },
    { require: true, validator: validateRepass },
  ],
  code: [
    { required: true, message: '验证码不能为空' },
    { require: true, pattern: /^[A-Za-z0-9]+$/, message: '验证码只能是数字和字母' },
  ],
};
const rules2 = {
  email: [
    { required: true, message: '邮箱不能为空' },
    {
      required: true,
      pattern: /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/,
      message: '请输入正确的邮箱格式',
    },
  ],
  password: [
    { required: true, message: '密码不能为空' },
    {
      require: true,
      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`[\]{}|;:'",.<>/?\\-]).{8,}$/,
      message: '密码必须包含大小写字母、数字、特殊字符且至少8位',
    },
  ],
};
// 发送验证码
const sendEmail = async (email: string) => {
  await userStore.sendCode(email);
  countdown.value = 60; // 开始60秒倒计时
  isDisable.value = true; // 锁 不让点击
  const timerId = setInterval(() => {
    countdown.value -= 1;
    if (countdown.value <= 0) {
      isDisable.value = false; // 解锁
      clearInterval(timerId); // 清除定时器
    }
  }, 1000);
};
// 发送验证码
const handleCode = () => {
  // 验证邮箱
  formRef.value.validateEmail((valid: boolean): void => {
    if (valid) {
      sendEmail(Form.email); // 发送验证码
    }
  });
};

// 提交表单--注册
const handleSubmit = () => {
  formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      openDialog.value = false;
      await userStore.register(Form);
      alert('success');
    } else {
      alert('failure');
    }
  });
};
// 提交表单-登录
const handleSubmit2 = () => {
  formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      openDialog.value = false;
      await userStore.login(Form2);
      // ElMessage({
      //   message: 'Congrats, this is a success message.',
      //   type: 'success',
      // });
      // alert('success');
    } else {
      alert('failure');
    }
  });
};
onBeforeUnmount(() => {
  console.log('销毁');
});
</script>
<style scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row nowrap;
  margin: 0 auto;
}
.header span {
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: rgba(38, 38, 38, 0.75);
}
.header span:hover {
  color: rgba(0, 122, 255, 0.75);
}
.gap-line {
  margin: 0 8px;
  height: 20px !important;
  width: 1px;
  background-color: rgba(0, 10, 32, 0.08);
}
.isSelect {
  border-bottom: 2px solid rgba(0, 122, 255, 1);
  border-radius: 0.5px;
  transition: border 0.2s;
}
.form-container {
  height: 232px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
.code-container {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  transition: color 0.3s ease 0s, opacity 0.3s ease 0s;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(140, 140, 140, 1);
  font-size: 14px;
  cursor: pointer;
}

.register-button {
  margin: 0 auto;
}
.disabled {
  pointer-events: none;
}
</style>
