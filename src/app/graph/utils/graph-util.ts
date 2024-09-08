import {
  FarmsAreaData,
  PlantedCropsFarmData,
  StateCountFarmData,
} from 'src/app/rural-producer/types/rural-producer.types';
import { GraphDataResponseDto } from '../dtos/responses/graph-data-response.dto';
import { CropQuantityDto } from '../dtos/crop-quantity.dto';
import { FarmByStateDto } from '../dtos/farm-by-state.dto';

export const formatGraphResponse = (
  farmsByArea: FarmsAreaData,
  farmsByCrops: PlantedCropsFarmData[],
  farmsByState: StateCountFarmData[],
): GraphDataResponseDto => ({
  totalFarms: farmsByArea?.count,
  farmsAreaInfo: {
    farmsTotalArea: +farmsByArea?.farmsTotalArea,
    farmsArableArea: +farmsByArea?.farmsArableArea,
    farmsVegetationArea: +farmsByArea?.farmsVegetationArea,
  },
  cropsQuantity: mapFarmsByCrops(farmsByCrops),
  farmsByState: mapFarmsByState(farmsByState),
});

const mapFarmsByCrops = (
  farmsByCrops: PlantedCropsFarmData[],
): CropQuantityDto[] => {
  const result: { [crop: string]: number } = {};

  farmsByCrops.forEach((farm) => {
    farm.plantedCrops.forEach((crop) => {
      result[crop] ? (result[crop] += farm.count) : (result[crop] = farm.count);
    });
  });

  return Object.keys(result).map((crop) => ({ crop, qtd: result[crop] }));
};

const mapFarmsByState = (
  farmsByState: StateCountFarmData[],
): FarmByStateDto[] =>
  farmsByState?.map((state) => ({
    state: state.state,
    qtd: state.count,
  }));
