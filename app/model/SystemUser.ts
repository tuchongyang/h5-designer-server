module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const User = app.model.define('system_user', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        username: { type: STRING, unique: true, allowNull: false }, // 用户名
        email: { type: STRING }, // 邮箱
        password: { type: STRING, allowNull: false }, // 密码
        name: STRING, // 姓名
        sex: { type: INTEGER, defaultValue: 1 }, // 用户性别：1男性, 2女性, 0未知
        // age: { type: INTEGER, defaultValue: 0 }, // 年龄
        avatar: STRING, // 头像
        type: INTEGER, // 类型，1：管理员，2：普通用户
        phone: { type: STRING }, // 手机号码
        status: { type: INTEGER, defaultValue: 1 }, //  用户状态： 0:禁用, 1:启用
        birth: DATE,
        address: STRING,
        fileSize: { type: INTEGER, defaultValue: 0 },
        lastLoginTime: DATE, // 上次登录时间
        lastLoginIp: STRING, // 上次登录地点
        // session_key: STRING, // 微信session_key
    }, { freezeTableName: true });

    // 表关联的字段
    User.associate = function () {
        // 一对多
        // app.model.User.hasMany(app.model.Diary, { foreignKey: 'user_id', targetKey: 'id'});
        /**
         * User.belongsTo(关联的模型, { foreignKey: '使用什么字段关联', targetKey: '与关联的模型那个字段关联', as: '别名' });
        */
        // 一对一
        // User.belongsTo(app.model.SystemFile, { foreignKey: 'avatarId', targetKey: 'id', as: 'avatar' });
    }
    return User;
};