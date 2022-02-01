import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { UserDocument, User } from './schema/user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }

  async findOne(userfilterQuery: FilterQuery<User>): Promise<User> {
    return await this.userModel.findOne(userfilterQuery);
  }

  async find(userfilterQuery: FilterQuery<User>): Promise<User[]> {
    return this.userModel.find(userfilterQuery);
  }

  async findOneAndUpdate(
    userfilterQuery: FilterQuery<User>,
    user: Partial<User>,
  ): Promise<User> {
    return await this.userModel.findOneAndUpdate(userfilterQuery, user, {
      new: true,
    });
  }
}
