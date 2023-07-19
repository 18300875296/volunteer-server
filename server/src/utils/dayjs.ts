import * as dayjs from 'dayjs';
export const formatDate = (timeString: string, format: string) =>
  dayjs(timeString).format(format);
export const getCurrentTimestamp = () => dayjs().unix();
// 判断时间是否是有效的字符串
export const isDateTime = (time: string) => dayjs(time).isValid();
export const diffTime = (start: string | Date, end: string | Date) =>
  dayjs(end).diff(dayjs(start));
