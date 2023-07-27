import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Company } from '../core/entitites/company.entity';
import { CreateCompanyDTO, UpdateCompanyDTO } from '../core/dtos/company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async findCompany(query: string): Promise<Company[]> {
    const companies = await this.companyRepository.find({
      where: [
        {
          nama: ILike(`%${query}%`),
        },
        {
          kode: ILike(`%${query}%`),
        },
      ],
    });
    return companies;
  }

  async findCompanyById(id: number): Promise<Company> {
    const company = await this.companyRepository.findOneBy({ id });
    if (!company) {
      throw new NotFoundException(
        `Perusahaan dengan id ${id} tidak ditemukan!`,
      );
    }
    return company;
  }

  async createCompany(companyDetails: CreateCompanyDTO): Promise<Company> {
    await this.findSimilarCompany(companyDetails.kode);
    const newCompany = await this.companyRepository.create({
      ...companyDetails,
    });
    return this.companyRepository.save(newCompany);
  }

  async updateCompany(
    id: number,
    companyDetails: UpdateCompanyDTO,
  ): Promise<Company> {
    const updatedCompany = await this.companyRepository.preload({
      id,
      ...companyDetails,
    });
    if (companyDetails.kode) {
      await this.findSimilarCompany(updatedCompany.kode, updatedCompany.id);
    }
    return this.companyRepository.save(updatedCompany);
  }

  async deleteCompany(id: number): Promise<Company> {
    const company = await this.findCompanyById(id);
    await this.companyRepository.delete({ id });
    return company;
  }

  async findSimilarCompany(kode: string, id?: number): Promise<void> {
    const similar = await this.companyRepository.findOne({
      where: { kode },
    });
    if (similar && similar.id != (id || 0)) {
      throw new ConflictException(
        `Perusahaan dengan kode yang sama sudah ada sebelumnya`,
      );
    }
  }
}
