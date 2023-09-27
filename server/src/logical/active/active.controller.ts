import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ActiveService } from './active.service';
// import { UserRepository } from '../user/user.repository';
import { CreateActiveDto } from './dto/active.create.dto';
// import { jwtAuthGuard } from '../auth/guard/auth.jwt.guard';
import { UpdateActiveDto } from './dto/active.update.dto';
import { ArticleGuard } from '../auth/article.guard';
import { ActiveEntity } from './entities/active.entity';
import { ActiveWithStatus } from './active.interface';
import { TransformPipe } from './validate.active.pipe';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Public } from '../auth/decorator/public.decorator';
import { Roles } from '../role/decorator/role.decorator';
import { Role } from '../role/role.enum';
import { CustomParam, RequestUser } from 'src/types/app.interface';
import { TeamService } from '../team/team.service';
import { UserService } from '../user/user.service';

@Controller('active')
export class ActiveController {
  constructor(
    private readonly activeService: ActiveService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly teamService: TeamService,
    private readonly userService: UserService,
  ) {}
  // 管理员获取所有的活动
  @Roles(Role.Admin, Role.SuperAdmin)
  @Get('list')
  async getActivesByAdmin() {
    return await this.activeService.getActivesList();
  }
  /*******************************获取志愿活动列表*************************************/
  //获取所有活动数据(分页)
  @Public()
  @Get('all')
  async getActives(
    @Query('page') page: number,
    @Query('pagesize') pagesize: number,
  ) {
    return await this.activeService.getActives(+page, +pagesize);
  }
  //获取按时间排序的活动列表(分页)
  @Public()
  @Get('newest')
  async getNewest(
    @Query('page') page: number,
    @Query('pagesize') pagesize: number,
  ) {
    return await this.activeService.getListByTime(+page, +pagesize);
  }
  // 获取按点赞排序的活动列表(分页)
  @Public()
  @Get('likes')
  async getListByLikes(
    @Query('page') page: number,
    @Query('pagesize') pagesize: number,
  ) {
    return await this.activeService.getByLikes(+page, +pagesize);
  }
  // 获取按收藏排序的活动列表(分页)
  @Public()
  @Get('collects')
  async getListByCollects(
    @Query('page') page: number,
    @Query('pagesize') pagesize: number,
  ) {
    return await this.activeService.getListByCollects(+page, +pagesize);
  }
  // 关键字搜索活动(分页)
  @Public()
  @Get('keyword')
  async getListByKeywords(@Query() query) {
    return await this.activeService.getListByKeywords(
      query.keyword,
      +query.page,
      +query.pageSize,
    );
  }
  // 通过标签进行搜索(分页)
  @Public()
  @Get('tag')
  async getListByTags(@Query() query) {
    return await this.activeService.getListByTags(
      query.tags,
      +query.page,
      +query.pageSize,
    );
  }
  // 通过地区进行搜索(分页)
  @Get('province')
  async getListByProvince(@Query() query) {
    return await this.activeService.getListByProvince(
      query.province,
      +query.page,
      +query.pageSize,
    );
  }
  // 通过市区进行搜索(分页)
  @Public()
  @Get('city')
  async getListByCity(@Query() query) {
    return await this.activeService.getListByCity(
      query.city,
      +query.page,
      +query.pageSize,
    );
  }
  // 通过服务性质进行搜索(分页)
  @Public()
  @Get('type')
  async getListByType(@Query() query) {
    return await this.activeService.getListByType(
      query.type,
      +query.page,
      +query.pageSize,
    );
  }
  /*******************************活动CURD*************************************/
  // 获取活动的倒计时
  @Public()
  @Get('timestamp')
  async getTimestamp() {
    return await this.activeService.timeStamp();
  }
  // 创造活动
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin)
  @Post('create/:team_id')
  async create(
    @Param() param: CustomParam,
    @Body(TransformPipe) createActiveDto: CreateActiveDto,
    @Req() req: any,
  ) {
    const { team_id } = param;
    const { user_id } = req.user;
    const user = await this.userService.getUserInfo(user_id); //获得管理者信息
    const team = await this.teamService.getTeamInfo(team_id); // 获得团队实体信息
    return this.activeService.createActive(createActiveDto, user, team);
  }

  // 修改某一个活动信息
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin)
  @Patch('update/:active_id')
  async update(
    @Param('active_id') active_id: string,
    @Body(TransformPipe) updateActive: UpdateActiveDto,
  ) {
    return await this.activeService.updateById(active_id, updateActive);
  }

  // 删除某一个活动
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin)
  @Delete('delete/:active_id')
  delete(@Param('active_id') active_id: string) {
    return this.activeService.delateById(active_id);
  }
  // 获取某一个活动
  @Public()
  @UseGuards(ArticleGuard)
  @Get('/:active_id')
  async getOne(
    @Param('active_id') active_id: string,
    @Req() req: RequestUser,
  ): Promise<ActiveEntity | ActiveWithStatus> {
    const { user_id } = req.user;
    // const user = user_id > 0 ? user_id : null;
    // -1为问题用户 1为正常用户 如果用户携带有效令牌就得返回和当前用户相关联的信息 否则只返回普通信息
    return await this.activeService.getActive(active_id, user_id);
  }

  /*******************************活动报名CURD*************************************/

  /*******************************收藏活动CURD*************************************/
  // 增加收藏活动
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin, Role.User)
  @Patch(':active_id/collect')
  async createCollect(@Param('active_id') active_id: number) {
    return;
  }
  // 删除收藏活动
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin, Role.User)
  @Patch(':active_id/uncollect')
  async deleteCollect(@Param('active_id') active_id: number) {
    return;
  }

  /*******************************活动点赞CURD*************************************/
  /*******************************活动评论CURD*************************************/
  /*******************************活动后期申请奖品CURD*************************************/
  // 团队管理员获取所有的活动
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin)
  @Get(':team_id/all')
  async getTeamActives(@Param('team_id') team_id: string) {
    return await this.activeService.getTeamActives(team_id);
  }
}
