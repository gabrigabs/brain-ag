import { RuralProducer } from '@prisma/client';
import { CreateRuralProducerDto } from '../dtos/create-rural-producer.dto';
import { UpdateRuralProducerDto } from '../dtos/update-rural-producer.dto';

export interface RuralProducerServiceInterface {
  registerProducer(producer: CreateRuralProducerDto): Promise<RuralProducer>;
  getAllProducers(): Promise<RuralProducer[]>;
  getProducerById(id: string): Promise<RuralProducer | null>;
  updateProducerInfo(
    id: string,
    updateProducerDto: UpdateRuralProducerDto,
  ): Promise<RuralProducer>;
  deleteProducer(id: string): Promise<void>;
}
