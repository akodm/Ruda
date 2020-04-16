module.exports = (sequelize, DataTypes) => {
    const Mail = sequelize.define("mail", {
        id : {
            type: DataTypes.INTEGER,
            primaryKey : true,
            allowNull: false
        },
        userAndCompanyId : {
            type: DataTypes.STRING,
            allowNull: false
        },
        title : {
            type: DataTypes.STRING,
            allowNull: false
        },
        content : {
            type: DataTypes.STRING,
            allowNull: false
        },
        files : {
            type: DataTypes.STRING,
            allowNull: false
        },
        readState : {
            type: DataTypes.STRING,
        },
    });
    // User.associate = function(models) {
    //     User.hasMany(models.slackchat)
    // }
    return Mail;
};