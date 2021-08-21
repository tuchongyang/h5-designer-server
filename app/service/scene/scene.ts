import { Service } from 'egg';

interface SaveOptType {
    id?: number,
    title: string,
    desc: string,
    cover: string,
    music: string,
    properties: string,
    creator?: number
}

export default class SceneService extends Service {

    /**
    * 列表
    * @param params - 列表查询参数
    */
    public async list(options) {
        let {page = 1, pageSize = this.config.pageSize} = options
        let list = await this.app.model.Scene.findAndCountAll({
            where:{creator: this.ctx.user},
            limit: +pageSize,
            offset: pageSize * (page-1),
            order: [ ["createdAt", 'DESC']],
        })
        return list;
    }
    
  /**
   * 保存
   * @param options - 参数
   */
    public async save(options: any) {
        const { ctx } = this
        const {title,desc,cover,music,properties} = options
        const opt: SaveOptType = {title, desc, cover, music, properties}
        opt.creator = ctx.user
        let results = { code: 400, message: "失败", }
        await ctx.model.Scene.upsert(opt).then(() => {
            results = { code: 0, message: "添加成功", }
        }).catch(err => {
            results = { code: 400, message: err, }
        })

        return results
    }
    /**
   * 保存
   * @param options - 参数
   */
    public async update(options: any) {
        const { ctx } = this
        const {id,title,desc,cover,music,properties} = options
        let status = 1;
        let results = { code: 400, message: "失败", }
        //先找到那条数据
        const data = await ctx.model.Scene.findOne({where:{id}})
        if(data && data.status==2){
            status = 3
        }
        data && await ctx.model.Scene.update({title,desc,cover,music,properties,status},{
            where:{id: id}
        }).then(() => {
            results = { code: 0, message: "添加成功", }
        }).catch(err => {
            results = { code: 400, message: err, }
        })

        return results
    }
    public async publish(options: any) {
        const { ctx } = this
        const {id} = options
        let results = { code: 0, message: "发布成功", }
        await ctx.model.Scene.update({status: 2},{
            where:{id: id}
        })
        //批量更新
        const pages = await ctx.model.ScenePage.findAll({where:{sceneId: id}})
        for(let i=0;i<pages.length;i++){
            await ctx.model.ScenePage.update({elementsPublish: pages[i].elements},{where:{id: pages[i].id}})
        }
        return results
    }
    public async detail(id){
        // const { ctx } = this
        let data = await this.app.model.Scene.findOne({
            where: {id},
        })
        return data
    }
    //删除
    public async remove(id){
        let results
        await this.ctx.model.Scene.destroy({ where: { id}}).then(() => {
            results = { code: 0, message: "删除成功", }
        }).catch(error => {
            results = { code: 400, message: error, }
        })
        //删除所有页面
        await this.ctx.model.Scene.destroy({ where: { sceneId: id}})
        return results
    }

}
