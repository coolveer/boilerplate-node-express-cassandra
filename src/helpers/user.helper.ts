const connect = require('../connection');
import { Response } from 'express';
import {
   decodeAddress,
   ed25519PairFromSeed,
   cryptoWaitReady,
   mnemonicGenerate,
   encodeAddress,
   mnemonicToMiniSecret,
   ApiPromise,
   WsProvider,
} from '../common/user.common';
import { responseHelper } from '../responses';
import { JsonObject } from 'swagger-ui-express';
const { STATUS, RES_MSG } = require('../responses/const.responses');
const Person = connect.loadSchema('Person', require('../models/User'));

Person.syncDB(function (err: Error, result: Response) {
   if (err) throw err;
   console.log('Change in table', result);
});
let data;
class UserHelper {
   public api: ApiPromise;
   public endPoint = process.env.SOCKET_HOST;
   public apihttp = process.env.POLKADOT_WEB_HOST;

   constructor() {
      this.intializePolkadotApi();
      this.endPoint = process.env.SOCKET_HOST;
   }

   public async intializePolkadotApi() {
      let wsProvider = new WsProvider(process.env.SOCKET_HOST);
      wsProvider.on('disconnected', () => {
         console.log('disconnected', wsProvider);
      });
      wsProvider.on('connected', () => console.log('Polkadot initialized'));

      this.api = await ApiPromise.create({ provider: wsProvider });

      this.api.on('disconnected', async () => {
         this.api.disconnect();
      });
      this.api.on('connected', () => console.log('api1', 'connected'));
      console.log('connected', this.api.isConnected);
      setInterval(async () => {
         //console.log('api.isConnected', this.api.isConnected);
         if (this.api.isConnected === false) {
            switch (this.endPoint) {
               case process.env.SOCKET_HOST:
                  wsProvider = new WsProvider(process.env.SOCKET_HOST2);
                  this.api = await ApiPromise.create({ provider: wsProvider });
                  this.endPoint = process.env.SOCKET_HOST2;
                  this.apihttp = process.env.POLKADOT_WEB_HOST2;
                  break;
               case process.env.SOCKET_HOST2:
                  wsProvider = new WsProvider(process.env.SOCKET_HOST3);
                  this.api = await ApiPromise.create({ provider: wsProvider });
                  this.endPoint = process.env.SOCKET_HOST3;
                  this.apihttp = process.env.POLKADOT_WEB_HOST3;
                  break;
               default:
                  wsProvider = new WsProvider(process.env.SOCKET_HOST);
                  this.api = await ApiPromise.create({ provider: wsProvider });
                  this.endPoint = process.env.SOCKET_HOST;
                  this.apihttp = process.env.POLKADOT_WEB_HOST;
            }
         }
      }, 1000);
   }

   async userSignUp(
      res: Response,
      payload: {
         name: string;
         email: string;
         password: string;
         wallet: string;
         mnemonics: string;
      }
   ) {
      await cryptoWaitReady();
      try {
         const mnemonic = mnemonicGenerate();
         const seedUser = mnemonicToMiniSecret(mnemonic);
         const { publicKey } = ed25519PairFromSeed(seedUser);
         const address = encodeAddress(decodeAddress(publicKey), 50);
         payload.wallet = address;
         payload.mnemonics = mnemonic;

         const user: JsonObject = new Person(payload);

         user.save((err: Error) => {
            if (err) {
               data = {
                  error: true,
                  data: {},
                  message: RES_MSG.SERVER_ERROR,
                  status: STATUS.INTERNALSERVER,
               };
               return responseHelper.error(res, data);
            }
         });
         data = {
            error: false,
            data: user,
            message: RES_MSG.CREATEUSER,
            status: STATUS.SUCCESS,
         };
         return responseHelper.success(res, data);
      } catch (error) {
         data = {
            error: true,
            data: {},
            message: RES_MSG.SERVER_ERROR,
            status: STATUS.INTERNALSERVER,
         };
         return responseHelper.error(res, data);
      }
   }
}

export default new UserHelper();
