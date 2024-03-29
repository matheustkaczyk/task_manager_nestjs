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
      const createdCompany = await this.companyModel.create(createCompanyDto);

      if (createdCompany) {
        return { message: 'Created' };
      }

      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    } catch (error) {
      return error.message;
    }
  }

  async addWorker(workerName: string) {
    try {
      const addWorker = await this.companyModel.findOneAndUpdate({ name: 'Workmize' }, { $addToSet: { workers: workerName } });

      return addWorker;
    } catch (error) {
      return error.message;
    }
  }
}
