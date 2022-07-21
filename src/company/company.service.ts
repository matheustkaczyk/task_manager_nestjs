import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from './schemas/company.schema';
import { Model } from 'mongoose';
import { CompanyInformationDto } from './dto/company-information.dto';

@Injectable()
export class CompanyService {
  constructor(@InjectModel(Company.name) private companyModel: Model<CompanyDocument>) {}

  async createCompany(createCompanyDto: CompanyInformationDto): Promise<string> {
    try {
      const createdCompany = new this.companyModel(createCompanyDto);
      createdCompany.save();
      return "Created!";
    } catch (error) {
      return error.message;
    }
  }
}
