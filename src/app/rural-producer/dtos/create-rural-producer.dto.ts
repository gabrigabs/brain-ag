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
import { Transform } from 'class-transformer';

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

  @Transform((state) => state.value.toUpperCase())
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

  @Transform((crops) => crops.value.map((crop: string) => crop.toUpperCase()))
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(CropsEnum, { each: true })
  plantedCrops: CropsEnum[];
}
