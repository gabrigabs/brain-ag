import { CropsEnum } from '@prisma/client';

import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateRuralProducerDto {
  @IsString()
  @IsNotEmpty()
  cpfOrCnpj: string;

  @IsString()
  @IsNotEmpty()
  producerName: string;

  @IsString()
  @IsNotEmpty()
  farmName: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsNumber()
  @IsNotEmpty()
  farmTotalArea: number;

  @IsNumber()
  @IsNotEmpty()
  farmArableArea: number;

  @IsNumber()
  @IsNotEmpty()
  farmVegetationArea: number;

  @IsArray()
  @ArrayNotEmpty()
  plantedCrops: CropsEnum[];
}
