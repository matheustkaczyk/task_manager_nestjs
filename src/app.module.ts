import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyController } from './company/company.controller';
import { CompanyService } from './company/company.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), CompanyModule],
  controllers: [AppController, CompanyController],
  providers: [AppService, CompanyService],
})
export class AppModule {}
