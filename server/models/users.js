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
            allowNull: false
        },
        userAdd : {
            type: DataTypes.STRING,
        },
        userCate : {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    // User.associate = function(models) {
    //     User.hasMany(models.slackchat)
    // }
    return User;
};