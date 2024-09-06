import { RuralProducer } from '@prisma/client';
import { CreateRuralProducerDto } from '../dtos/create-rural-producer.dto';
import { UpdateRuralProducerDto } from '../dtos/update-rural-producer.dto';

export interface RuralProducerRepositoryInterface {
  create(
    createRuralProducerDto: CreateRuralProducerDto,
  ): Promise<RuralProducer>;
  findAll(): Promise<RuralProducer[]>;
  findOne(id: string): Promise<RuralProducer>;
  update(
    id: string,
    updateRuralProducerDto: UpdateRuralProducerDto,
  ): Promise<RuralProducer>;
  remove(id: string): Promise<void>;
}
