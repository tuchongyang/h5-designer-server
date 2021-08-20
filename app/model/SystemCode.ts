module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;

    const Code = app.model.define('system_code', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        email: { type: STRING, allowNull: false }, // 邮箱
        code: { type: STRING, allowNull: false }, // 密码

    }, { freezeTableName: true });
    return Code;
};