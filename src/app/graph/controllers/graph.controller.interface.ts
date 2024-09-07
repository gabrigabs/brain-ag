import { GraphDataResponseDto } from '../dtos/responses/graph-data-response.dto';

export interface GraphControllerInterface {
  getGraphData(): Promise<GraphDataResponseDto>;
}
