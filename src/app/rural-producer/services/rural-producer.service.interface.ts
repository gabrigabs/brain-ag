import { RuralProducer } from '@prisma/client';
import { CreateRuralProducerRequestDto } from '../dtos/requests/create-rural-producer-request.dto';
import { UpdateRuralProducerRequestDto } from '../dtos/requests/update-rural-producer-request.dto';

export interface RuralProducerServiceInterface {
  registerProducer(
    ruralProducer: CreateRuralProducerRequestDto,
  ): Promise<RuralProducer>;
  getAllProducers(): Promise<RuralProducer[]>;
  getProducerById(id: string): Promise<RuralProducer>;
  updateProducerInfo(
    id: string,
    ruralProducerUpdate: UpdateRuralProducerRequestDto,
  ): Promise<RuralProducer>;
  deleteProducer(id: string): Promise<void>;
}
