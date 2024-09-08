import { CropsEnum } from '../../../../src/app/rural-producer/enums/crops.enum';
import { StatesEnum } from '../../../../src/app/rural-producer/enums/states.enum';

export const ruralProducerRequestMock = {
  cpfOrCnpj: '48436293088',
  producerName: 'John Doe',
  farmName: "John Doe's farm",
  city: 'Fortaleza',
  state: StatesEnum.CE,
  farmTotalArea: 100000,
  farmArableArea: 50000,
  farmVegetationArea: 50000,
  plantedCrops: [CropsEnum.CAFE],
};

export const ruralProducerRequestInvalidCpfMock = {
  cpfOrCnpj: '0000000000000',
  producerName: 'John Doe',
  farmName: "John Doe's farm",
  city: 'Fortaleza',
  state: StatesEnum.CE,
  farmTotalArea: 100000,
  farmArableArea: 50000,
  farmVegetationArea: 50000,
  plantedCrops: [CropsEnum.CAFE],
};

export const ruralProducerRequestInvalidAreaMock = {
  cpfOrCnpj: '48436293088',
  producerName: 'John Doe',
  farmName: "John Doe's farm",
  city: 'Fortaleza',
  state: StatesEnum.CE,
  farmTotalArea: 50000,
  farmArableArea: 50000,
  farmVegetationArea: 50000,
  plantedCrops: [CropsEnum.CAFE],
};

export const ruralProducerResponseMock = {
  id: '024658cc-6248-4153-840b-47af085e0be1',
  cpfOrCnpj: '484.362.930-88',
  producerName: 'John Doe',
  farmName: "John Doe's farm",
  city: 'Fortaleza',
  state: 'CE',
  farmTotalArea: 100000,
  farmArableArea: 50000,
  farmVegetationArea: 50000,
  plantedCrops: ['CAFÉ', 'CANA DE AÇUCAR', 'SOJA'],
};

export const farmsByStateUnformatedMock = [
  {
    state: 'CE',
    _count: {
      _all: 5,
    },
  },
  {
    state: 'SP',
    _count: {
      _all: 3,
    },
  },
];

export const farmsByCropsUnformatedMock = [
  {
    plantedCrops: ['CAFE', 'CANA DE AÇUCAR'],
    _count: {
      _all: 1,
    },
  },
  {
    plantedCrops: ['CAFE'],
    _count: {
      _all: 4,
    },
  },
  {
    plantedCrops: ['CANA DE AÇUCAR'],
    _count: {
      _all: 2,
    },
  },
];

export const countFarmsByStateFormatedMock = [
  {
    state: 'CE',
    count: 5,
  },
  {
    state: 'SP',
    count: 3,
  },
];

export const countFarmsByCropsFormatedMock = [
  {
    plantedCrops: ['CAFE', 'CANA DE AÇUCAR'],
    count: 1,
  },
  {
    plantedCrops: ['CAFE'],
    count: 4,
  },
  {
    plantedCrops: ['CANA DE AÇUCAR'],
    count: 2,
  },
];

export const farmsTotalAreaUnformatedMock = {
  _sum: {
    farmTotalArea: 100000,
    farmArableArea: 50000,
    farmVegetationArea: 50000,
  },
  _count: {
    _all: 3,
  },
};

export const farmsTotalAreaFormatedMock = {
  farmsTotalArea: 100000,
  farmsArableArea: 50000,
  farmsVegetationArea: 50000,
  count: 3,
};
