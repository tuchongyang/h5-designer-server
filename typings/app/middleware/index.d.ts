// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuth from '../../../app/middleware/auth';
import ExportExecption from '../../../app/middleware/execption';

declare module 'egg' {
  interface IMiddleware {
    auth: typeof ExportAuth;
    execption: typeof ExportExecption;
  }
}
