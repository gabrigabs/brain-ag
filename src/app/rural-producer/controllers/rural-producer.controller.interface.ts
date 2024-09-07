import { CreateRuralProducerRequestDto } from '../dtos/requests/create-rural-producer-request.dto';
import { UpdateRuralProducerRequestDto } from '../dtos/requests/update-rural-producer-request.dto';
import { RuralProducerResponseDto } from '../dtos/responses/rural-producer-response.dto';

export interface RuralProducerControllerInterface {
  createRuralProducer(
    createRuralProducerDto: CreateRuralProducerRequestDto,
  ): Promise<RuralProducerResponseDto>;
  getAllRuralProducers(): Promise<RuralProducerResponseDto[]>;
  getRuralProducerById(id: string): Promise<RuralProducerResponseDto>;
  updateRuralProducer(
    id: string,
    updateRuralProducerDto: UpdateRuralProducerRequestDto,
  ): Promise<RuralProducerResponseDto>;
  deleteRuralProducer(id: string): Promise<void>;
}
