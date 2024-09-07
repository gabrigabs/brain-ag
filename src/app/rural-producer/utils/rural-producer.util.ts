export const validateFarmArea = (
  farmTotalArea: number,
  farmArableArea: number,
  farmVegetationArea: number,
): boolean => {
  const isValid = farmTotalArea >= farmArableArea + farmVegetationArea;

  return isValid;
};
