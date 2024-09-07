import { RuralProducer } from '@prisma/client';
import { CreateRuralProducerRequestDto } from '../dtos/requests/create-rural-producer-request.dto';
import { UpdateRuralProducerRequestDto } from '../dtos/requests/update-rural-producer-request.dto';

export interface RuralProducerRepositoryInterface {
  create(ruralProducer: CreateRuralProducerRequestDto): Promise<RuralProducer>;
  findAll(): Promise<RuralProducer[]>;
  findOne(id: string): Promise<RuralProducer | null>;
  update(
    id: string,
    ruralProducer: UpdateRuralProducerRequestDto,
  ): Promise<RuralProducer>;
  remove(id: string): Promise<void>;
}
