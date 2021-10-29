import bcrypt from 'bcrypt';
import { config } from '../config';
import jwt from 'jsonwebtoken';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { Users } from '@models/users.model';
import { isEmpty } from '@utils/util';

class AuthService {
  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'Please check your input');

    const existingUser: Users = await Users.query().select().from('users').where('username', '=', userData.username).first();
    if (existingUser) throw new HttpException(409, `Your username ${userData.username} already exists, please try a different one`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: User = await Users.query()
      .insert({ ...userData, password: hashedPassword })
      .into('users');

    return createUserData;
  }

  public async login(userData: LoginUserDto): Promise<{ cookie: string; user: User }> {
    if (isEmpty(userData)) throw new HttpException(400, 'Please check your input');

    const user: User = await Users.query().select().from('users').where('username', '=', userData.username).first();
    if (!user) throw new HttpException(409, `Your username ${userData.username} not found`);

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, user.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password did not match, plsease check your input');

    const tokenData = this.createToken(user);
    const cookie = this.createCookie(tokenData);

    return { cookie, user };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'User not found');

    const findUser: User = await Users.query()
      .select()
      .from('users')
      .where('username', '=', userData.username)
      .andWhere('password', '=', userData.password)
      .first();

    if (!findUser) throw new HttpException(404, 'User not found');

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = config.secretKey;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
