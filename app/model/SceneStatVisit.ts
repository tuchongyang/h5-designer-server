module.exports = app => {
    const {  INTEGER } = app.Sequelize;

    const SceneStatVisit = app.model.define('scene_stat_visit', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        sceneId: { type: INTEGER, allowNull: false },
        pv: { type: INTEGER, defaultValue: 0 },
        uv: { type: INTEGER, defaultValue: 0 },
        ip: { type: INTEGER, defaultValue: 0 },
        userAgent: { type: INTEGER, defaultValue: 0 },
    }, { freezeTableName: true, timestamps: true });
    // 表关联的字段
    SceneStatVisit.associate = function () {
        // 一对一
        SceneStatVisit.belongsTo(app.model.Scene, { foreignKey: 'sceneId', targetKey: 'id', as: 'scene' });
    }
    return SceneStatVisit;
};