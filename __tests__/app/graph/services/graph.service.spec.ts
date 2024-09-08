import { Test, TestingModule } from '@nestjs/testing';
import { GraphService } from '../../../../src/app/graph/services/graph.service';
import { Logger } from '@nestjs/common';
import { GraphModule } from '../../../../src/app/graph/graph.module';
import { RuralProducerRepository } from '../../../../src/app/rural-producer/repositories/rural-producer.repository';
import { PrismaService } from '../../../../src/app/prisma/services/prisma.service';
import {
  countFarmsByCropsFormatedMock,
  countFarmsByStateFormatedMock,
  farmsTotalAreaFormatedMock,
} from '../../..//app/rural-producer/mocks/rural-producer.mocks';
import { graphDataResponseMock } from '../mocks/graph.mocks';

describe('GraphService', () => {
  let graphService: GraphService;
  let ruralProducerRepository: RuralProducerRepository;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [GraphModule],
      providers: [PrismaService, RuralProducerRepository, GraphService],
    }).compile();

    graphService = moduleRef.get<GraphService>(GraphService);
    ruralProducerRepository = moduleRef.get<RuralProducerRepository>(
      RuralProducerRepository,
    );

    Logger.prototype.log = jest.fn();
  });

  it('should return graph data', async () => {
    jest
      .spyOn(ruralProducerRepository, 'countFarmsAreas')
      .mockResolvedValue(farmsTotalAreaFormatedMock);
    jest
      .spyOn(ruralProducerRepository, 'countFarmsByCrops')
      .mockResolvedValue(countFarmsByCropsFormatedMock);
    jest
      .spyOn(ruralProducerRepository, 'countFarmsByState')
      .mockResolvedValue(countFarmsByStateFormatedMock);

    const result = await graphService.getGraphData();
    expect(Logger.prototype.log).toHaveBeenCalledWith(
      'Getting graph data from repository and building response',
    );
    expect(ruralProducerRepository.countFarmsAreas).toHaveBeenCalled();
    expect(ruralProducerRepository.countFarmsByCrops).toHaveBeenCalled();
    expect(ruralProducerRepository.countFarmsByState).toHaveBeenCalled();

    expect(result).toEqual(graphDataResponseMock);
  });
});
