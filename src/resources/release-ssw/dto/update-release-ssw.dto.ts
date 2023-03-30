import { PartialType } from '@nestjs/mapped-types';
import { CreateReleaseSswDto } from './create-release-ssw.dto';

export class UpdateReleaseSswDto extends PartialType(CreateReleaseSswDto) {
  id: number;
}
