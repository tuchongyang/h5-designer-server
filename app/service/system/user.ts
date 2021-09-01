import { Service } from 'egg';
const crypto = require('crypto');
const dayjs = require('dayjs');

/**
 * User Service
 */
export default class UserService extends Service {

    /**
     * 注册
     * @param data - 列表查询参数
     */
    public async save(options: any) {
        const { ctx } = this
        const { or } = this.app.Sequelize.Op
        const { email, password, code } = options
        let results = { code: 400, message: "失败", }
        //先校验验证码
        if (!code) {
            results.message = "验证码不能为空"
            return results
        }
        const codeOne = await ctx.model.SystemCode.findOne({ where: { email: email } })
        if (!codeOne || code != codeOne.code) {
            results.message = "验证码不正确"
            return results
        }
        await ctx.model.SystemUser.findOne({
            where: { [or]: [{ username: options.username }, { email }] },// 查询条件 
        }).then(async result => {
            if (!result) {
                const hash = crypto.createHash('md5');
                options.password = hash.update(password).digest('hex')
                await ctx.model.SystemUser.create(options).then(() => {
                    results = { code: 0, message: "添加成功", }
                }).catch(err => {
                    results = {
                        code: 400,
                        message: err,
                    }
                })
            } else {
                results = {
                    code: 400,
                    message: "该账号已存在",
                }
            }
        })

        return results
    }
    /**更新 */
    public async update(options: any) {
        const { ctx } = this
        let { name, avatar, phone, sex, address, birth = null } = options
        let results = { code: 500, message: "失败", }
        if (!birth) {
            birth = null
        }
        await ctx.model.SystemUser.update({ name, avatar, phone, sex, address, birth }, {
            where: { id: ctx.user }
        }).then(() => {
            results = { code: 0, message: "更新成功", }
        }).catch(err => {
            results = { code: 500, message: err, }
        })
        return results
    }
    /**
     * 登录
     * @param options - 参数
     */
    public async login(options: any) {
        const { ctx } = this
        const { or } = this.app.Sequelize.Op
        const { name, password } = options
        let results = { code: 400, message: "失败", token: '' }
        await ctx.model.SystemUser.findOne({
            where: {
                [or]: [{ username: name || "" }, { email: name || "" }, { phone: name || "" }]
            },
        }).then(async result => {
            if (result) {
                const hash = crypto.createHash('md5');
                const HashPassword = hash.update(password).digest('hex')

                await ctx.model.SystemUser.findOne({
                    where: {
                        [or]: [{ username: name || "" }, { email: name || "" }],
                        password: HashPassword
                    },
                    attributes: { exclude: ['password'] }
                }).then(async (data) => {
                    if (!data) {
                        return (results = { code: 400, message: "帐号或密码错误", token: '' })
                    }
                    /*
                    * sign({根据什么生成token})
                    * app.config.jwt.secret 配置的密钥
                    * {expiresIn:'24h'} 过期时间
                    */
                    const token = this.app.jwt.sign({ user: data.id }, this.config.jwt.secret, { expiresIn: '7d' });
                    results = { code: 0, message: "登录成功", token }
                    //记录用户最后登录时间与最后登录ip
                    ctx.model.SystemUser.update({
                        lastLoginTime: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                        lastLoginIp: ctx.helper.getReqIP()
                    }, {
                        where: { id: data.id }
                    })
                }).catch(err => {
                    results = { code: 400, message: err, token: '' }
                })
            } else {
                results = { code: 400, message: "账号不存在", token: '' }
            }
        })
        return results
    }

    public async detail(id) {
        let data = await this.app.model.SystemUser.findOne({ where: { id } })
        return data
    }
    //删除
    public async remove(id) {
        let results
        await this.ctx.model.SystemUser.destroy({ where: { id } }).then(() => {
            results = { code: 0, message: "删除成功", }
        }).catch(error => {
            results = { code: 400, message: error, }
        })
        return results
    }
    // 登录查询个人信息
    async getUserInfo(options) {
        const { ctx } = this
        let userInfo = await ctx.model.SystemUser.findOne({
            where: options,
            attributes: { exclude: ['password'] }
        })
        return userInfo
    }
    //发送验证码
    async getcode(options) {
        const { ctx } = this
        let results = { code: 400, message: "失败", token: '' }
        const { email } = options
        const nodemailer = require('nodemailer')
        const transport = nodemailer.createTransport({
            host: 'smtp.163.com', // 服务
            port: 465, // smtp端口
            secure: true,
            auth: {
                user: 'tucy9099@163.com', //用户名
                pass: 'AJNXZAUEUYVTKLQY' // SMTP授权码
            }
        });

        const randomFns = () => { // 生成6位随机数
            let code = ""
            for (let i = 0; i < 6; i++) {
                const num = Math.random() * 10
                code += "" + Math.floor(num).toString()
            }
            return code
        }
        const regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/ //验证邮箱正则

        if (regEmail.test(email)) {
            let code = randomFns()
            transport.sendMail({
                from: 'tucy9099@163.com', // 发件邮箱
                to: email, // 收件列表
                subject: '验证你的电子邮件', // 标题
                html:
                    `<p>你好！</p>
                <p>您正在注册h5设计平台账号</p>
                <p>你的验证码是：<strong style="color: #ff4e2a;">${code}</strong></p>
                <p>***该验证码5分钟内有效***</p>` // html 内容
            },
                function () {
                    results.message = "发送验证码错误！"
                    transport.close(); // 如果没用，关闭连接池
                })
            await ctx.model.SystemCode.destroy({ where: { email } })
            await ctx.model.SystemCode.create({ email, code, type: "regist" })
            setTimeout(async () => {    //5分钟后失效
                await ctx.model.SystemCode.destroy({ where: { email } })
            }, 1000 * 60 * 5)
            results.code = 0
            results.message = "发送成功"
        } else {
            results.message = "请输入正确的邮箱格式！";
        }
        return results

    }
}
