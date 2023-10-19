/*
 * @Author: 18300875296 1453622610@qq.com
 * @Date: 2023-10-10 13:21:21
 * @LastEditors: 18300875296 1453622610@qq.com
 * @LastEditTime: 2023-10-12 19:35:14
 * @FilePath: \Testc:\Admin\GitHub\volunteer-server\client\src\components\cookie-select\main.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { ComponentInternalInstance, provide, inject, ref, Ref } from 'vue';

type SelectValueType = string | number | boolean;
type SelectPropType = {
  modelValue: SelectValueType;
  placeholder: SelectValueType;
  disabled: boolean;
  label: SelectValueType;
};
type OptionPropType = {
  label: SelectValueType;
  value: SelectValueType;
};
type EventBusType = {
  $on: (name: string, callback: (...args: any[]) => void) => number;
  $emit: (name: string, ...args: any[]) => void;
  $off(name: string, ids: number[]): void;
  $clear: () => void;
};
type InstanceManager = {
  addInstance: (instance: ComponentInternalInstance | null) => void;
  removeInstance: (instance: ComponentInternalInstance | null) => void;
  destroyInstanceManager: () => void;
  updateInstance: (value: SelectValueType) => SelectValueType;
};
type ProvideType = {
  [InstanceManager_SYMBOL]: InstanceManager;
  [EventBus_SYMBOL]: EventBusType;
};

const InstanceManager_SYMBOL = Symbol('InstanceManager');
const EventBus_SYMBOL = Symbol('EventBus');

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
const useInstanceMap = (): InstanceManager => {
  const instanceMap: Map<SelectValueType, OptionPropType> = new Map();
  function addInstance(instance: ComponentInternalInstance | null): void {
    if (!instance) return;
    const { value } = instance.props as OptionPropType;
    if (!instanceMap.has(value)) instanceMap.set(value, instance.props as OptionPropType);
  }
  function removeInstance(instance: ComponentInternalInstance | null): void {
    if (!instance) return;
    const { value } = instance.props as OptionPropType;
    if (instanceMap.has(value)) instanceMap.delete(value);
  }

  function updateInstance(value: SelectValueType): SelectValueType {
    let currentDisplayName = null;
    instanceMap.forEach((instance) => {
      if (instance.value === value) currentDisplayName = instance.label;
    });
    return currentDisplayName ?? '';
  }
  function destroyInstance(): void {
    instanceMap.clear();
  }
  return { addInstance, removeInstance, destroyInstance, updateInstance };
};

const provideConfig = (instanceManager: InstanceManager, eventBus: EventBusType): void => {
  provide(InstanceManager_SYMBOL, instanceManager);
  provide(EventBus_SYMBOL, eventBus);
};

const injectConfig = <K extends keyof ProvideType>(key: K, _default?: any): ProvideType[K] => {
  return inject(key, _default) as ProvideType[K];
};

const useSelectModule = () => {
  const currentDisplayName = ref<SelectValueType>('');
  const instanceManager = useInstanceMap();
  const { updateInstance } = instanceManager;
  const eventBus = useEventBus(); // 创建eventBus
  eventBus.$on('change', (value: SelectValueType) => {
    currentDisplayName.value = updateInstance(value); // 更新input的value
    eventBus.$emit('updateModelValue', value); // 更新父组件的modelValue
  });

  provideConfig(instanceManager, eventBus);
  return { currentDisplayName, eventBus };
};
export { useSelectModule, injectConfig, InstanceManager_SYMBOL, EventBus_SYMBOL };
export type { SelectValueType };
