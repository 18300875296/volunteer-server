import { ActiveEntity } from './entities/active.entity';
export enum ActiveState {
  NotStart = '未开始',
  register = '报名中',
  Ongoing = '进行中',
  Over = '已结束',
}
export interface ActiveWithStatus extends ActiveEntity {
  like_by_current_user: boolean;
  collect_by_current_user: boolean;
}
