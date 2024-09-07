import { Injectable, Logger } from '@nestjs/common';
import { GraphServiceInterface } from './graph.service.interface';
import { RuralProducerRepository } from '../../../app/rural-producer/repositories/rural-producer.repository';
import { formatGraphResponse } from '../utils/graph-util';
import { GraphDataResponseDto } from '../dtos/responses/graph-data-response.dto';

@Injectable()
export class GraphService implements GraphServiceInterface {
  private readonly logger = new Logger(GraphService.name);
  constructor(
    private readonly ruralProducerRepository: RuralProducerRepository,
  ) {}
  async getGraphData(): Promise<GraphDataResponseDto> {
    this.logger.log('Getting graph data from repository and building response');

    const [farmsByArea, farmsByCrops, farmsByState] = await Promise.all([
      this.ruralProducerRepository.countFarmsAreas(),
      this.ruralProducerRepository.countFarmsByCrops(),
      this.ruralProducerRepository.countFarmsByState(),
    ]);

    return formatGraphResponse(farmsByArea, farmsByCrops, farmsByState);
  }
}
