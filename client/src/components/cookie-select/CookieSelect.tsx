/*
 * @Author: 18300875296 1453622610@qq.com
 * @Date: 2023-10-10 13:14:21
 * @LastEditors: 18300875296 1453622610@qq.com
 * @LastEditTime: 2023-10-12 20:42:43
 * @FilePath: \Testc:\Admin\GitHub\volunteer-server\client\src\components\cookie-select\CookieSelect.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { defineComponent, ref, computed, watch } from 'vue';
import { CookieInput } from '@/components/cookie-input/CookieInput';
import { CookieIcon } from '@/components/cookie-icon/CookieIcon';
import { useSelectModule, SelectValueType } from './main.ts';
import CookieSelectStyle from './index.module.css';

const CookieSelect = defineComponent({
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    defaultValue: {
      type: [Boolean, String, Number],
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit }) {
    const { currentDisplayName, eventBus } = useSelectModule(); // 初始化
    const isSelect = ref(false);
    // watch(
    //   () => props.modelValue,
    //   () => ,
    // );

    eventBus.$on('updateModelValue', (value: SelectValueType) => emit('update:modelValue', value));
    const handleClick = (): void => {
      isSelect.value = !isSelect.value;
    };

    const handleBlur = () => {
      isSelect.value = false;
    };
    return () => (
      <div class={{ [CookieSelectStyle.select]: true }} onClick={handleClick}>
        <CookieInput
          placeholder={props.placeholder}
          isBorder={false}
          isTransparent={false}
          class={{ [CookieSelectStyle.select_item_inp]: true }}
          modelValue={currentDisplayName.value}
          onBlur={handleBlur}
        />
        <div class={{ [CookieSelectStyle.select_item_btn]: true }}>
          <CookieIcon
            iconName="icon-down"
            class={{ [CookieSelectStyle.drop_down_active]: isSelect.value, [CookieSelectStyle.drop_down]: true }}
          />
        </div>
        {isSelect.value ? <ul class={{ [CookieSelectStyle.list]: true }}>{slots ? slots.default() : null}</ul> : null}
      </div>
    );
  },
});
export { CookieSelect };
