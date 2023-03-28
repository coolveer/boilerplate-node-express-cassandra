import * as config from './src/config'
(async ()=>{
    await config.initiate();
})();
import App from './app';
import UserController from './src/models/User/user.controller';

const app = new App([new UserController()]);

app.listen();