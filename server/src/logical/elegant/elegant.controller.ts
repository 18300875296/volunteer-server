import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ElegantService } from './elegant.service';
import { CreateElegantDto } from './dto/create-elegant.dto';
import { UpdateElegantDto } from './dto/update-elegant.dto';
import { Roles } from '../role/decorator/role.decorator';
import { Role } from '../role/role.enum';
import { TeamService } from '../team/team.service';

@Controller('elegant')
export class ElegantController {
  constructor(
    private readonly elegantService: ElegantService,
    private readonly teamService: TeamService,
  ) {}

  //创建一篇风采
  @Roles(Role.Admin, Role.SuperAdmin, Role.TeamAdmin)
  @Post('create')
  async create(@Body() createElegantDto: CreateElegantDto, @Req() req: any) {
    const { user } = req;
    const { team_id } = createElegantDto;
    const team = await this.teamService.getTeamEntity(team_id);
    return this.elegantService.create(createElegantDto, user, team);
  }
  @Get()
  findAll() {
    return this.elegantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.elegantService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateElegantDto: UpdateElegantDto) {
    return this.elegantService.update(+id, updateElegantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.elegantService.remove(+id);
  }
}
