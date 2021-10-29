import { IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  public username: string;

  @IsString()
  public password: string;
}

export class CreateUserDto extends LoginUserDto {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsString()
  public userGroup: string;
}
