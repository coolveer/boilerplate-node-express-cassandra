import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import { Request, Response } from 'express';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger.json';
import { Controller } from './interfaces';

const busboyBodyParser = require('busboy-body-parser');

class App {
   public app: express.Application;
   //ss

   constructor(controllers: Controller[]) {
      this.app = express();
      this.initializeMiddlewares();
      this.initializeControllers(controllers);
   }

   public listen() {
      this.app.listen(process.env.PORT ? process.env.PORT : 7200, () => {
         console.log(
            `App listening on the port ${
               process.env.PORT ? process.env.PORT : 7200
            }`
         );
      });
   }

   public getServer(): express.Application {
      return this.app;
   }

   private initializeMiddlewares() {
      this.app.use(bodyParser.json());
      this.app.use(cookieParser());
      this.app.set('view engine', 'ejs');
      this.app.use(cors());
      this.app.use(busboyBodyParser({ limit: '200mb', multi: true }));

      this.app.use(
         '/api/typec/swagger',
         swaggerUi.serve,
         swaggerUi.setup(swaggerDocument)
      );
   }

   private initializeControllers(controllers: Controller[]) {
      this.app.get('/', (req: Request, res: Response) => {
         return res.status(200).json({ status: 'API Service is UP' });
      });
      controllers.forEach((controller) => {
         this.app.use('/api/typec', controller.router);
      });
      this.app.get('/api/typec/status', (req: Request, res: Response) => {
         return res.status(200).json({ status: 'API Service is UP' });
      });
   }
}

export default App;
