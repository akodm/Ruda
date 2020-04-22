module.exports = (sequelize, DataTypes) => {
    const UserInfo = sequelize.define("userInfo", {
        id : {
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true
        },
        userTraning : {
            type: DataTypes.STRING,
        },
        userUnvcity : {
            type: DataTypes.STRING,
        },
        userSubject : {
            type: DataTypes.STRING,
        },
        userAwards : {
            type: DataTypes.STRING,
        },
        userCertification : {
            type: DataTypes.STRING,
        },
        userIntro : {
            type: DataTypes.STRING,
        },
        userKeyword : {
            type: DataTypes.STRING,
        },
        userTemplete : {
            type: DataTypes.STRING,
        },
        userGraph : {
            type: DataTypes.STRING,
        },
        userFile : {
            type: DataTypes.STRING,
        },
        userPortfolio : {
            type: DataTypes.STRING,
        },
        userLike : {
            type: DataTypes.INTEGER,
        },
        userSuggestion : {
            type: DataTypes.STRING,
        },
        userClick : {
            type: DataTypes.INTEGER,
        },
        userSpecialty : {
            type: DataTypes.STRING,
        },
        userWorkDate : {
            type: DataTypes.STRING,
        },
        userHireBool : {
            type: DataTypes.STRING,
        },
        userState : {
            type: DataTypes.STRING,
        },
    });
    UserInfo.associate = function(models) {
        UserInfo.belongsTo(models.user);
    }
    return UserInfo;
};