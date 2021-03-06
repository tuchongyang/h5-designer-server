// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportTest from '../../../app/service/Test';
import ExportFormAnswer from '../../../app/service/form/answer';
import ExportFormForm from '../../../app/service/form/form';
import ExportSceneFav from '../../../app/service/scene/fav';
import ExportScenePage from '../../../app/service/scene/page';
import ExportSceneScene from '../../../app/service/scene/scene';
import ExportSceneStatVisit from '../../../app/service/scene/statVisit';
import ExportSystemFile from '../../../app/service/system/file';
import ExportSystemUser from '../../../app/service/system/user';

declare module 'egg' {
  interface IService {
    test: AutoInstanceType<typeof ExportTest>;
    form: {
      answer: AutoInstanceType<typeof ExportFormAnswer>;
      form: AutoInstanceType<typeof ExportFormForm>;
    }
    scene: {
      fav: AutoInstanceType<typeof ExportSceneFav>;
      page: AutoInstanceType<typeof ExportScenePage>;
      scene: AutoInstanceType<typeof ExportSceneScene>;
      statVisit: AutoInstanceType<typeof ExportSceneStatVisit>;
    }
    system: {
      file: AutoInstanceType<typeof ExportSystemFile>;
      user: AutoInstanceType<typeof ExportSystemUser>;
    }
  }
}
