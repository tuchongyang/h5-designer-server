import { Context } from 'egg';
module.exports = function () {
  return async function auth(ctx: Context) {
    if (!ctx.user) {
      ctx.fail('未登录', 401);
      return false;
    }

    return true;

  };
};

