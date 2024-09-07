import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, ValidateNested, IsArray } from 'class-validator';
import { FarmAreaInfoDto } from '../farm-area-info.dto';
import { CropQuantityDto } from '../crop-quantity.dto';
import { FarmByStateDto } from '../farm-by-state.dto';

export class GraphDataResponseDto {
  @IsNumber()
  @ApiProperty({ description: 'Total number of farms' })
  totalFarms: number;

  @IsObject()
  @ValidateNested()
  @ApiProperty({ type: FarmAreaInfoDto })
  farmsAreaInfo: FarmAreaInfoDto;

  @IsArray({ each: true })
  @ValidateNested()
  @ApiProperty({ type: [CropQuantityDto] })
  cropsQuantity: CropQuantityDto[];

  @IsArray({ each: true })
  @ValidateNested()
  @ApiProperty({ type: [FarmByStateDto] })
  farmsByState: FarmByStateDto[];
}
