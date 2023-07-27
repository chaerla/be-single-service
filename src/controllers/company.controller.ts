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
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CompanyService } from '../services/company.service';
import { CreateCompanyDTO, UpdateCompanyDTO } from '../core/dtos/company.dto';
import { ResponseMessage } from '../decorators/response.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('perusahaan')
@Controller('/perusahaan')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/')
  @ApiQuery({ name: 'q', required: false, description: 'Search query' })
  async getCompanies(@Query('q') query: string) {
    const company = await this.companyService.findCompany(query || '');
    return company;
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async getCompany(@Param('id', ParseIntPipe) id: number) {
    const company = await this.companyService.findCompanyById(id);
    return company;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  @ResponseMessage('Perusahaan berhasil dibuat!')
  async createCompany(@Body() companyDetails: CreateCompanyDTO) {
    const company = await this.companyService.createCompany({
      ...companyDetails,
    });
    return company;
  }

  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', required: true, type: Number })
  @ResponseMessage('Company updated successfully!')
  @Put('/:id')
  async updateCompany(
    @Param('id', ParseIntPipe) id: number,
    @Body() companyDetails: UpdateCompanyDTO,
  ) {
    const company = await this.companyService.updateCompany(id, companyDetails);
    return company;
  }

  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Company deleted successfully!')
  @Delete('/:id')
  async deleteCompany(@Param('id', ParseIntPipe) id: number) {
    const company = await this.companyService.deleteCompany(id);
    console.log(company);
    return company;
  }
}
