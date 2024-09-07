import { Controller, Get } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GraphService } from '../services/graph.service';
import { GraphDataResponseDto } from '../dtos/responses/graph-data-response.dto';

@ApiTags('graph')
@Controller('graph')
export class GraphController {
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
    return this.graphService.getGraphData();
  }
}
