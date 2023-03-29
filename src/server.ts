import * as config from './config';
(async () => {
   await config.initiate();
})();
import App from './app';
import UserController from './controllers/user.controller';

const app = new App([new UserController()]);

app.listen();
