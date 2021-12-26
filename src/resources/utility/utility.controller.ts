import { Router, Request, Response, NextFunction } from 'express';
import { Schema } from 'mongoose';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import UtilityService from './utility.service';

class UtilityController implements Controller {
  public path = '/utility';
  public router = Router();
  private utilityService = new UtilityService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}`, this.get);
  }

  private get = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { _id } = req.params;
      const objectId = new Schema.Types.ObjectId(_id);

      const utility = await this.utilityService.get(objectId);
      if (!utility) {
        next(new HttpException(404, 'Cannot find utility'));
      }

      res.status(200).json({ utility });
    } catch (error) {
        next(new HttpException(400, 'Cannot create post'));
    }
    res.status(200).json({ data: 'utility response' });
  }
}

export default UtilityController;
