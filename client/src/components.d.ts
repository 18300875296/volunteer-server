
import '@vue/runtime-core'
import dayjs from "dayjs";
export {};

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    RouterLink: typeof import("vue-router")["RouterLink"];
    RouterView: typeof import("vue-router")["RouterView"];
  }
  export interface GlobalCustomMethods {
    formatRelativeTime: dayjs;
  }
}
