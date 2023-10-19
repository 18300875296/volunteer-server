/*
 * @Author: 18300875296 115335632+18300875296@users.noreply.github.com
 * @Date: 2023-10-01 22:47:18
 * @LastEditors: 18300875296 115335632+18300875296@users.noreply.github.com
 * @LastEditTime: 2023-10-03 11:01:06
 * @FilePath: \Testc:\Admin\GitHub\volunteer-server\client\src\components\cookie-checkbox\index.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */

import { ComponentInternalInstance, provide, inject, Ref, getCurrentInstance } from 'vue';

type CheckboxValueType = string | number | boolean;
type CheckboxPropType = {
  modelValue: CheckboxValueType;
  value: CheckboxValueType;
  label: CheckboxValueType;
  disabled: boolean;
};

type EventBusType = {
  $on: (name: string, callback: (...args: any[]) => void) => number;
  $emit: (name: string, ...args: any[]) => void;
  $off(name: string, ids: number[]): void;
  $clear: () => void;
};

type InstanceMapType = {
  addInstance: (instance: ComponentInternalInstance | null) => void;
  removeInstance: (instance: ComponentInternalInstance | null) => void;
  updateInstance: (_value: CheckboxValueType, mark: boolean) => void;
  destroyInstanceMap: () => void;
};
type CreateCheckboxType = {
  isGroup: boolean;
  eventBus?: EventBusType;
  destroyInstance?: () => void;
};
type CreateGroupType = {
  destroy: () => void;
};
const PARENT_SYMBOL = Symbol('CookieCheckboxGroup'); // 暴露给子件
const EventBus_SYMBOL = Symbol('EventBus');
const InstanceMap_SYMBOL = Symbol('instanceMap');
type ProvideType = {
  [PARENT_SYMBOL]: boolean;
  [EventBus_SYMBOL]: EventBusType;
  [InstanceMap_SYMBOL]: InstanceMapType;
};

const useModelValues = () => {
  let modelMap: Ref<CheckboxValueType[]> | null;
  function initModelValues(modelValue: Ref<CheckboxValueType[]>) {
    modelMap = modelValue;
  }
  function getModelValues(): Ref<CheckboxValueType[]> {
    return modelMap;
  }
  function updateModelValue(value: CheckboxValueType, mark: boolean) {
    if (!value || !modelMap.value) return;
    if (mark) {
      modelMap.value.push(value);
    } else {
      const index = modelMap.value.findIndex((item) => item === value);
      modelMap.value.splice(index, 1);
    }
  }
  function destroyModelMap(): void {
    modelMap = null;
  }
  return { initModelValues, updateModelValue, getModelValues, destroyModelMap };
};

const useInstanceMap = () => {
  const instanceMap: Map<CheckboxValueType, CheckboxPropType> = new Map();
  function addInstance(instance: ComponentInternalInstance | null): void {
    if (!instance) return;
    const { value }: CheckboxPropType = instance.props as CheckboxPropType;
    if (!instanceMap.has(value)) instanceMap.set(value, instance.props as CheckboxPropType);
  }
  function removeInstance(instance: ComponentInternalInstance | null): void {
    if (!instance) return;
    const { value }: CheckboxPropType = instance.props as CheckboxPropType;
    if (instanceMap.has(value)) instanceMap.delete(value);
  }
  function updateInstance(_value: CheckboxValueType, mark: boolean): void {
    if (mark) {
      // modelValue init and add checked
      const props = instanceMap.get(_value);
      if (props) props.modelValue = true;
    } else {
      // cancel checked
      const props = instanceMap.get(_value);
      if (props) props.modelValue = false;
    }
  }
  function destroyInstanceMap(): void {
    instanceMap.clear();
  }
  return { addInstance, removeInstance, updateInstance, destroyInstanceMap };
};

const useEventBus = (): EventBusType => {
  const eventMap: Map<string, { id: number; callback: Function }[]> = new Map();
  let idCounter = 0;
  function $on(name: string, callback: Function): number {
    const events: { id: number; callback: Function }[] | undefined = eventMap.get(name);
    const _events = events ? [...events, { id: idCounter++, callback }] : [{ id: idCounter++, callback }];
    eventMap.set(name, _events);
    return idCounter - 1; // 返回新添加的函数项的 ID
  }
  function $emit(name: string, ...args: any[]): void {
    const events = eventMap.get(name);
    if (events && events.length) {
      events.forEach((_event) => _event.callback(...args));
    } else {
      throw new Error('events is null');
    }
  }
  function $off(name: string, ids: number[]): void {
    if (eventMap.has(name)) {
      const events = eventMap.get(name) as { id: number; callback: Function }[];
      const selectedEvents = ids.map((i) => events.find((event) => event.id === i));
      const _events = new Set(events);
      selectedEvents.forEach((event) => event && _events.delete(event));
      eventMap.set(name, [..._events]);
    }
  }
  function $clear(): void {
    eventMap.clear();
  }
  return { $on, $emit, $off, $clear };
};

const provideConfig = (eventBus: EventBusType, instanceMap: InstanceMapType): void => {
  provide(PARENT_SYMBOL, true);
  provide(EventBus_SYMBOL, eventBus);
  provide(InstanceMap_SYMBOL, instanceMap);
};

const injectConfig = <K extends keyof ProvideType>(key: K, _default?: any): ProvideType[K] => {
  return inject(key, _default) as ProvideType[K];
};

const createGroup = (modelValue: Ref<CheckboxValueType[]>): CreateGroupType => {
  const { initModelValues, updateModelValue, getModelValues, destroyModelMap } = useModelValues(); // 初始化modelValue模块
  const eventBus = useEventBus(); // 创建eventBus
  const instanceMap = useInstanceMap(); // 初始化实例map，存储子组件实例
  const { updateInstance, destroyInstanceMap } = instanceMap;
  // 子组件更新modelValue
  eventBus.$on('updateModelValue', (value: CheckboxValueType, mark: boolean): void => {
    updateInstance(value, mark); // 先修改实例的modelValue
    updateModelValue(value, mark);
  });
  // 子组件挂载触发group的初始化
  eventBus.$on('initModel', () => {
    initModelValues(modelValue);
    getModelValues().value.map((value) => updateInstance(value, true));
  });
  provideConfig(eventBus, instanceMap); // provide config
  function destroy(): void {
    destroyModelMap();
    destroyInstanceMap();
    eventBus.$clear();
  }
  return { destroy };
};

const createCheckbox = (): CreateCheckboxType => {
  const currentInstance = getCurrentInstance();
  const isGroup = injectConfig(PARENT_SYMBOL, false);
  if (!isGroup) return { isGroup };
  const eventBus = injectConfig(EventBus_SYMBOL);
  const { addInstance, removeInstance } = injectConfig(InstanceMap_SYMBOL);
  addInstance(currentInstance);
  function destroyInstance(): void {
    removeInstance(currentInstance);
    eventBus.$clear();
  }
  return { isGroup, eventBus, destroyInstance };
};

export {
  useInstanceMap,
  PARENT_SYMBOL,
  useEventBus,
  injectConfig,
  EventBus_SYMBOL,
  InstanceMap_SYMBOL,
  createGroup,
  createCheckbox,
};
export type { CheckboxValueType };
