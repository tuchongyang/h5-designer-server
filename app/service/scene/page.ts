import { Service } from 'egg';

interface SaveOptType {
    id?: number,
    name: string,
    cover: string,
    sortIndex: number,
    properties: string,
    elements: string,
    sceneId?: number
}

export default class PageService extends Service {

    /**
    * 列表
    * @param params - 列表查询参数
    */
    public async list(options) {
        let {sceneId} = options
        let list = await this.app.model.ScenePage.findAll({
            where:{sceneId},
            order: [ ["sortIndex", "ASC"],["createdAt", 'ASC']],
        })
        return list;
    }
    
  /**
   * 添加
   * @param options - 参数
   */
    public async save(options: any) {
        const { ctx } = this
        const {name,sortIndex,cover,elements,properties,sceneId} = options
        const opt: SaveOptType = {name,sortIndex,cover,elements,properties,sceneId} 
        let results = { code: 400, message: "失败", }
        await ctx.model.ScenePage.upsert(opt).then(() => {
            results = { code: 0, message: "添加成功", }
        }).catch(err => {
            results = { code: 400, message: err, }
        })
        //更新场景状态
        const data = await ctx.model.Scene.findOne({where:{id:sceneId}})
        if(data && data.status==2){
            await ctx.model.Scene.update({status:3},{
                where:{id: sceneId}
            })
        }
        

        return results
    }
    /**
   * 保存
   * @param options - 参数
   */
    public async update(options: any) {
        const { ctx } = this
        const {name,sortIndex,cover,elements,properties,id,sceneId} = options
        let results = { code: 400, message: "失败", }
        await ctx.model.ScenePage.update({name,sortIndex,cover,elements,properties},{
            where:{id: id}
        }).then(() => {
            results = { code: 0, message: "更新成功", }
        }).catch(err => {
            results = { code: 400, message: err, }
        })
        if(sceneId){
            //更新场景状态
            const data = await ctx.model.Scene.findOne({where:{id:sceneId}})
            if(data && data.status==2){
                await ctx.model.Scene.update({status:3},{
                    where:{id: sceneId}
                })
            }
        }
        

        return results
    }
    public async detail(id){
        let data = await this.app.model.ScenePage.findOne({
            where: {id},
        })
        return data
    }
    //删除
    public async remove(id){
        let results
        await this.ctx.model.ScenePage.destroy({ where: { id}}).then(() => {
            results = { code: 0, message: "删除成功", }
        }).catch(error => {
            results = { code: 400, message: error, }
        })
        return results
    }

}
