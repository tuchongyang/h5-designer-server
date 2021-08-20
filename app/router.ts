import { Application } from 'egg';
import { Blueprint } from 'egg-blueprint';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  Blueprint(app, { prefix: '/api' });
};
