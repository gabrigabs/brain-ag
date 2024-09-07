import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { CropsEnum } from '../enums/crops.enum';
import { StatesEnum } from '../enums/states.enum';

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
  @IsEnum(StatesEnum)
  state: StatesEnum;

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
  @IsEnum(CropsEnum, { each: true })
  plantedCrops: CropsEnum[];
}
