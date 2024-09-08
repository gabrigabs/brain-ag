import { Test, TestingModule } from '@nestjs/testing';
import { GraphController } from '../../../../src/app/graph/controllers/graph.controller';
import { GraphService } from '../../../../src/app/graph/services/graph.service';
import { Logger } from '@nestjs/common';
import { GraphModule } from '../../../../src/app/graph/graph.module';
import { graphDataResponseMock } from '../mocks/graph.mocks';
import { RuralProducerRepository } from '../../../../src/app/rural-producer/repositories/rural-producer.repository';
import { PrismaService } from '../../../../src/app/prisma/services/prisma.service';

describe('GraphController', () => {
  let graphController: GraphController;
  let graphService: GraphService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [GraphModule],
      controllers: [GraphController],
      providers: [PrismaService, RuralProducerRepository, GraphService, Logger],
    }).compile();

    graphController = moduleRef.get<GraphController>(GraphController);
    graphService = moduleRef.get<GraphService>(GraphService);

    Logger.prototype.log = jest.fn();
  });

  it('should return graph data', async () => {
    jest
      .spyOn(graphService, 'getGraphData')
      .mockResolvedValue(graphDataResponseMock);

    const result = await graphController.getGraphData();
    expect(Logger.prototype.log).toHaveBeenCalledWith('Getting graph data');
    expect(graphService.getGraphData).toHaveBeenCalled();
    expect(result).toEqual(graphDataResponseMock);
  });
});
