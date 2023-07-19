import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';

import { Active, ActiveInfo, ActiveRegister } from '../assets/interface';
import {
  createActiveAPI,
  getActiveAPI,
  getTimestampAPI,
  activeCollectAPI,
  activeRegisterAPI,
  cancelCollectAPI,
  cancelRegisterAPI,
} from '../api/active';

const useActiveStore = defineStore('activeStore', {
  state: () => ({
    active: ref<Active>({
      active_name: '',
      ability: '',
      active_end_at: '',
      active_start_at: '',
      active_type: '',
      city: '',
      county: '',
      exceptionInfo: '',
      peoples: 0,
      province: '',
      register_end_at: '',
      register_start_at: '',
      responsibility: '',
      service_type: '',
      welfare: '',
      application_count: 0,
      work_end_at: '',
      work_start_at: '',
    }),
    countdown: reactive({
      serveTime: 0,
      lastTimestamp: 0,
      diff: 0,
    }),
    activeInfo: ref<ActiveInfo>({
      active_name: '',
      ability: '',
      active_end_at: '',
      active_start_at: '',
      active_type: '',
      city: '',
      county: '',
      exceptionInfo: '',
      peoples: 0,
      province: '',
      register_end_at: '',
      register_start_at: '',
      responsibility: '',
      service_type: '',
      welfare: '',
      application_count: 0,
      work_end_at: '',
      work_start_at: '',
      collect_by_current_user: false,
      register_by_current_user: false,
    }),
    publisher: {},
  }),
  // 相当于计算属性
  getters: {
    address: (state) => `${state.active.province}-${state.active.city}-${state.active.county}`,
    // activeTime: (state) => `${state.active.active_start_at}-${state.active.active_end_at}`,
  },

  actions: {
    async createActive(activeForm: Active, team_id: string) {
      try {
        const res = await createActiveAPI(activeForm, team_id);
        return res.data;
      } catch (error) {
        console.warn('创造活动出错', error);
      }
    },
    async getActive(active_id: string) {
      try {
        const res = await getActiveAPI(active_id);
        this.activeInfo = res.data;
        // Object.assign(this.active, { ...active });
      } catch (error) {
        console.warn('获取活动信息出错', error);
      }
    },
    async getTimestamp() {
      try {
        const res = await getTimestampAPI();
        this.countdown.serveTime = res.data;
        // if (this.countdown.lastTimestamp) {
        //   //  如果上次时间存在计算时间差
        //   this.countdown.diff = this.countdown.serveTime - this.countdown.lastTimestamp;
        // } else {
        //   this.countdown.diff = 0;
        // }
      } catch (error) {
        console.warn('获取服务器时间出错', error);
      }
    },
    async activeCollect(active_id: string) {
      const res = await activeCollectAPI(active_id);
      this.activeInfo.collect_by_current_user = res.data.collect_by_current_user;
    },
    async cancelCollect(active_id: string) {
      const res = await cancelCollectAPI(active_id);
      this.activeInfo.collect_by_current_user = res.data.collect_by_current_user;
    },
    async activeRegister(active_id: string, applyForm: ActiveRegister) {
      await activeRegisterAPI(active_id, applyForm);
    },
    async cancelResister(active_id: string) {
      await cancelRegisterAPI(active_id);
    },
  },

  // persist: [
  //   {
  //     paths: ["createArticle"],
  //     storage: localStorage,
  //   },
  // ],
});

export default useActiveStore;
