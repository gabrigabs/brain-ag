import {
  FarmsAreaData,
  PlantedCropsFarmData,
  StateCountFarmData,
} from '../types/rural-producer.types';

export const validateFarmArea = (
  farmTotalArea: number,
  farmArableArea: number,
  farmVegetationArea: number,
): boolean => {
  const isValid = farmTotalArea >= farmArableArea + farmVegetationArea;

  return isValid;
};

export const formatFarmsByStateResponse = (data): StateCountFarmData[] =>
  data.map((item) => ({
    state: item.state,
    count: item._count._all,
  }));

export const formatFarmsByCropsResponse = (data): PlantedCropsFarmData[] =>
  data.map((item) => ({
    plantedCrops: item.plantedCrops,
    count: item._count._all,
  }));

export const formatFarmsTotalAreaResponse = (data): FarmsAreaData => ({
  farmsTotalArea: data._sum.farmTotalArea,
  farmsArableArea: data._sum.farmArableArea,
  farmsVegetationArea: data._sum.farmVegetationArea,
  count: data._count._all,
});
