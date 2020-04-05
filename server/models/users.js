module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        userId : {
            type: DataTypes.STRING,
            primaryKey : true,
            allowNull: false
        }
    });
    // User.associate = function(models) {
    //     User.hasMany(models.slackchat)
    // }
    return User;
};