import { RuralProducer } from '@prisma/client';
import { CreateRuralProducerDto } from '../dtos/create-rural-producer.dto';
import { UpdateRuralProducerDto } from '../dtos/update-rural-producer.dto';

export interface RuralProducerControllerInterface {
  createRuralProducer(
    createRuralProducerDto: CreateRuralProducerDto,
  ): Promise<RuralProducer>;
  getAllRuralProducers(): Promise<RuralProducer[]>;
  getRuralProducerById(id: string): Promise<RuralProducer | null>;
  updateRuralProducer(
    id: string,
    updateRuralProducerDto: UpdateRuralProducerDto,
  ): Promise<RuralProducer>;
  deleteRuralProducer(id: string): Promise<void>;
}
