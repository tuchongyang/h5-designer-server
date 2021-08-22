import { Service } from 'egg';

export default class FavService extends Service {

    /**
    * 列表
    * @param params - 列表查询参数
    */
    public async list(options) {
        let {page = 1, pageSize = this.config.pageSize} = options
        let list = await this.app.model.SceneFav.findAndCountAll({
            where:{userId: this.ctx.user},
            limit: +pageSize,
            offset: pageSize * (page-1),
            order: [ ["createdAt", 'DESC']],
            include:[
                {model: this.app.model.Scene, as: 'scene'}
            ]
        })
        return list;
    }
    
  /**
   * 添加
   * @param options - 参数
   */
    public async save(options: any) {
        const { ctx } = this
        const {sceneId} = options
        let results = { code: 400, message: "失败", }
        //先看看数据存在
        const data = await ctx.model.SceneFav.findOne({sceneId,userId: ctx.user})
        if(!data){
            await ctx.model.SceneFav.upsert({sceneId,userId: ctx.user}).then(() => {
                results = { code: 0, message: "添加成功", }
            }).catch(err => {
                results = { code: 400, message: err, }
            })
        }else{
            results = { code: 0, message: "添加成功", }
        }
        return results
    }
    /**取消收藏 */
    public async cancel(options){
        const {sceneId} = options
        let results = {code: 0,message:"取消成功"}
        await this.ctx.model.SceneFav.destroy({ where: { sceneId,userId: this.ctx.user}})
        return results
    }
    
   
    //删除
    public async remove(id){
        let results
        await this.ctx.model.SceneFav.destroy({ where: { id}}).then(() => {
            results = { code: 0, message: "删除成功", }
        }).catch(error => {
            results = { code: 400, message: error, }
        })
        return results
    }

}
