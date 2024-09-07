import { GraphDataResponseDto } from '../dtos/responses/graph-data-response.dto';

export interface GraphServiceInterface {
  getGraphData(): Promise<GraphDataResponseDto>;
}
