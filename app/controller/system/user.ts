import { Controller } from 'egg';
import { bp } from 'egg-blueprint'
const auth = require('../../middleware/auth')
/**
* @Controller 用户
*/
bp.prefix('/system/user', 'UserController')
export default class UserController extends Controller {
    /**
     *  登录
     * 
     */
    @bp.post('/login')
    public async login() {
        const { ctx } = this;
        let options = ctx.request.body;
        let { code, message, token } = await ctx.service.system.user.login(options)

        if (code == 0) {
            ctx.success(token)
        } else {
            ctx.fail(message);
        }
    }
    /**
     * @api {get} /api/system/user/logout 退出登录
     * @apiName logout
     * @apiGroup 用户管理
     *
     */
    @bp.get('/logout', auth())
    public async logout() {
        const { ctx } = this;
        ctx.session = null
        ctx.success();
    }

    @bp.post('/regist')
    public async regist() {
        const { ctx } = this;
        let params = ctx.request.body;
        let ret = await ctx.service.system.user.save(params);
        if (ret.code == 0) {
            ctx.success()
        } else {
            ctx.fail(ret.message, ret.code)
        }
    }
    @bp.post('/sendcode')
    public async sendcode() {
        const { ctx } = this;
        let params = ctx.request.body;
        let ret = await ctx.service.system.user.sendcode(params);
        if (ret.code == 0) {
            ctx.success()
        } else {
            ctx.fail(ret.message, ret.code)
        }
    }


    /**
     * @api {post} /api/system/user/update 修改用户信息
     * @apiName userUpdate
     * @apiGroup 用户管理
     * @apiParamExample {json} 请求示例
     * {
     *  "name": "Eve"
     * }
     *
     */
    @bp.post('/update', auth())
    public async update() {
        const { ctx } = this;
        let params = ctx.request.body;
        let ret = await ctx.service.system.user.update(params);
        if (ret.code == 0) {
            ctx.success()
        } else {
            ctx.fail(ret.message, ret.code)
        }
    }
    @bp.del('/:id', auth())
    public async remove() {
        const { ctx } = this;
        let ret = await ctx.service.system.user.remove(ctx.params.id);
        if (ret.code == 0) {
            ctx.success()
        } else {
            ctx.fail(ret.message, ret.code)
        }
    }

    /**
     * 个人资料
     */
    @bp.get('/info', auth())
    public async info() {
        const { ctx } = this;
        let user = ctx.user;
        const userInfo = await ctx.service.system.user.getUserInfo({ id: user.id })
        return ctx.success(userInfo);
    }
    @bp.get('/detail/:id')
    public async detail() {
        const { ctx } = this;
        const userInfo = await ctx.service.system.user.detail(ctx.params.id)
        return ctx.success(userInfo);
    }
}