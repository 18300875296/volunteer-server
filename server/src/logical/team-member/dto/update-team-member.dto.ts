import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamMember } from './create-team-member.dto';

export class UpdateTeamMemberDto extends PartialType(CreateTeamMember) {}
