import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { CompanyInformationDto } from './dto/company-information.dto';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService){}

  @Post('create')
  createCompany(@Body(ValidationPipe) companyInformationDto: CompanyInformationDto) {
    return this.companyService.createCompany(companyInformationDto);
  }
}
