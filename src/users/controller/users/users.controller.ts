import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/service/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() userData: UserDto) {
    const newUser = await this.userService.createUser(userData);
    if (newUser) return { msg: 'user created', redirect: '/login' };
    return new HttpException(
      'user with email already exit',
      HttpStatus.BAD_REQUEST,
    );
  }
  @Post('login')
  async login(@Body() userdata: UserDto) {
    const newLogin = await this.userService.login(userdata);
    if (newLogin.token) return { msg: 'Signed in', token: newLogin.token };
    if (newLogin.token) throw new HttpException(newLogin.err, newLogin.status);
  }
  @Get()
  async getUser() {
    const users = await this.userService.getUser();
    if (users.length > 0) return users;
    throw new HttpException('user not found', HttpStatus.NOT_FOUND);
  }
  @Get(':id')
  async getuserId(@Param('id') id: number) {
    const getId = await this.userService.getUserById(id);
    if (!getId) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    return getId;
  }
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.DeleteUser(id);
  }
}
