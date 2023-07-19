import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamMemberApplicationDto } from './create-team-member-application.dto';

export class UpdateTeamMemberApplicationDto extends PartialType(CreateTeamMemberApplicationDto) {}
