import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class DateFilterSaleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  initialDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  finalDate: Date;
}
