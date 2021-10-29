import request from 'supertest';
import App from '@/app';
import { LoginUserDto } from '@/dtos/users.dto';
import AuthRoute from '@/routes/auth.route';
import { mockUserRegisterData } from '@/tests/fixtures';
import { createMockUser } from '@/tests/testUtils';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

const mockRegistrationRequest = mockUserRegisterData();

beforeAll(async () => {
  await createMockUser(mockRegistrationRequest);
});

describe('Testing Auth', () => {
  describe('[POST] /signup', () => {
    it('response should have the Create userData', () => {
      const userData = mockUserRegisterData();

      const authRoute = new AuthRoute();
      const app = new App([authRoute]);
      return request(app.getServer()).post('/signup').send(userData).expect(201);
    });
  });

  describe('[POST] /login', () => {
    it('response should have the Set-Cookie header with the Authorization token', async () => {
      const loginData: LoginUserDto = {
        username: mockRegistrationRequest.username,
        password: mockRegistrationRequest.password,
      };

      const authRoute = new AuthRoute();
      const app = new App([authRoute]);
      return request(app.getServer())
        .post('/login')
        .send(loginData)
        .expect('Set-Cookie', /^Authorization=.+/);
    });
  });
});
