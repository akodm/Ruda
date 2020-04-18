module.exports = (sequelize, DataTypes) => {
    const HireBoard = sequelize.define("hireBoard", {
        id : {
            type: DataTypes.INTEGER,
            primaryKey : true,
            allowNull: false
        },
        companyId : {
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
        boardTag : {
            type: DataTypes.STRING,
        },
    });
    // User.associate = function(models) {
    //     User.hasMany(models.slackchat)
    // }
    return HireBoard;
};