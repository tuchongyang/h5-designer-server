import { Controller } from 'egg';
import { bp } from 'egg-blueprint'
const fs = require('mz/fs');
const path = require('path')
const dayjs = require('dayjs');
const pump = require('mz-modules/pump');
const auth = require('../../middleware/auth')
/**
* @Controller 文件
*/
bp.prefix('/file', 'FileController')
export default class FileController extends Controller {
    /** 分页列表 */
    @bp.get('/list',auth())
    public async list() {
        const { ctx } = this;
        let list = await ctx.service.system.file.list(ctx.query)
        ctx.success(list)
    }
    /** 删除 */
    @bp.del('/:id',auth())
    public async remove() {
        const { ctx } = this;
        const results = await ctx.service.system.file.remove(ctx.params.id)
        if(results.code == 0){
            ctx.success()
        }else{
            ctx.fail(results.message)
        }
    }

    /**
     * @api {post} /api/file/upload 文件上传
     * 
     **/

    @bp.post('/upload',auth())
    async fileupload() {
        const { ctx } = this;
        const files = ctx.request.files;
        // ctx.logger.warn('files: %j', files);
        const images = <any>[]
        try {
            for (const file of files) {
                // const filename = file.filename.toLowerCase();
                // 基础的目录
                const uplaodBasePath = 'app/public/uploads';
                // 生成文件名
                const filename = `${ctx.helper.randomString(24)}${path.extname(file.filename).toLocaleLowerCase()}`;
                // 生成文件夹
                const dirname = dayjs(Date.now()).format('YYYY/MM/DD');
                function mkdirsSync(dirname) {
                    if (fs.existsSync(dirname)) {
                        return true;
                    } else {
                        if (mkdirsSync(path.dirname(dirname))) {
                            fs.mkdirSync(dirname);
                            return true;
                        }
                    }
                }
                mkdirsSync(path.join(uplaodBasePath, dirname));
                // 生成写入路径
                const targetPath = path.join(uplaodBasePath, dirname, filename);

                // const targetPath = path.join(this.config.baseDir, 'app/public', filename);
                const source = fs.createReadStream(file.filepath);
                const target = fs.createWriteStream(targetPath);
                await pump(source, target);
                const fileStat = fs.statSync(targetPath)
                const user = await this.app.model.SystemUser.findOne({where: {id: this.ctx.user}})
                const userFileSize = user.fileSize || 0
                if(userFileSize + fileStat.size > this.app.config.maxFileSize){
                    try{
                        await fs.unlinkSync(targetPath)
                    }catch(e){
                        console.log('err==================',e)
                    }
                    return await ctx.fail("您的剩余空间不足")
                }
                const image = {
                    format: file.mime,
                    url: '/public/uploads/' + dirname + '/' + filename,
                    path: targetPath,
                    size: fileStat.size,
                    name: file.filename,
                    type: file.mime.split('/').shift(),
                    creator: ctx.user
                }
                const iobj = await this.app.model.SystemFile.create(image)
                await this.app.model.SystemUser.update({fileSize: userFileSize + fileStat.size}, { where: { id: ctx.user } })
                images.push(iobj)
                // ctx.logger.warn('save %s to %s', file.filepath, targetPath);
            }
        } finally {
            // delete those request tmp files
            await ctx.cleanupRequestFiles();
        }

        await ctx.success(images.length > 1 ? images : images[0])
    }



}