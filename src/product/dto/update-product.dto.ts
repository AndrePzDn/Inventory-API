import { ApiProperty } from '@nestjs/swagger';
import {
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateProductDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsDecimal()
  @IsOptional()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  @IsNotEmpty()
  stock: number;
}
