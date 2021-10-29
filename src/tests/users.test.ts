import request from 'supertest';
import App from '@/app';
import UserRoute from '@/routes/users.route';
import { mockUserRegisterData } from '@/tests/fixtures';
import { createMockUser } from '@/tests/testUtils';

const mockRegistrationRequest = mockUserRegisterData();
let mockUSerId;

beforeAll(async () => {
  mockUSerId = await createMockUser(mockRegistrationRequest);
});

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Users', () => {
  describe('[GET] /users', () => {
    it('response statusCode 200 / findAll', () => {
      const usersRoute = new UserRoute();
      const app = new App([usersRoute]);
      return request(app.getServer()).get(`${usersRoute.path}`).expect(200);
    });
  });

  describe('[GET] /users/:id', () => {
    it('response statusCode 200 / findOne', () => {
      const usersRoute = new UserRoute();
      const app = new App([usersRoute]);
      return request(app.getServer()).get(`${usersRoute.path}/${mockUSerId}`).expect(200);
    });
  });

  describe('[DELETE] /users/:id', () => {
    it('response statusCode 200 / deleted', async () => {
      const userId = await createMockUser(mockUserRegisterData());
      const usersRoute = new UserRoute();
      const app = new App([usersRoute]);
      return request(app.getServer()).delete(`${usersRoute.path}/${userId}`).expect(200);
    });
  });
});
