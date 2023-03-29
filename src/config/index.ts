import { config } from 'dotenv';
import { resolve } from 'path';

export function initiate(): Promise<boolean> {
   return new Promise((resolvePromise) => {
      if (process.env.NODE_ENV === 'local') {
         console.log('\x1b[34m', '#Development Mode \x1b[39m');
         config({ path: resolve(__dirname, './local.env') });
      } else if (process.env.NODE_ENV === 'stage') {
         // config({ path: resolve(__dirname, './stage.env') });
         console.log('\x1b[32m', '#Staging Mode \x1b[39m');
      } else if (process.env.NODE_ENV === 'prod') {
         console.log('\x1b[32m', '#Production Mode \x1b[39m');
      } else if (process.env.NODE_ENV === 'qa') {
         console.log('\x1b[32m', '#Development Mode \x1b[39m');
      } else {
         config({ path: resolve(__dirname, './local.env') });
      }
      resolvePromise(true);
   });
}
