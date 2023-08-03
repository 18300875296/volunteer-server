import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import updateLocale from 'dayjs/plugin/updateLocale';
import { App } from 'vue';

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s前',
    s: '%d 秒',
    m: '1 分钟 ',
    mm: '%d 分钟',
    h: '1 小时',
    hh: '%d 小时',
    d: '1 天',
    dd: '%d 天',
    M: '1 月',
    MM: '%d 月',
    y: '1 年',
    yy: '%d 年',
  },
});

const dayjsPlugin = {
  install(app: App): void {
    const $app = app;
    $app.config.globalProperties.$dayjs = dayjs;
    $app.config.globalProperties.$formatRelativeTime = function (time: Date): any {
      return dayjs(time).fromNow();
    };
    $app.config.globalProperties.$formatTime = function (time: Date): any {
      return dayjs(time).format('YYYY-MM-DD');
    };
    $app.config.globalProperties.$formatMDHS = function (time: Date): any {
      return dayjs(time).format('MM-DD HH:mm:ss ');
    };
    $app.config.globalProperties.$countdownTimestamp = (start: Date, end: Date) => {
      const date1 = dayjs(start);
      const date2 = dayjs(end);
      const diff = date2.diff(date1);
      return Math.floor(diff / 1000);
    };
  },
};
export default dayjsPlugin;
