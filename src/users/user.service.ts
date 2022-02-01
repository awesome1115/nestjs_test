import { Injectable } from '@nestjs/common';
import { User } from './schema/user.schema';
import { UserRepository } from './user.repository';
import { v4 as uuid } from 'uuid';
import { FilterQuery } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(username: string, password: string): Promise<User> {
    const user = new User();
    user.id = uuid();
    user.username = username;
    user.password = password;
    return await this.userRepository.create(user);
  }

  async getUser(): Promise<User[]> {
    return await this.userRepository.find({});
  }

  async getUserById(id: string): Promise<User> {
    return await this.userRepository.findOne({ id });
  }

  async updateUser(
    userFilterQuery: FilterQuery<User>,
    user: Partial<User>,
  ): Promise<User> {
    return await this.userRepository.findOneAndUpdate(userFilterQuery, user);
  }
}
