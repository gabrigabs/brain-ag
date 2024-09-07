import { RuralProducer } from '@prisma/client';
import { CreateRuralProducerRequestDto } from '../dtos/requests/create-rural-producer-request.dto';
import { UpdateRuralProducerRequestDto } from '../dtos/requests/update-rural-producer-request.dto';
import {
  AggregatedFarmsData,
  PlantedCropsFarmData,
  StateCountFarmData,
} from '../types/rural-producer.types';

export interface RuralProducerRepositoryInterface {
  addRuralProducer(
    ruralProducer: CreateRuralProducerRequestDto,
  ): Promise<RuralProducer>;
  findAllRuralProducers(): Promise<RuralProducer[]>;
  findOneRuralProducer(id: string): Promise<RuralProducer | null>;
  updateOneRuralProducer(
    id: string,
    ruralProducer: UpdateRuralProducerRequestDto,
  ): Promise<RuralProducer>;
  removeOneRuralProducer(id: string): Promise<void>;
  countFarmsByState(): Promise<StateCountFarmData[]>;
  countFarmsByCrops(): Promise<PlantedCropsFarmData[]>;
  countFarmsAreas(): Promise<AggregatedFarmsData>;
}
