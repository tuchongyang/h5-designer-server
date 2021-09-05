import { Controller } from 'egg';
import { bp } from 'egg-blueprint'
const auth = require('../../middleware/auth')
const dayjs = require('dayjs')
bp.prefix('/form/answer', 'SceneController')
export default class SceneController extends Controller {
    /** 列表 */
    @bp.get('/list')
    public async index() {
        const { ctx } = this;
        if(!ctx.query.formId){
            return ctx.fail('缺少表单ID参数')
        }
        let list = await ctx.service.form.answer.list(ctx.query)
        ctx.success(list)
    }
    @bp.post('/save/:formId')
    public async save() {
        const { ctx } = this;
        let params = ctx.request.body;
        const formId = +ctx.params.formId
        let ret = await ctx.service.form.answer.save(formId,params);
        if (ret.code == 0) {
            ctx.success()
        } else {
            ctx.fail(ret.message, ret.code)
        }
    }
    @bp.post('/update/:id', auth())
    public async update() {
        const { ctx } = this;
        let params = ctx.request.body;
        params.id = ctx.params.id
        let ret = await ctx.service.form.answer.update(params);
        if (ret.code == 0) {
            ctx.success()
        } else {
            ctx.fail(ret.message, ret.code)
        }
    }
    @bp.post('/publish/:id', auth())
    public async publish() {
        const { ctx } = this;
        let params = ctx.request.body;
        params.id = ctx.params.id
        let ret = await ctx.service.form.answer.publish(params);
        if (ret.code == 0) {
            ctx.success()
        } else {
            ctx.fail(ret.message, ret.code)
        }
    }
    @bp.del('/:id', auth())
    public async remove() {
        const { ctx } = this;
        let ret = await ctx.service.form.answer.remove(ctx.params.id);
        if (ret.code == 0) {
            ctx.success()
        } else {
            ctx.fail(ret.message, ret.code)
        }
    }

    @bp.get('/:id')
    public async detail() {
        const { ctx } = this;
        const data = await ctx.service.form.answer.detail(ctx.params.id)
        if (data) {
            const fav = await ctx.model.SceneFav.findOne({ where: { sceneId: ctx.params.id } })
            if (ctx.user) {
                data.setDataValue('isFav', fav ? true : false)
            }
        }

        data ? ctx.success(data) : ctx.fail("数据不存在")

    }
    @bp.get('/visit/:id')
    public async visit() {
        const { ctx } = this;
        const data = await ctx.service.form.answer.detail(ctx.params.id)
        if (data) {
            const params = {
                id: data.id,
                viewCount: data.viewCount + 1
            }
            await ctx.service.form.answer.update(params);
            await ctx.service.scene.statVisit.add({ sceneId: parseInt(ctx.params.id) })
        }

        ctx.success()

    }
    @bp.get('/stat/total/:id')
    public async statTotal() {
        const { ctx } = this;
        const result = {
            todayNum: 0,
            yestodayNum: 0,
            weekNum: 0,
            monthNum: 0,
            totalNum: 0
        }
        const data = await ctx.service.form.answer.detail(ctx.params.id)
        if (data) {
            const params = {
                sceneId: data.id
            }
            const list = await ctx.service.scene.statVisit.list(params);
            const startTimeParam = {
                t: "",
                y: "",
                w: "",
                m: ""
            }
            var today = new Date();
            var endTime = today.getTime()
            startTimeParam.t = dayjs(today).format('YYYY-MM-DD') + ' 00:00:00'
            today.setDate(today.getDate() - 1)
            startTimeParam.y = dayjs(today).format('YYYY-MM-DD') + ' 00:00:00'
            today.setDate(today.getDate() - 6)
            startTimeParam.w = dayjs(today).format('YYYY-MM-DD') + ' 00:00:00'
            today.setDate(today.getDate() - 23)
            startTimeParam.m = dayjs(today).format('YYYY-MM-DD') + ' 00:00:00'
            for (let i = 0; i < list.length; i++) {
                const a = list[i]
                const createTime = new Date(a.createdAt).getTime()
                if (createTime >= new Date(startTimeParam.t).getTime() && createTime <= endTime) {
                    result.todayNum += a.pv
                }
                if (createTime >= new Date(startTimeParam.y).getTime() && createTime <= new Date(startTimeParam.y.replace('00:00:00', '23:59:59')).getTime()) {
                    result.yestodayNum += a.pv
                }
                if (createTime >= new Date(startTimeParam.w).getTime() && createTime <= endTime) {
                    result.weekNum += a.pv
                }
                if (createTime >= new Date(startTimeParam.m).getTime() && createTime <= endTime) {
                    result.monthNum += a.pv
                }
                result.totalNum += a.pv
            }
        }

        ctx.success(result)

    }

    @bp.get('/stat/form/:id')
    public async statTrend() {
        const { ctx } = this;
        const { Op } = this.app.Sequelize
        const { startTime, endTime } = ctx.request.query
        const times = ctx.helper.getDateBetWeen(startTime, endTime)
        const result = {
            times,
            pv: times.map(() => 0),
            uv: times.map(() => 0),
            ip: times.map(() => 0)
        }
        const ipMap = {}
        const data = await ctx.service.form.answer.detail(ctx.params.id)
        if (data) {
            const list = await ctx.service.scene.statVisit.list({
                sceneId: data.id,
                createdAt: {
                    [Op.between]: [startTime + ' 00:00:00', endTime + ' 23:59:59']
                }
            });
            for (let i = 0; i < list.length; i++) {
                const a = list[i]
                result.times.map((time, j) => {
                    if (a.createdAt.substr(0, 10) == time) {
                        result.uv[j] = result.uv[j] ? (result.uv[j] + a.uv) : a.uv
                        result.pv[j] = result.pv[j] ? (result.pv[j] + 1) : a.pv
                        if (!ipMap[j]) {
                            ipMap[j] = [a.ip]
                        } else {
                            if (ipMap[j].indexOf(a.ip) <= -1) {
                                ipMap[j].push(a.ip)
                            }
                        }
                    }
                })
            }
            Object.keys(ipMap).map(a => {
                result.ip[a] = ipMap[a].length
            })

        }

        ctx.success(result)

    }


}