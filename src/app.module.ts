import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
dotenv.config();

const DB = process.env.DB || "mongodb://localhost:27017";

@Module({
  imports: [
    MongooseModule.forRoot(DB),
    CompanyModule,
    UserModule,
    TaskModule,
    AuthModule
  ],
})
export class AppModule {}
