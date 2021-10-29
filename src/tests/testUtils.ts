import AuthRoute from '@routes/auth.route';
import App from '@/app';
import request from 'supertest';
import { CreateUserDto } from '@dtos/users.dto';

export const createMockUser = async (userData: CreateUserDto) => {
  const authRoute = new AuthRoute();
  const app = new App([authRoute]);
  const response = await request(app.getServer()).post('/signup').send(userData);
  return response.body.id;
};
