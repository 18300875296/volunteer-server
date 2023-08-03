<template>
  <div class="resume-bg">
    <div class="resume">
      <cookie-form ref="formRef" :model="Form" class="form">
        <div class="userInfo">
          <div class="userInfo_item">
            <cookie-form-item class="form_item" prop="name" label="姓名">
              <cookie-input
                v-model="Form.name"
                placeholder="请输入真实姓名"
                :border="false"
                :transparent="false"
              ></cookie-input>
            </cookie-form-item>
            <cookie-form-item class="form_item" prop="sex" label="性别">
              <cookie-radio-group v-model="Form.sex" :button="true">
                <cookie-radio label="man" value="男性"></cookie-radio>
                <cookie-radio label="women" value="女性"></cookie-radio>
              </cookie-radio-group>
            </cookie-form-item>
            <cookie-form-item class="form_item" prop="phone" label="手机号">
              <cookie-input
                v-model="Form.phone"
                placeholder="请输入手机号码"
                :border="false"
                :transparent="false"
              ></cookie-input>
            </cookie-form-item>
          </div>
          <div class="userInfo_item">
            <cookie-form-item class="form_item" prop="birthday" label="出生日期">
              <cookie-input
                v-model="Form.birthday"
                placeholder="请输入出生日期"
                :border="false"
                :transparent="false"
              ></cookie-input>
            </cookie-form-item>
            <cookie-form-item class="form_item" prop="passport" label="身份证号码">
              <cookie-input
                v-model="Form.passport"
                placeholder="请输入身份证号码"
                :border="false"
                :transparent="false"
              ></cookie-input>
            </cookie-form-item>
            <cookie-form-item class="form_item" prop="record" label="学历">
              <cookie-input
                v-model="Form.record"
                placeholder="请输入最高学历"
                :border="false"
                :transparent="false"
              ></cookie-input>
            </cookie-form-item>
          </div>
        </div>
        <!-- <div class="education">
          <cookie-form-item class="form_item" prop="university" label="毕业学校">
            <cookie-input v-model="Form.university" placeholder="请输入毕业学校"></cookie-input>
          </cookie-form-item>
          <cookie-form-item class="form_item" prop="profess" label="专业">
            <cookie-input v-model="Form.profess" placeholder="请输入所学专业"></cookie-input>
          </cookie-form-item>
        </div> -->

        <div class="volunteerExperience">
          <cookie-form-item class="form_item" prop="project" label="参与的志愿服务">
            <cookie-input v-model="Form.project" placeholder="请输入参与过的志愿服务"></cookie-input>
          </cookie-form-item>

          <cookie-form-item class="form_item" prop="serve_duration" label="志愿服务时长">
            <cookie-input v-model="Form.serve_duration" placeholder="请输入志愿服务时长"></cookie-input>
          </cookie-form-item>
        </div>
        <div class="otherInfo">
          <cookie-form-item class="form_item" prop="languages" label="语言能力">
            <cookie-input v-model="Form.languages" placeholder="请输入语言能力"></cookie-input>
          </cookie-form-item>
          <cookie-form-item class="form_item" prop="skills" label="技能特长">
            <cookie-input v-model="Form.skills" placeholder="请输入技能特长"></cookie-input>
          </cookie-form-item>
          <cookie-form-item class="form_item" prop="hobbies" label="兴趣爱好">
            <cookie-input v-model="Form.hobbies" placeholder="请输入兴趣爱好"></cookie-input>
          </cookie-form-item>
        </div>
      </cookie-form>
      <cookie-button type="submit" @click="handleClickSubmit">提交</cookie-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import CookieForm from '../components/cookie-form/CookieForm.vue';
import CookieFormItem from '../components/cookie-form/CookieFormItem.vue';
import CookieInput from '../components/cookie-input/CookieInput.vue';
import CookieRadioGroup from '../components/cookie-radio/CookieRadioGroup.vue';
import CookieRadio from '../components/cookie-radio/CookieRadio.vue';
import CookieDatePicker from '../components/cookie-date-picker/CookieDatePicker.vue';
import { activeRegisterAPI } from '../api/active';
import { ActiveApplication } from '@/assets/interface';

const props = defineProps({
  active_id: {
    type: String,
    default: '',
  },
});
const router = useRouter();
const Form = ref<ActiveApplication>({
  work: '',
  name: '',
  sex: '',
  birthday: '',
  passport: '',
  phone: '',
  record: '',
  university: '',
  profess: '',
  project: '',
  serve_duration: 0,
  languages: '',
  skills: '',
  hobbies: '',
});
const handleClickSubmit = async () => {
  await activeRegisterAPI(props.active_id, Form.value);
  router.push(`/active/${props.active_id}`);
};
const formRef = ref();
</script>
<style scoped>
.resume-bg {
  background-color: rgb(247, 248, 250);
  overflow: hidden;
  width: 100%;
}
.resume {
  width: 700px;
  /* height: 700px; */
  padding: 24px;
  border-radius: 8px;
  margin: 24px auto;
  display: flex;
  flex-direction: column;
  border: none;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 1);
}
.userInfo {
  display: flex;
  flex-flow: column;
  /* justify-content: space-between; */
  gap: 10;
  align-items: start;
}
.userInfo_item {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
</style>
