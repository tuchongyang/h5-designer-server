import { Service } from "egg";

interface SaveOptType {
  id?: number;
  formId: number;
  ip: string;
  userAgent: string;
  content?: string;
  creator?: number;
}

export default class AnswerService extends Service {
  /**
   * 列表
   * @param params - 列表查询参数
   */
  public async list(options) {
    let { page = 1, pageSize = this.config.pageSize } = options;
    let list = await this.app.model.FormAnswer.findAndCountAll({
      where: {formId: options.formId},
      limit: +pageSize,
      offset: pageSize * (page - 1),
      order: [["createdAt", "DESC"]],
      include:[
        {model: this.app.model.SystemUser, as: 'user',attributes:['name','username']}
      ]
    });
    return list;
  }
  /**
   * 保存
   * @param options - 参数
   */
  public async save(formId: number, options: any) {
    const { ctx } = this;
    const {Op} = this.app.Sequelize
    const content = JSON.stringify(options)
    const opt: SaveOptType = { 
      formId,//关联的表单Id
      content,//json字符串
      userAgent: ctx.request.header['user-agent'] || "",//
      ip: ctx.helper.getReqIP(),//回答人的ip地址
      creator: ctx.user
    };
    let results = { code: 400, message: "失败" };
    //先判断是否重复提交
    const answer = await ctx.model.FormAnswer.findOne({
      where: {
        [Op.or]:[
          {"ip":opt.ip},
          {"creator":opt.creator}
        ]
      }
    })
    if(answer){
      results = { code: 400, message: "请勿重复提交" };
    }else{
      await ctx.model.FormAnswer.upsert(opt)
      .then(() => {
        results = { code: 0, message: "添加成功" };
      })
      .catch((err) => {
        results = { code: 400, message: err };
      });
    }
    

    return results;
  }
  /**
   * 保存
   * @param options - 参数
   */
  public async update(options: any) {
    const { ctx } = this;
    const { id, title, desc, cover, music, content, viewCount } = options;
    let status = 1;
    let results = { code: 400, message: "失败" };
    //先找到那条数据
    const data = await ctx.model.FormAnswer.findOne({ where: { id } });
    if (data && data.status == 2) {
      status = 3;
    }
    data &&
      (await ctx.model.FormAnswer.update(
        { title, desc, cover, music, content, status, viewCount },
        {
          where: { id: id },
        }
      )
        .then(() => {
          results = { code: 0, message: "添加成功" };
        })
        .catch((err) => {
          results = { code: 400, message: err };
        }));

    return results;
  }
  public async publish(options: any) {
    const { ctx } = this;
    const { id } = options;
    let results = { code: 0, message: "发布成功" };
    const form = await ctx.model.FormAnswer.findOne({where:{id}})
    await ctx.model.FormAnswer.update(
      { status: 2, publishContent: form.content },
      {
        where: { id: id },
      }
    );
    
    return results;
  }
  public async detail(id) {
    // const { ctx } = this
    let data = await this.app.model.FormAnswer.findOne({
      where: { id },
    });
    return data;
  }
  //删除
  public async remove(id) {
    let results;
    await this.ctx.model.FormAnswer.destroy({ where: { id } })
      .then(() => {
        results = { code: 0, message: "删除成功" };
      })
      .catch((error) => {
        results = { code: 400, message: error };
      });
    //删除所有页面
    await this.ctx.model.FormAnswer.destroy({ where: { sceneId: id } });
    return results;
  }
}
