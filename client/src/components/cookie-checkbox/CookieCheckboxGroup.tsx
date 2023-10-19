/*
 * @Author: 18300875296 115335632+18300875296@users.noreply.github.com
 * @Date: 2023-09-30 20:33:16
 * @LastEditors: 18300875296 115335632+18300875296@users.noreply.github.com
 * @LastEditTime: 2023-10-03 20:11:54
 * @FilePath: \Testc:\Admin\GitHub\volunteer-server\client\src\components\cookie-checkbox\CookieCheckboxGroup.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { defineComponent, ref, PropType, onBeforeUnmount } from 'vue';
import { CheckboxValueType, createGroup } from './main.ts';
import CookieCheckboxStyle from './index.module.css';

const CookieCheckboxGroup = defineComponent({
  name: 'CookieCheckboxGroup',
  props: {
    modelValue: {
      type: Array as PropType<CheckboxValueType[]>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const { destroy } = createGroup(ref(props.modelValue));
    onBeforeUnmount(() => destroy());
    return () => (
      <div
        class={{
          [CookieCheckboxStyle.checkbox_group_container]: true,
        }}
      >
        {slots ? slots.default() : null}
      </div>
    );
  },
});
export { CookieCheckboxGroup };
