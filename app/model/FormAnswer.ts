module.exports = app => {
    const { STRING, INTEGER, TEXT } = app.Sequelize;

    const Scene = app.model.define('form_answer', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        formId: INTEGER,//关联的表单Id
        content: TEXT,//json字符串
        userAgent: STRING,//
        ip: STRING,//回答人的ip地址
        creator: INTEGER,//创建的用户id
    }, { freezeTableName: true, timestamps: true });

    // 表关联的字段
    Scene.associate = function () {
        // 一对一
        Scene.belongsTo(app.model.SystemUser, { foreignKey: 'creator', targetKey: 'id', as: 'user' });
    }

    return Scene;
};