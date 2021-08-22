// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportTest from '../../../app/service/Test';
import ExportSceneFav from '../../../app/service/scene/fav';
import ExportScenePage from '../../../app/service/scene/page';
import ExportSceneScene from '../../../app/service/scene/scene';
import ExportSystemFile from '../../../app/service/system/file';
import ExportSystemUser from '../../../app/service/system/user';

declare module 'egg' {
  interface IService {
    test: AutoInstanceType<typeof ExportTest>;
    scene: {
      fav: AutoInstanceType<typeof ExportSceneFav>;
      page: AutoInstanceType<typeof ExportScenePage>;
      scene: AutoInstanceType<typeof ExportSceneScene>;
    }
    system: {
      file: AutoInstanceType<typeof ExportSystemFile>;
      user: AutoInstanceType<typeof ExportSystemUser>;
    }
  }
}
