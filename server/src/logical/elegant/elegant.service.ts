import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateElegantDto } from './dto/create-elegant.dto';
import { UpdateElegantDto } from './dto/update-elegant.dto';
import createSummary from '../../utils/parseHTML';
import { ElegantEntity } from './entities/elegant.entity';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamEntity } from '../team/entities/team.entity';

@Injectable()
export class ElegantService {
  constructor(
    @InjectRepository(ElegantEntity)
    private readonly elegantRepository: Repository<ElegantEntity>,
  ) {}
  validArticle(title: string, content: string): boolean {
    if (!title) {
      throw new HttpException('文章缺少标题', HttpStatus.BAD_REQUEST);
    }
    if (!content) {
      throw new HttpException('文章缺少内容', HttpStatus.BAD_REQUEST);
    }
    // if (!tags) {
    //   throw new HttpException('文章缺少标签', HttpStatus.BAD_REQUEST);
    // }
    return true;
  }
  // 截取文章摘要
  makePrefix(content: string): string {
    const html = JSON.parse(decodeURIComponent(content));
    const summary = createSummary(html);
    if (!summary) {
      throw Error('文本解析出错');
    }
    return summary;
  }
  async create(
    elegant: CreateElegantDto,
    user: UserEntity,
    team: TeamEntity,
  ): Promise<any> {
    const { title, content, images } = elegant;
    const validate = this.validArticle(title, content);
    if (validate) {
      try {
        const summary = this.makePrefix(content); // 生成摘要
        const elegant = new ElegantEntity();
        elegant.title = title;
        elegant.content = content;
        elegant.images = images;
        elegant.summary = summary;
        elegant.user = user;
        elegant.team = team;
        await this.elegantRepository.save(elegant); //存文章数据
      } catch (error) {
        throw new HttpException(
          `服务端出错${error}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  findAll() {
    return `This action returns all elegant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} elegant`;
  }

  update(id: number, updateElegantDto: UpdateElegantDto) {
    return `This action updates a #${id} elegant`;
  }

  remove(id: number) {
    return `This action removes a #${id} elegant`;
  }
}
