import { Controller, Post, Res } from '@nestjs/common';

@Controller('company')
export class CompanyController {

  @Post()
  createCompany(@Res() res): string {
    return ''
  }
}
