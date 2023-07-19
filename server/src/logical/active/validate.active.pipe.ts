import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { CreateActiveDto } from './dto/active.create.dto';
import { formatDate, isDateTime } from '../../utils/dayjs';
import { UpdateActiveDto } from './dto/active.update.dto';
import { ActiveEntity } from './entities/active.entity';
import { data } from 'cheerio/lib/api/attributes';

@Injectable()
export class TransformPipe implements PipeTransform {
  async transform(value: UpdateActiveDto, { metatype }: ArgumentMetadata) {
    const activeObject = {};
    Object.assign(activeObject, { ...value });
    for (const key in activeObject) {
      //const keyExists = Object.prototype.hasOwnProperty.call(activeObject, key);
      const field = activeObject[key];
      if (key === 'work_start_at' || key === 'work_end_at') {
        activeObject[key] = formatDate(`2000-01-01${field}:00`, 'HH:mm:ss');
      }
      if (isDateTime(field)) {
        activeObject[key] = formatDate(field, 'YYYY-MM-DD HH:mm:ss');
      }
    }
    return activeObject;
  }
}
