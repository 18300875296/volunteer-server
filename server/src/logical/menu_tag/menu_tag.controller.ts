import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MenuTagService } from './menu_tag.service';
import { CreateMenuTagDto } from './dto/create-menu_tag.dto';
import { UpdateMenuTagDto } from './dto/update-menu_tag.dto';

@Controller('menu_tag')
export class MenuTagController {
  constructor(private readonly menuTagService: MenuTagService) {}
}
