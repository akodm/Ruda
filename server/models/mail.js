module.exports = (sequelize, DataTypes) => {
    const Mail = sequelize.define("mail", {
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
        readState : {
            type: DataTypes.STRING,
        },
    });
    Mail.associate = function(models) {
        Mail.belongsToMany(models.user, {through: 'mailId'})
        Mail.belongsToMany(models.company, {through: 'mailId'})
    }
    return Mail;
};