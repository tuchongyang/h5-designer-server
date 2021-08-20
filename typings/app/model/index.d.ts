// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportSystemCode from '../../../app/model/SystemCode';
import ExportSystemFile from '../../../app/model/SystemFile';
import ExportSystemUser from '../../../app/model/SystemUser';

declare module 'egg' {
  interface IModel {
    SystemCode: ReturnType<typeof ExportSystemCode>;
    SystemFile: ReturnType<typeof ExportSystemFile>;
    SystemUser: ReturnType<typeof ExportSystemUser>;
  }
}
