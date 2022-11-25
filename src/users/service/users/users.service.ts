import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/users/dto/user.dto';
import { User, UserDocument } from 'src/users/schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async createUser(UserDetails: UserDto) {
    const findEmail = await this.userModel.findOne({
      email: UserDetails.email,
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(UserDetails.password, salt);
    UserDetails.password = hashedPassword;
    if (!findEmail) {
      const userToSave = new this.userModel(UserDetails);
      return await userToSave.save();
    }
  }
  async login(UserDetails: UserDto) {
    const userLogin = await this.userModel.findOne({
      email: UserDetails.email,
    });
    console.log(userLogin);
    if (userLogin) {
      const passwordCheck = await bcrypt.compare(
        UserDetails.password,
        userLogin.password,
      );
      if (passwordCheck) {
        const token = this.jwtService.sign({
          id: userLogin.id,
          email: userLogin.email,
        });
        return { token: token };
      }
      return { err: 'incorrect password', status: HttpStatus.BAD_REQUEST };
    }
    return { err: 'user with email not found', status: HttpStatus.NOT_FOUND };
  }
  async getUser() {
    return await this.userModel.find({});
  }
  async getUserById(id: number): Promise<User> {
    return await this.userModel.findOne({ _id: id });
  }
  async DeleteUser(id: number) {
    const findUser = await this.userModel.findById({ _id: id });
    if (!findUser)
      return new HttpException(
        'User with id does not exits',
        HttpStatus.NOT_FOUND,
      );
    return this.userModel.deleteOne({ _id: id });
  }
}
