/*
 * @Author: 18300875296 1453622610@qq.com
 * @Date: 2023-10-10 13:14:34
 * @LastEditors: 18300875296 1453622610@qq.com
 * @LastEditTime: 2023-10-12 19:54:43
 * @FilePath: \Testc:\Admin\GitHub\volunteer-server\client\src\components\cookie-select\CookieOption.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { defineComponent, computed, onMounted, onBeforeUnmount, getCurrentInstance } from 'vue';
import CookieSelectStyle from './index.module.css';
import { injectConfig, InstanceManager_SYMBOL, EventBus_SYMBOL } from './main';

const CookieOption = defineComponent({
  props: {
    label: {
      type: [String, Number],
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
  },

  setup(props) {
    const instance = getCurrentInstance();
    const instanceManager = injectConfig(InstanceManager_SYMBOL);
    const eventBus = injectConfig(EventBus_SYMBOL);
    const { addInstance, removeInstance } = instanceManager;
    const { $emit } = eventBus;
    if (instance) addInstance(instance);
    onBeforeUnmount(() => instance && removeInstance(instance));
    const handleMouseDown = () => $emit('change', props.value);
    return () => (
      <li class={{ [CookieSelectStyle.li_item]: true }} onMousedown={handleMouseDown}>
        {props.label}
      </li>
    );
  },
});
export { CookieOption };
