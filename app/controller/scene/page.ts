import { Controller } from 'egg';
import { bp } from 'egg-blueprint'
const auth = require('../../middleware/auth')
/**
* @Controller 角色
*/
bp.prefix('/scene/page', 'ScenePageController')
export default class ScenePageController extends Controller {
    /** 分页列表 */
    @bp.get('/list')
    public async index() {
        const { ctx } = this;
        if(!ctx.query.sceneId){
            return ctx.fail("sceneId不能为空")
        }
        let list = await ctx.service.scene.page.list(ctx.query)
        ctx.success(list)
    }
    

    @bp.post('/save',auth())
    public async save(){
        const { ctx } = this;
        let params = ctx.request.body;
        let ret = await ctx.service.scene.page.save(params);
        if(ret.code==0){
            ctx.success()
        }else{
            ctx.fail(ret.message,ret.code)
        }
    }
    @bp.post('/update/:id',auth())
    public async update(){
        const { ctx } = this;
        let params = ctx.request.body;
        params.id = ctx.params.id
        let ret = await ctx.service.scene.page.update(params);
        if(ret.code==0){
            ctx.success()
        }else{
            ctx.fail(ret.message,ret.code)
        }
    }
    @bp.del('/:id')
    public async remove(){
        const { ctx } = this;
        let ret = await ctx.service.scene.page.remove(ctx.params.id);
        if(ret.code==0){
            ctx.success()
        }else{
            ctx.fail( ret.message,ret.code)
        }
    }
    
    @bp.get('/:id')
    public async detail(){
        const { ctx } = this;
        const data = await ctx.service.scene.page.detail(ctx.params.id)
        data?ctx.success(data):ctx.fail("数据不存在")
       
    }
    

}