module.exports = (sequelize, DataTypes) => {
    const Award = sequelize.define("award", {
        id : {
            type: DataTypes.INTEGER,        // 구분용 키 값
            primaryKey : true,
            autoIncrement: true
        },
        awardCate : {
            type: DataTypes.STRING,         // 수상 구분
        },
        awardName : {
            type: DataTypes.STRING,         // 수상 이름
        },
        awardDate : {
            type: DataTypes.STRING,         // 수상 날짜
        },
    });
    Award.associate = function(models) {
        Award.belongsTo(models.user)
    }
    return Award;
};