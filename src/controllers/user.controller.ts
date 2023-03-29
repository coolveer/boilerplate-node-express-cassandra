import { Controller } from '../interfaces';
import * as express from 'express';
import { Request, Response } from 'express';
import UserHelper from '../helpers/user.helper';

import { userValidation } from '../validations/user.validation';

class UserController implements Controller {
   public path = '/user';
   public router = express.Router();

   constructor() {
      this.initializeRoutes();
   }

   private initializeRoutes() {
      this.router.post(`${this.path}/signup`, userValidation, this.userSignUp);
   }

   private userSignUp = async (req: Request, res: Response) => {
      const userSign = await UserHelper.userSignUp(res, req.body);
      return userSign;
   };
}

export default UserController;
