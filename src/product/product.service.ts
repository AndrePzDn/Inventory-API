import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return await this.productRepository.save(createProductDto);
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: UUID) {
    return await this.productRepository.findOneBy({ id });
  }

  async update(id: UUID, updateProductDto: UpdateProductDto) {
    return await this.productRepository.update(id, updateProductDto);
  }

  async remove(id: UUID) {
    return await this.productRepository.softDelete(id);
  }

  async getProductStock(id: UUID) {
    return await this.productRepository.findOne({
      where: { id },
      select: ['stock'],
    });
  }

  async updateStock(id: UUID, newStock: number) {
    return await this.productRepository.update(id, { stock: newStock });
  }
}
