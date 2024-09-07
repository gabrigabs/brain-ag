import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class FarmAreaInfoDto {
  @ApiProperty()
  @IsNumber()
  farmsTotalArea: number;

  @ApiProperty()
  @IsNumber()
  farmsArableArea: number;

  @ApiProperty()
  @IsNumber()
  farmsVegetationArea: number;
}
