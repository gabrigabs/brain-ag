import { Injectable } from '@nestjs/common';
import { GraphServiceInterface } from './graph.service.interface';
import { RuralProducerRepository } from '../../../app/rural-producer/repositories/rural-producer.repository';
import { formatGraphResponse } from '../utils/graph-util';
import { GraphDataResponseDto } from '../dtos/responses/graph-data-response.dto';

@Injectable()
export class GraphService implements GraphServiceInterface {
  constructor(
    private readonly ruralProducerRepository: RuralProducerRepository,
  ) {}
  async getGraphData(): Promise<GraphDataResponseDto> {
    const [farmsByArea, farmsByCrops, farmsByState] = await Promise.all([
      this.ruralProducerRepository.countFarmsAreas(),
      this.ruralProducerRepository.countFarmsByCrops(),
      this.ruralProducerRepository.countFarmsByState(),
    ]);

    return formatGraphResponse(farmsByArea, farmsByCrops, farmsByState);
  }
}
