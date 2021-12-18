import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/user/user.validation';
import HttpException from '@/utils/exceptions/http.exception';
import UserService from './user.service';

class UserController implements Controller {
  public path = '/users';
  public router = Router();
  private UserService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}`, this.get);
    this.router.post(
        `${this.path}`,
        validationMiddleware(validate.create),
        this.create
    );
  }

  private get = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    res.status(200).json({ data: 'user response' });
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
      try {
          const { email, password } = req.body;

          const post = await this.UserService.create(email, password);

          res.status(201).json({ post });
      } catch (error) {
          next(new HttpException(400, 'Cannot create post'));
      }
  };
}

export default UserController;
