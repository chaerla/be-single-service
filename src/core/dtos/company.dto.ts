import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  IsUppercase,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateCompanyDTO {
  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  nama: string;

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  alamat: string;

  @ApiProperty()
  @IsString()
  @IsNumberString()
  @Length(12, 20)
  @IsNotEmpty()
  no_telp: string;

  @ApiProperty()
  @IsUppercase()
  @IsString()
  @Length(3, 3)
  @IsNotEmpty()
  kode: string;
}

export class UpdateCompanyDTO extends PartialType(CreateCompanyDTO) {}
