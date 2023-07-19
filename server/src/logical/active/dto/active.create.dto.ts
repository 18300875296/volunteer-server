import { IsNotEmpty, IsNumber, IsString, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateActiveDto {
  // @IsNotEmpty({ message: '活动名称不能为空' })
  active_name: string;

  // @IsNotEmpty({ message: '活动类型不能为空' })
  active_type: string;

  // @IsNotEmpty({ message: '服务类型不能为空' })
  service_type: string;

  // @IsNotEmpty({ message: '工作时长不能为空' })
  // @IsDateString()
  // @Type(() => Date)
  work_start_at: string;

  work_end_at: string;

  // @IsNotEmpty({ message: '活动开始时间不能为空' })
  // @IsDateString()
  // @Type(() => Date)
  active_start_at: string;

  // @IsNotEmpty({ message: '活动结束时间不能为空' })
  // @IsDateString()
  // @Type(() => Date)
  active_end_at: string;

  // @IsNotEmpty({ message: '福利待遇不能为空' })
  welfare: string;

  exceptionInfo?: string;

  // @IsNotEmpty({ message: '报名开始时间不能为空' })
  // @IsDateString()
  // @Type(() => Date)
  register_start_at: string;

  // @IsNotEmpty({ message: '报名结束时间不能为空' })
  // @IsDateString()
  // @Type(() => Date)
  register_end_at: string;

  // @IsNotEmpty({ message: '活动省份不能为空' })
  province: string;

  // @IsNotEmpty({ message: '活动城市不能为空' })
  city: string;

  // @IsNotEmpty({ message: '活动县区不能为空' })
  county: string;

  // @IsNotEmpty({ message: '捐募人数不能为空' })
  // @IsNumber()
  peoples: number;

  // @IsNotEmpty({ message: '捐募要求不能为空' })
  ability: string;

  // @IsNotEmpty({ message: '任职责任不能为空' })
  responsibility: string;

  // @IsNotEmpty({ message: '团队介绍不能为空' })
  team_info: string;
}
