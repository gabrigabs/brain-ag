import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { CropsEnum } from '../../enums/crops.enum';
import { StatesEnum } from '../../enums/states.enum';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRuralProducerRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cpfOrCnpj: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  producerName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  farmName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ enum: StatesEnum })
  @Transform((state) => state.value.toUpperCase())
  @IsString()
  @IsNotEmpty()
  @IsEnum(StatesEnum)
  state: StatesEnum;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  farmTotalArea: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  farmArableArea: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  farmVegetationArea: number;

  @ApiProperty({ enum: CropsEnum, isArray: true })
  @Transform((crops) => crops.value.map((crop: string) => crop.toUpperCase()))
  @ArrayNotEmpty()
  @IsEnum(CropsEnum, { each: true })
  plantedCrops: CropsEnum[];
}
