import { IHelper } from 'egg';
const dayjs = require('dayjs')
module.exports = {
    /**
    * 获取请求IP
    */
    getReqIP(this: IHelper) {
        const req: any = this.ctx.req;
        return (req.headers['X-real-ip'] || // 判断是否有反向代理 IP
            req.connection.remoteAddress || // 判断 connection 的远程 IP
            req.socket.remoteAddress || // 判断后端的 socket 的 IP
            req.connection.socket.remoteAddress).replace('::ffff:', '');
    },
    randomNo(j) {
        var random_no = "";
        for (var i = 0; i < j; i++) //j位随机数，用以加在时间戳后面。
        {
            random_no += Math.floor(Math.random() * 10);
        }
        random_no = new Date().getTime() + random_no;
        return random_no;
    },
    randomString(e) {
        e = e || 32;
        var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
            a = t.length,
            n = "";
        for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
        return n
    },
    //获取开始日期和结束日期之间的时间段
    getDateBetWeen(startDate: string, endDate: string) { // 参数日期格式： YYYY-MM-DD
        if (!startDate || !endDate) return [];
        let result: Array<string> = [],
            startList: Array<number> = startDate.split('-').map(a => +a),
            endList: Array<number> = endDate.split('-').map(a => +a),
            date1 = new Date(),
            date2 = new Date(),
            date1Time,
            date2Time;
        date1.setUTCFullYear(startList[0], startList[1] - 1, startList[2]);
        date2.setUTCFullYear(endList[0], endList[1] - 1, endList[2]);
        date1Time = date1.getTime();
        date2Time = date2.getTime();
        for (let time = date1Time; time <= date2Time;) {
            result.push(dayjs(time).format('YYYY-MM-DD'));
            time = time + 24 * 60 * 60 * 1000;
        }
        return result
    }
};