import bcrypt from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { Users } from '@models/users.model';
import { isEmpty } from '@utils/util';

class UserService {
  public async findAllUser(): Promise<User[]> {
    return Users.query().select().from('users');
  }

  public async findUserById(userId: string): Promise<User> {
    const findUser: User = await Users.query().findById(userId);
    if (!findUser) throw new HttpException(404, 'User not found');

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'Your input is not valid, please check it');

    const findUser: User = await Users.query().select().from('users').where('username', '=', userData.username).first();
    if (findUser) throw new HttpException(409, `Your username ${userData.username} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return Users.query()
      .insert({ ...userData, password: hashedPassword })
      .into('users');
  }

  public async deleteUser(userId: string): Promise<User> {
    const user: User = await Users.query().select().from('users').where('id', '=', userId).first();
    if (!user) throw new HttpException(409, 'User not found');

    await Users.query().delete().where('id', '=', userId).into('users');
    return user;
  }
}

export default UserService;
