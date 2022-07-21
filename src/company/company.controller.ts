import { Controller, Post, Body } from '@nestjs/common';
import { CompanyInformationDto } from './dto/company-information.dto';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService){}

  @Post('create')
  createCompany(@Body() companyInformationDto: CompanyInformationDto) {
    return this.companyService.createCompany(companyInformationDto);
  }
}
