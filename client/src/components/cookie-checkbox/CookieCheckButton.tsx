/*
 * @Author: 18300875296 115335632+18300875296@users.noreply.github.com
 * @Date: 2023-09-29 20:50:14
 * @LastEditors: 18300875296 1453622610@qq.com
 * @LastEditTime: 2023-10-12 19:47:03
 * @FilePath: \Testc:\Admin\GitHub\volunteer-server\client\src\components\cookie-checkbox\CookieCheckButton.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { defineComponent, ref, onUnmounted, onMounted, watch } from 'vue';
import CookieCheckboxStyle from './index.module.css';
import { createCheckbox } from './main.ts';

const CookieCheckButton = defineComponent({
  name: 'CookieCheckButton',
  props: {
    label: {
      type: [String, Boolean, Number],
      required: true,
    },
    modelValue: {
      type: Boolean,
      required: false,
      default: false,
    },
    value: {
      type: [String, Boolean, Number],
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { isGroup, eventBus, destroyInstance } = createCheckbox();
    const currentValue = ref(props.modelValue);
    watch(
      () => props.modelValue,
      (value) => {
        currentValue.value = !!value;
      },
    );
    const handleChange = (event: Event): void => {
      if (props.disabled) return;
      const { checked } = event.target;
      if (isGroup && eventBus) {
        eventBus.$emit('updateModelValue', props.value, checked);
      } else {
        emit('update:modelValue', checked);
      }
    };

    onMounted(() => isGroup && eventBus && eventBus.$emit('initModel'));
    onUnmounted(() => isGroup && destroyInstance && destroyInstance());
    return () => (
      <label
        for={`${props.label}_${props.value}`}
        class={{
          [CookieCheckboxStyle.checkButton_container]: true,
          [CookieCheckboxStyle.checkButton_container_disabled]: props.disabled,
          [CookieCheckboxStyle.checkButton_container_selected]: currentValue.value,
        }}
      >
        <input
          class={CookieCheckboxStyle.checkbox_input_origin}
          type={'checkbox'}
          onChange={handleChange}
          id={`${props.label}_${props.value}`}
          value={props.value}
          checked={currentValue.value}
          disabled={props.disabled}
        />
        <span
          class={{
            [CookieCheckboxStyle.checkButton_label]: true,
            [CookieCheckboxStyle.checkButton_label_disabled]: props.disabled,
          }}
        >
          {props.label}
        </span>
      </label>
    );
  },
});
export { CookieCheckButton };
