module.exports = app => {
    const { STRING, INTEGER,TEXT } = app.Sequelize;

    const ScenePage = app.model.define('scene_page', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        name: STRING,
        sortIndex: INTEGER,//描述
        cover: STRING,//封面
        elements: TEXT,
        elementsPublish: TEXT,
        properties: TEXT,
        sceneId: { type: INTEGER, allowNull: false },//
    }, { freezeTableName: true, timestamps: true });
    
    // 表关联的字段
    ScenePage.associate = function () {
        // 一对一
        ScenePage.belongsTo(app.model.Scene, { foreignKey: 'sceneId', targetKey: 'id', as: 'scene' });
    }

    return ScenePage;
};