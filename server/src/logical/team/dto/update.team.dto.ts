import { PartialType } from '@nestjs/mapped-types';

import { CreateTeam } from './create.team.dto';

export class UpdateTeam extends PartialType(CreateTeam) {}
