import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getUsers);
    this.router.get(`${this.path}/profile`, authMiddleware, this.usersController.getProfile);
    this.router.get(`${this.path}/:id`, this.usersController.getUserById);
    this.router.delete(`${this.path}/:id`, this.usersController.deleteUser);
  }
}

export default UsersRoute;
