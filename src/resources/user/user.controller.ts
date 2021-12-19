import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import authenticated from '@/middleware/authenticated.middleware';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/user/user.validation';
import HttpException from '@/utils/exceptions/http.exception';
import UserService from './user.service';

class UserController implements Controller {
  public path = '/users';
  public router = Router();

  private UserService = new UserService();
  private DEFAULT_ROLE = 'default';

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(validate.register),
      this.register
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(validate.login),
      this.login
    );
    this.router.get(
      `${this.path}`,
      authenticated,
      this.getUser,
    )
  }

  private register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
      try {
          const { email, name, password } = req.body;

          const token = await this.UserService.register(
            email,
            name,
            password,
            this.DEFAULT_ROLE
          );

          res.status(201).json({ token });
      } catch (error) {
          next(new HttpException(400, 'Cannot register user'));
      }
  }

  private login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
        const { email, password } = req.body;

        const token = await this.UserService.login(email, password);

        res.status(201).json({ token });
    } catch (error) {
        next(new HttpException(400, 'Cannot login user'));
    }
  }

  private getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    if (!req.user) {
      return next(new HttpException(400, 'Missing logged in user'));
    }

    res.status(200).json({ user: req.user });
  }
}

export default UserController;
