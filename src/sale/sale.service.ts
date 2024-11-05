import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Repository } from 'typeorm';
import { ProductService } from 'src/product/product.service';
import { DateFilterSaleDto } from './dto/date-filter-sale.dto';

type ReportData = {
  totalSold: number;
  currentStock: number;
};

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale) private readonly saleRepository: Repository<Sale>,
    private readonly productService: ProductService,
  ) {}

  async create(createSaleDto: CreateSaleDto) {
    const { productId, quantity } = createSaleDto;
    const currentStock = await this.productService.getProductStock(productId);

    if (currentStock.stock < quantity)
      throw new NotFoundException('There are not enough stock for this sale');

    this.productService.updateStock(productId, currentStock.stock - quantity);
    const productItem = await this.productService.findOne(productId);

    return this.saleRepository.save({
      ...createSaleDto,
      product: productItem,
    });
  }

  async findAll() {
    return this.saleRepository.find({ loadRelationIds: true });
  }

  async getReport(id: UUID): Promise<ReportData> {
    const product = await this.productService.findOne(id);
    const salesOfProduct = await this.saleRepository.findBy({
      product: { id },
    });

    let totalSold = 0;
    salesOfProduct.forEach((sale) => {
      totalSold += sale.quantity;
    });

    return {
      totalSold,
      currentStock: product.stock,
    };
  }

  async findInRageSales(filterDates: DateFilterSaleDto) {
    this.saleRepository.query(`
      SELECT * FROM sale 
      WHERE saleDate 
      BETWEEN '${filterDates.initialDate}' AND '${filterDates.finalDate}' 
    `);
    return this.saleRepository.find();
  }
}
