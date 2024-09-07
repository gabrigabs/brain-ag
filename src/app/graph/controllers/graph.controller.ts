import { Controller, Get, Logger } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GraphService } from '../services/graph.service';
import { GraphDataResponseDto } from '../dtos/responses/graph-data-response.dto';
import { GraphControllerInterface } from './graph.controller.interface';

@ApiTags('graph')
@Controller('graph')
export class GraphController implements GraphControllerInterface {
  private logger = new Logger(GraphController.name);
  constructor(private readonly graphService: GraphService) {}

  @ApiOperation({
    summary: 'Gets graphs data',
    description:
      'Retrieve data information of rural producers farms statistics',
  })
  @ApiOkResponse({ type: GraphDataResponseDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get('graph-data')
  getGraphData(): Promise<GraphDataResponseDto> {
    this.logger.log('Getting graph data');
    return this.graphService.getGraphData();
  }
}
