import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GraphService } from '../services/graph.service';
import { GraphDataResponseDto } from '../dtos/responses/graph-data-response.dto';

@ApiTags('graph')
@Controller('graph')
export class GraphController {
  constructor(private readonly graphService: GraphService) {}

  @Get('graph-data')
  getGraphData(): Promise<GraphDataResponseDto> {
    return this.graphService.getGraphData();
  }
}
