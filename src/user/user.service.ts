import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CompanyService } from '../company/company.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private companyService: CompanyService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<{ message: string } | HttpException>  {
    try {
      const [createdUser, addedWorker] = await Promise.all([
        await this.userModel.create(createUserDto),
        await this.companyService.addWorker(createUserDto.name)
      ])
  
      if (createdUser && addedWorker) {
        return { message: "Created" };
      }

    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    return await this.userModel.find().select('-password');
  }

  async findOne(id: string) {
    return await this.userModel.findOne({ _id: id });
  }

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }
}
