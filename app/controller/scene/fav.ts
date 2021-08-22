import { Controller } from 'egg';
import { bp } from 'egg-blueprint'
const auth = require('../../middleware/auth')

bp.prefix('/scene/fav', 'SceneFavController')
export default class SceneFavController extends Controller {
    /** 分页列表 */
    @bp.get('/list',auth())
    public async index() {
        const { ctx } = this;
        let list = await ctx.service.scene.fav.list(ctx.request.query)
        ctx.success(list)
    }
    

    @bp.post('/save',auth())
    public async save(){
        const { ctx } = this;
        let params = ctx.request.body;
        let ret = await ctx.service.scene.fav.save(params);
        if(ret.code==0){
            ctx.success()
        }else{
            ctx.fail(ret.message,ret.code)
        }
    }

    
    @bp.post('/cancel', auth())
    public async cancel(){
        const { ctx } = this;
        let params = ctx.request.body;
        let ret = await ctx.service.scene.fav.cancel(params);
        if(ret.code==0){
            ctx.success()
        }else{
            ctx.fail( ret.message,ret.code)
        }
    }

    @bp.del('/:id')
    public async remove(){
        const { ctx } = this;
        let ret = await ctx.service.scene.fav.remove(ctx.params.id);
        if(ret.code==0){
            ctx.success()
        }else{
            ctx.fail( ret.message,ret.code)
        }
    }
    
    

}