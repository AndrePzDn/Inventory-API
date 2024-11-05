import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class UpdateSaleDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  productId: UUID;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
