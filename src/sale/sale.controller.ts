import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UUID } from 'crypto';
import { DateFilterSaleDto } from './dto/date-filter-sale.dto';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  async create(@Body() createSaleDto: CreateSaleDto) {
    return await this.saleService.create(createSaleDto);
  }

  @Get()
  async findAll() {
    return await this.saleService.findAll();
  }

  @Get('report/:id')
  async getReport(@Param('id') id: UUID) {
    return await this.saleService.getReport(id);
  }

  @Get('/range')
  async findInDateRangeSales(@Body() filterDates: DateFilterSaleDto) {
    return await this.saleService.findInRageSales(filterDates);
  }
}
