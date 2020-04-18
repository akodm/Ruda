module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        userId : {
            type: DataTypes.STRING,
            primaryKey : true,
            allowNull: false
        },
        userPass : {
            type: DataTypes.STRING,
            allowNull: false
        },
        userName : {
            type: DataTypes.STRING,
            allowNull: false
        },
        userEmail : {
            type: DataTypes.STRING,
        },
        userPhone : {
            type: DataTypes.STRING,
        },
        userAdd : {
            type: DataTypes.STRING,
        },
        userCate : {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    User.associate = function(models) {
        User.hasOne(models.userInfo);
        User.hasOne(models.hireBoard);
        User.hasOne(models.companyInfo);
        User.hasOne(models.companyHire);
        User.hasMany(models.mail);
    }
    return User;
};