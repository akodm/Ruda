module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        id : {
            type: DataTypes.STRING,
            primaryKey : true,
            allowNull: false
        },
        userPass : {
            type: DataTypes.STRING,
        },
        userName : {
            type: DataTypes.STRING,
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
        },
    });
    User.associate = function(models) {
        User.hasMany(models.mail);
    }
    return User;
};