module.exports = app => {
    const {  INTEGER } = app.Sequelize;

    const SceneFav = app.model.define('scene_fav', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        sceneId: { type: INTEGER, allowNull: false },
        userId: { type: INTEGER, allowNull: false },
    }, { freezeTableName: true, timestamps: true });
    // 表关联的字段
    SceneFav.associate = function () {
        // 一对一
        SceneFav.belongsTo(app.model.Scene, { foreignKey: 'sceneId', targetKey: 'id', as: 'scene' });
        SceneFav.belongsTo(app.model.SystemUser, { foreignKey: 'userId', targetKey: 'id', as: 'user' });
    }
    return SceneFav;
};