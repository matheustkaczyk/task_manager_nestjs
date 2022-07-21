import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from './schemas/company.schema';
import { Model } from 'mongoose';
import { CompanyInformationDto } from './dto/company-information.dto';

@Injectable()
export class CompanyService {
  constructor(@InjectModel(Company.name) private companyModel: Model<CompanyDocument>) {}

  async createCompany(createCompanyDto: CompanyInformationDto): Promise<{ message: string } | HttpException> {
    try {
      const createdCompany = new this.companyModel(createCompanyDto);

      if (!createdCompany.name) {
        createdCompany.save();
        return { message: 'Created' };
      }

      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    } catch (error) {
      return error.message;
    }
  }
}
