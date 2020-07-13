module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define("like", {
        id : {
            type: DataTypes.INTEGER,        // 구분용 키 값
            primaryKey : true,
            autoIncrement: true
        },
        infoUserId : {
            type: DataTypes.STRING,         // 좋아요 한 유저 아이디
        },
    });
    Like.associate = function(models) {     // 누른 사용자 아이디
        Like.belongsTo(models.user)
    }
    return Like;
};