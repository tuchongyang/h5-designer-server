// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportForm from '../../../app/model/Form';
import ExportFormAnswer from '../../../app/model/FormAnswer';
import ExportScene from '../../../app/model/Scene';
import ExportSceneFav from '../../../app/model/SceneFav';
import ExportScenePage from '../../../app/model/ScenePage';
import ExportSceneStatVisit from '../../../app/model/SceneStatVisit';
import ExportSystemCode from '../../../app/model/SystemCode';
import ExportSystemFile from '../../../app/model/SystemFile';
import ExportSystemUser from '../../../app/model/SystemUser';

declare module 'egg' {
  interface IModel {
    Form: ReturnType<typeof ExportForm>;
    FormAnswer: ReturnType<typeof ExportFormAnswer>;
    Scene: ReturnType<typeof ExportScene>;
    SceneFav: ReturnType<typeof ExportSceneFav>;
    ScenePage: ReturnType<typeof ExportScenePage>;
    SceneStatVisit: ReturnType<typeof ExportSceneStatVisit>;
    SystemCode: ReturnType<typeof ExportSystemCode>;
    SystemFile: ReturnType<typeof ExportSystemFile>;
    SystemUser: ReturnType<typeof ExportSystemUser>;
  }
}
