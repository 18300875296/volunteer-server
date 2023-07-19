import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamApplicationDto } from './create-team-application.dto';

export class UpdateTeamApplicationDto extends PartialType(CreateTeamApplicationDto) {}
