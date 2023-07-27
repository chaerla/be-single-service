import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateItemDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  nama: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  stok: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  harga: number;

  @ApiProperty()
  @IsString()
  @Length(3, 3)
  @IsNotEmpty()
  kode: string;

  @ApiProperty()
  @IsNotEmpty()
  perusahaan_id: number;
}

export class UpdateItemDTO extends PartialType(CreateItemDTO) {}

export class BuyItemDTO {
  @ApiProperty()
  @IsNumber()
  quantity: number;
}
