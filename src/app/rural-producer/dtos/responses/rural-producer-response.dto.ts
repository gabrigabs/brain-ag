import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { CropsEnum } from '../../enums/crops.enum';
import { StatesEnum } from '../../enums/states.enum';
import { ApiProperty } from '@nestjs/swagger';

export class RuralProducerResponseDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  id: string;

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
  @IsString()
  @IsNotEmpty()
  state: string;

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
  @IsArray()
  @ArrayNotEmpty()
  plantedCrops: string[];
}
