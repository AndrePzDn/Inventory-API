import { Module } from '@nestjs/common';
import { ConfigurationModule } from './configuration/configuration.module';
import { ProductModule } from './product/product.module';
import { SaleModule } from './sale/sale.module';

@Module({
  imports: [ConfigurationModule, ProductModule, SaleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
