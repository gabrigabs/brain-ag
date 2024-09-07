import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class FarmByStateDto {
  @ApiProperty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsNumber()
  qtd: number;
}
