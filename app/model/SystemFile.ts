module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;

    const SystemFile = app.model.define('system_file', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        format: STRING,
        url: STRING,//文件路径，相对路径,用于前端图片访问
        path: STRING,//物理路径，服务器上的路径
        size: INTEGER,//文件大小
        name: STRING,//文件名称
        type: STRING,//文件类型 image/video/application
        creator: INTEGER,//创建的用户id
    }, { freezeTableName: true, timestamps: true });
    // 表关联的字段
    SystemFile.associate = function () {
        // 一对多
        // app.model.User.hasMany(app.model.Diary, { foreignKey: 'user_id', targetKey: 'id'});
        /**
         * User.belongsTo(关联的模型, { foreignKey: '使用什么字段关联', targetKey: '与关联的模型那个字段关联', as: '别名' });
        */
        // 一对一
        SystemFile.belongsTo(app.model.SystemUser, { foreignKey: 'creator', targetKey: 'id', as: 'user' });
    }
    return SystemFile;
};