import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CropQuantityDto {
  @ApiProperty()
  @IsString()
  crop: string;

  @ApiProperty()
  @IsNumber()
  qtd: number;
}
