import { CreateUserDto } from '@dtos/users.dto';
import { internet, name } from 'faker';

export const mockUserRegisterData = (): CreateUserDto => {
  return {
    username: internet.userName(),
    password: internet.password(),
    firstName: name.firstName(),
    lastName: name.lastName(),
    userGroup: 'sampleGroup',
  };
};
