import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemController } from '../controllers/item.controller';
import { ItemService } from '../services/item.service';
import { Item } from '../core/entitites/item.entity';
import { CompanyModule } from './company.module';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), CompanyModule],
  providers: [ItemService],
  controllers: [ItemController],
  exports: [],
})
export class ItemModule {}
