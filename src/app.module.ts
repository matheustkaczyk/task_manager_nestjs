import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/workspace'), CompanyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
