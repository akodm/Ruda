module.exports = (sequelize, DataTypes) => {
    const UserInfo = sequelize.define("userInfo", {
        userId : {
            type: DataTypes.STRING,
            primaryKey : true,
            allowNull: false
        },
        userTraning : {
            type: DataTypes.STRING,
            allowNull: false
        },
        userUnvcity : {
            type: DataTypes.STRING,
            allowNull: false
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
    // User.associate = function(models) {
    //     User.hasMany(models.slackchat)
    // }
    return UserInfo;
};