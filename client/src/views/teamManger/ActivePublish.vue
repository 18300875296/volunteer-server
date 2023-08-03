<template>
  <div class="bg">
    <div class="block-dialog-container">
      <cookie-form ref="formRef" :model="activeForm" :rules="rules" class="form">
        <cookie-form-item class="form_item form_item-title" label="活动名称" prop="active_name">
          <cookie-input
            v-model="activeForm.active_name"
            placeholder="请输入志愿活动名称"
            name="active_name"
            :border="false"
            :transparent="false"
            class="form_item-title-inp"
          ></cookie-input>
        </cookie-form-item>
        <div class="form_item-group">
          <cookie-form-item class="form_item-way form_item" label="服务方式" prop="service_type">
            <cookie-radio-group v-model="activeForm.service_type" :button="true" name="service_type">
              <cookie-radio label="online" class="span-radio" value="线上服务"></cookie-radio>
              <cookie-radio label="line" class="span-radio" value="线下服务"></cookie-radio>
            </cookie-radio-group>
          </cookie-form-item>
          <cookie-form-item label="捐募人数" prop="peoples">
            <cookie-input
              v-model="activeForm.peoples"
              placeholder="请输入捐募人数"
              name="peoples"
              class="block-input-peoples"
              :border="false"
              :transparent="false"
            ></cookie-input>
          </cookie-form-item>
          <cookie-form-item label="服务性质" prop="activeType">
            <cookie-select v-model="activeForm.active_type" placeholder="请选择服务性质">
              <cookie-option
                v-for="item of classOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></cookie-option>
            </cookie-select>
          </cookie-form-item>
        </div>
        <div class="form_item-group">
          <cookie-form-item label="工作时长" prop="workTime">
            <div class="form__item-group">
              <cookie-time-select
                v-model="activeForm.work_start_at"
                placeholder="开始时间"
                :picker-options="{
                  start: '08:30',
                  step: 15,
                  end: '18:30',
                }"
              />
              <cookie-time-select
                v-model="activeForm.work_end_at"
                placeholder="结束时间"
                :min-time="activeForm.work_start_at"
                :picker-options="{
                  start: '08:30',
                  step: 15,
                  end: '18:30',
                }"
              />
            </div>
          </cookie-form-item>
          <cookie-form-item label="服务周期" prop="cycle">
            <cookie-date-picker
              v-model="activeForm.active_cycle"
              range-separator=""
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </cookie-date-picker>
          </cookie-form-item>
        </div>
        <div class="form_item-group">
          <cookie-form-item label="报名日期" prop="deadline">
            <cookie-date-picker
              v-model="activeForm.register_time"
              range-separator=""
              start-placeholder="开始日期"
              end-placeholder="截止日期"
              name="deadline"
            >
            </cookie-date-picker>
          </cookie-form-item>
        </div>
        <div class="form_item-group">
          <cookie-form-item class="block-form-item-title" label="工作地点">
            <div class="block-form-item-group">
              <cookie-select
                v-model="activeForm.province"
                placeholder="请选择省份"
                name="province"
                @change="handleChange_provinces"
              >
                <cookie-option
                  v-for="province of provinces"
                  :key="province.adcode"
                  :label="province.name"
                  :value="province.adcode"
                ></cookie-option>
              </cookie-select>
              <cookie-select
                v-model="activeForm.city"
                placeholder="请选择市区"
                :disabled="!activeForm.province"
                name="city"
                @change="handleChange_cities"
              >
                <cookie-option
                  v-for="city of cities"
                  :key="city.adcode"
                  :label="city.name"
                  :value="city.adcode"
                ></cookie-option>
              </cookie-select>
              <cookie-select
                v-model="activeForm.county"
                placeholder="请选择区县"
                :disabled="!activeForm.city"
                name="country"
              >
                <cookie-option
                  v-for="country of countries"
                  :key="country.adcode"
                  :label="country.name"
                  :value="country.adcode"
                ></cookie-option>
              </cookie-select>
            </div>
          </cookie-form-item>
        </div>

        <cookie-form-item class="form_item-text" label="捐募要求" prop="ability">
          <cookie-input
            v-model="activeForm.ability"
            placeholder="请输入捐募要求"
            class="form_item-text-inp"
            type="textarea"
            :border="false"
            :transparent="false"
            name="ability"
          ></cookie-input>
        </cookie-form-item>

        <cookie-form-item class="form_item-text" label="服务职责" prop="responsibility">
          <cookie-input
            v-model="activeForm.responsibility"
            class="form_item-text-inp"
            placeholder="请输入服务职责"
            name="responsibility"
            :border="false"
            :transparent="false"
          ></cookie-input>
        </cookie-form-item>
        <cookie-form-item class="form_item-text" label="福利待遇" prop="welfare">
          <cookie-input
            v-model="activeForm.welfare"
            class="form_item-text-inp"
            placeholder="请输入福利待遇"
            name="welfare"
            :border="false"
            :transparent="false"
          ></cookie-input>
        </cookie-form-item>

        <!-- <cookie-form-item class="form_item-text" label="志愿团体介绍" prop="team">
          <cookie-input
            v-model="activeForm.team"
            class="form_item-text-inp"
            placeholder="请介绍一下志愿团体"
            name="team"
            :border="false"
            :transparent="false"
          ></cookie-input>
        </cookie-form-item> -->

        <cookie-form-item class="form_item-text" label="特殊情况说明" prop="exceptionInfo">
          <cookie-input
            v-model="activeForm.exceptionInfo"
            class="form_item-text-inp"
            placeholder="其他情况说明"
            name="exceptionInfo"
            :border="false"
            :transparent="false"
          ></cookie-input>
        </cookie-form-item>
      </cookie-form>
      <button @click="handleClick_submit">发布活动</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount, ref, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import CookieForm from '../../components/cookie-form/CookieForm.vue';
import CookieFormItem from '../../components/cookie-form/CookieFormItem.vue';
import CookieInput from '../../components/cookie-input/CookieInput.vue';
import CookieSelect from '../../components/cookie-select/CookieSelect.vue';
import CookieOption from '../../components/cookie-select/CookieOption.vue';
import CookieRadio from '../../components/cookie-radio/CookieRadio.vue';
import CookieRadioGroup from '../../components/cookie-radio/CookieRadioGroup.vue';
// import CookieTimePicker from '../components/cookie-time-picker/CookieTimePicker.vue';
import CookieDatePicker from '../../components/cookie-date-picker/CookieDatePicker.vue';
import CookieTimeSelect from '../../components/cookie-time-picker/CookieTimeSelect.vue';
import { getProvincesAPI, getCitiesAPI, getCountriesAPI } from '../../api/map';
import useActiveStore from '../../store/active';

import { Active } from '../../assets/interface';

interface Address {
  adcode: number;
  name: string;
}
const props = defineProps({
  team_id: {
    type: String,
    default: '',
  },
  active_id: {
    type: String,
    default: '',
  },
});
const provinces = ref<Address[]>([]);
const cities = ref<Address[]>([]);
const countries = ref<Address[]>([]);
const activeStore = useActiveStore();
const router = useRouter();

const activeForm = ref<Active>({
  active_name: '',
  active_type: '',
  service_type: '',
  active_cycle: '',
  work_start_at: '',
  work_end_at: '',
  register_time: '',
  province: '',
  city: '',
  county: '',
  peoples: 1,
  ability: '',
  responsibility: '',
  welfare: '',
  exceptionInfo: '',
});
const formRef = ref();
const classOptions = [
  { value: '1', label: '社区性服务' },
  { value: '2', label: '教育性服务' },
  { value: '3', label: '国家性服务' },
];
const rules = {
  active_name: [{ required: true, message: '活动名称不能为空' }],
  active_type: [{ required: true, message: '服务方式必选' }],
  service_type: [{ required: true, message: '服务性质必选' }],
  peoples: [
    { required: true, message: '人数不能为空' },
    {
      required: true,
      pattern: /^[1-9]\d*$/,
      message: '不是一个有效数字',
    },
  ],
  // cycle: [{ required: true, message: '服务周期不能为空' }],
  // deadline: [{ required: true, message: '报名期限不能为空' }],
  // workTime: [{ required: true, message: '工作时间不能为空' }],
  // serviceCycle: [{ required: true, message: '服务周期不能为空' }],
  ability: [{ required: true, message: '捐募要求不能为空' }],
  responsibility: [{ required: true, message: '服务职责不能为空' }],
  welfare: [{ required: true, message: '福利待遇不能为空' }],
  team: [{ required: true, message: '志愿团队信息不能为空' }],
};
// 选择省份后触发更新市区
const handleChange_provinces = async () => {
  // 更新数据之前都得清空
  if (activeForm.value.city || activeForm.value.county) {
    activeForm.value.city = '';
    activeForm.value.county = '';
  }
  cities.value = await getCitiesAPI(activeForm.value.province);
};
// 选择市区后触发更新县区
const handleChange_cities = async () => {
  if (activeForm.value.county) {
    activeForm.value.county = '';
  }
  countries.value = await getCountriesAPI(activeForm.value.city);
};

onBeforeMount(async () => {
  if (activeForm.value.province || activeForm.value.city || activeForm.value.county) {
    activeForm.value.province = '';
    activeForm.value.city = '';
    activeForm.value.county = '';
  }
  provinces.value = await getProvincesAPI();
});

const handleClick_submit = () => {
  formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      const { active_cycle, register_time, ...fields } = activeForm.value;
      if (active_cycle && register_time) {
        const [active_start_at, active_end_at] = active_cycle.split(',');
        const [register_start_at, register_end_at] = register_time.split(',');
        Object.assign(fields, { active_start_at, active_end_at, register_start_at, register_end_at });
        const { active_id } = await activeStore.createActive(fields, props.team_id);
        router.push(`/active/${active_id}`);
      }
    } else {
      console.log('验证失败');
    }
  });
};
</script>
<style scoped>
/* **************************************form容器***************************** */
.form {
}
/* **************************************form-item***************************** */
.form_item {
  /* height: 90px; */
}
.form_item-title {
}
.form_item-title-inp {
}
/* **************************************form_item_group***************************** */
.form_item-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: nowrap;
  gap: 30px;
}
.form__item-group {
  display: flex;
  flex-flow: nowrap;
  justify-content: space-between;
  gap: 30px;
}
/* **************************************form_item-text***************************** */
.form_item-text {
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.form_item-text-inp {
  line-height: 100px;
  height: 100px;
}
.bg {
  background-color: rgb(247, 248, 250);
  overflow: hidden;
}

.block-input-title {
  height: 40px;
}

.block-dialog-container {
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

.block-form-item-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
}

.form-item-section {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  gap: 20px;
}

.block-input-peoples {
  height: 40px;
}

.span-radio {
  height: 40px;
}

.block-input-ability {
  width: 100%;
}
</style>
