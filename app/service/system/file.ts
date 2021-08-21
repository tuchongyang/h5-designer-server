import { Service } from 'egg';
const fs = require('mz/fs');
/**
 * role Service
 */
interface ListQueryType{
    creator: number
    type?:string
}
export default class FileService extends Service {

    /**
    * 列表
    * @param params - 列表查询参数
    */
    public async list(options) {
        let {page = 1, pageSize = this.config.pageSize,type=null} = options
        const where: ListQueryType = {creator: this.ctx.user}
        if(type){
            where.type = type
        }
        let list = await this.app.model.SystemFile.findAndCountAll({
            where,
            limit: +pageSize,
            offset: pageSize * (page-1),
            attributes: { exclude: ['createdAt','updatedAt','creator'] }
        })
        return list;
    }
    
    //删除
    public async remove(id){
        let results
        let data = await this.app.model.SystemFile.findOne({where: {id}})

        await this.ctx.model.SystemFile.destroy({ where: { id}}).then(() => {
            results = { code: 0, message: "删除成功", }
        }).catch(error => {
            results = { code: 400, message: error, }
        })
        if(results.code===0 && data){
            try{
                await fs.unlinkSync(data.path)
            }catch(e){
                console.log('err==================',e)
            }
        }
        return results
    }
}
