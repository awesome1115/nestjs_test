import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createuser.dto';
import { UpdateUserDto } from './dto/updateuser.dto';
import { User } from './schema/user.schema';
import { UsersService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.getUser();
  }
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.createUser(
      createUserDto.username,
      createUserDto.password,
    );
  }
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.updateUser({ id }, userDto);
  }
}
