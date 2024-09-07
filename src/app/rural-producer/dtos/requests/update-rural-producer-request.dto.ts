import { PartialType } from '@nestjs/swagger';
import { CreateRuralProducerRequestDto } from './create-rural-producer-request.dto';

export class UpdateRuralProducerRequestDto extends PartialType(
  CreateRuralProducerRequestDto,
) {}
