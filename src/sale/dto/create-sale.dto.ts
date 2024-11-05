import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class CreateSaleDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  productId: UUID;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
