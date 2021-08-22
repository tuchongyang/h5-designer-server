// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportSceneFav from '../../../app/controller/scene/fav';
import ExportScenePage from '../../../app/controller/scene/page';
import ExportSceneScene from '../../../app/controller/scene/scene';
import ExportSystemFile from '../../../app/controller/system/file';
import ExportSystemUser from '../../../app/controller/system/user';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    scene: {
      fav: ExportSceneFav;
      page: ExportScenePage;
      scene: ExportSceneScene;
    }
    system: {
      file: ExportSystemFile;
      user: ExportSystemUser;
    }
  }
}
