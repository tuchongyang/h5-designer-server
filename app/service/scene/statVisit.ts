import { Service } from 'egg';
const dayjs = require('dayjs')

export default class FavService extends Service {

    /**
    * 列表
    * @param params - 列表查询参数
    */
    public async list(options) {
         
        let list = await this.app.model.SceneStatVisit.findAll({
            where: options,
            order: [ ["createdAt", 'DESC']]
        })
        return list;
    }
    
  /**
   * 添加
   * @param options - 参数
   */
    public async add(options: any) {
        const { ctx } = this
        const { Op } = this.app.Sequelize
        const {sceneId} = options
        let results = { code: 0, message: "成功", }
        const visitData = {
            sceneId,
            userAgent: ctx.request.header['user-agent'],
            ip: ctx.helper.getReqIP(),
        }
        const nowStr = dayjs(Date.now()).format('YYYY-MM-DD')
        const startTime = new Date(nowStr + ' 00:00:00').getTime()
        const endTime = new Date(nowStr + ' 23:59:59').getTime()
        //先看看数据存在
        const datas = await ctx.model.SceneStatVisit.findAll({
            where:{
                ...visitData,
                createdAt:{
                    [Op.between]: [startTime,endTime]
                }
            }
        })
        if(!datas.length){
            await ctx.model.SceneStatVisit.create({...visitData,pv:1,uv:1})
        }else{
            await ctx.model.SceneStatVisit.update({pv: datas[0].pv+1},{where: {id: datas[0].id}})
        }
        return results
    }
    

}
