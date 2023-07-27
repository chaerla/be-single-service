import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Item } from '../core/entitites/item.entity';
import { CreateItemDTO, UpdateItemDTO } from '../core/dtos/item.dto';
import { CompanyService } from './company.service';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    private companyService: CompanyService,
  ) {}

  async findItems(query: string, companyName: string): Promise<Item[]> {
    const items = await this.itemRepository.find({
      relations: {
        perusahaan: true,
      },
      where: [
        {
          nama: ILike(`%${query}%`),
          perusahaan: {
            nama: ILike(`%${companyName}%`),
          },
        },
        {
          kode: ILike(`%${query}%`),
          perusahaan: {
            nama: ILike(`%${companyName}%`),
          },
        },
      ],
    });
    return items;
  }

  async findItemById(id: number): Promise<Item> {
    const item = await this.itemRepository.findOne({
      relations: {
        perusahaan: true,
      },
      where: {
        id,
      },
    });
    if (!item) {
      throw new NotFoundException(`Barang dengan id ${id} tidak ditemukan!`);
    }
    return item;
  }

  async createItem(itemDetails: CreateItemDTO): Promise<Item> {
    const company = await this.companyService.findCompanyById(
      itemDetails.perusahaan_id,
    );
    await this.findSimilarItem(itemDetails.kode);
    const newItem = await this.itemRepository.create({ ...itemDetails });
    newItem.perusahaan = company;
    return this.itemRepository.save(newItem);
  }

  async updateItem(id: number, itemDetails: UpdateItemDTO): Promise<Item> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const item = await this.findItemById(id);
    const updatedItem = await this.itemRepository.preload({
      id,
      ...itemDetails,
    });
    if (itemDetails.perusahaan_id) {
      const company = await this.companyService.findCompanyById(
        itemDetails.perusahaan_id,
      );
      updatedItem.perusahaan = company;
    }
    if (itemDetails.kode) {
      await this.findSimilarItem(itemDetails.kode, updatedItem.id);
    }

    return this.itemRepository.save(updatedItem);
  }

  async deleteItem(id: number): Promise<Item> {
    const item = await this.findItemById(id);
    await this.itemRepository.delete({ id });
    return item;
  }

  async buyItem(id: number, quantity: number): Promise<void> {
    const item = await this.findItemById(id);
    if (quantity <= item.stok) {
      item.stok -= quantity;
      await this.itemRepository.save(item);
    }
  }

  async findSimilarItem(kode: string, id?: number): Promise<void> {
    const similar = await this.itemRepository.findOne({
      where: { kode },
    });
    if (similar && similar.id != (id || 0)) {
      throw new ConflictException(
        `Barang dengan kode yang sama sudah ada sebelumnya`,
      );
    }
  }

  mapOneWithCompany(item: Item) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { perusahaan, ...itemWithoutCompany } = item;
    return {
      ...itemWithoutCompany,
      perusahaan_id: item.perusahaan.id,
    };
  }

  mapWithCompany(items: Item[]) {
    const mappedItems = items.map((item) => {
      return this.mapOneWithCompany(item);
    });
    return mappedItems;
  }
}
