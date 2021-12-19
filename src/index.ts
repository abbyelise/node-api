import 'dotenv/config';
import 'module-alias/register';

import UtilityController from './resources/utility/utility.controller';
import UserController from './resources/user/user.controller';
import validateEnv from '@/utils/validateEnv';
import App from './app';

validateEnv();

const app = new App([new UserController(), new UtilityController()], Number(process.env.PORT));

app.listen();
