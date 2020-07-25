module.exports = (sequelize, DataTypes) => {
    const Activity = sequelize.define("activity", {
        id : {
            type: DataTypes.INTEGER,        // 구분용 키 값
            primaryKey : true,
            autoIncrement: true
        },
        activityCate : {
            type: DataTypes.STRING,         // 활동 구분
        },
        activityName : {
            type: DataTypes.STRING,         // 활동 이름
        },
        activityStartDate : {
            type: DataTypes.STRING,         // 활동 시작 날짜
        },
        activityEndDate : {
            type: DataTypes.STRING,         // 활동 끝 날짜
        },
    });
    Activity.associate = function(models) {
        Activity.belongsTo(models.user)
    }
    return Activity;
};