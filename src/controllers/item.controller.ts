import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ItemService } from '../services/item.service';
import {
  BuyItemDTO,
  CreateItemDTO,
  UpdateItemDTO,
} from '../core/dtos/item.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('barang')
@Controller('/barang')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/')
  @ApiQuery({ name: 'q', required: false })
  @ApiQuery({ name: 'perusahaan', required: false })
  async getItem(
    @Query('q') query: string,
    @Query('perusahaan') companyName: string,
  ) {
    const items = await this.itemService.findItems(
      query || '',
      companyName || '',
    );
    return this.itemService.mapWithCompany(items);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  @ApiParam({ name: 'id', required: true })
  async getItemById(@Param('id', ParseIntPipe) id: number) {
    const item = await this.itemService.findItemById(id);
    return this.itemService.mapOneWithCompany(item);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async createItem(@Body() itemDetails: CreateItemDTO) {
    const item = await this.itemService.createItem({ ...itemDetails });
    return this.itemService.mapWithCompany([item])[0];
  }

  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', required: true })
  @Put('/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async updateItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() itemDetails: UpdateItemDTO,
  ) {
    const item = await this.itemService.updateItem(id, { ...itemDetails });
    return this.itemService.mapOneWithCompany(item);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @ApiParam({ name: 'id', required: true })
  @Delete('/:id')
  @ApiBearerAuth()
  async deleteItem(@Param('id', ParseIntPipe) id: number) {
    const item = await this.itemService.deleteItem(id);
    return this.itemService.mapOneWithCompany(item);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/buy/:id')
  @ApiParam({ name: 'id', required: true })
  async buyItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() buyItemDto: BuyItemDTO,
  ) {
    await this.itemService.buyItem(id, buyItemDto.quantity);
  }
}
