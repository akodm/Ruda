module.exports = (sequelize, DataTypes) => {
    const HireBoard = sequelize.define("hireBoard", {
        id : {
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true
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
    HireBoard.associate = function(models) {
        HireBoard.belongsTo(models.company);
    }
    return HireBoard;
};