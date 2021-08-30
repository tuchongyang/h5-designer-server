module.exports = app => {
    const { STRING, INTEGER, TEXT } = app.Sequelize;

    const Scene = app.model.define('form', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        title: STRING,
        desc: STRING,//描述
        status: { type: INTEGER, defaultValue: 1 },//状态，1、待发布，2、已发布、3、已发布有修改
        content: TEXT,//json字符串
        viewCount: INTEGER,//
        cover: STRING,//
        creator: INTEGER,//创建的用户id
    }, { freezeTableName: true, timestamps: true });

    // 表关联的字段
    Scene.associate = function () {
        // 一对多
        app.model.Scene.hasMany(app.model.ScenePage, { foreignKey: 'scene_id', targetKey: 'id' });
        /**
         * User.belongsTo(关联的模型, { foreignKey: '使用什么字段关联', targetKey: '与关联的模型那个字段关联', as: '别名' });
        */
        // 一对一
        Scene.belongsTo(app.model.SystemUser, { foreignKey: 'creator', targetKey: 'id', as: 'user' });
    }

    return Scene;
};