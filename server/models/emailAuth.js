module.exports = (sequelize, DataTypes) => {
    const EmailAuth = sequelize.define("emailAuth", {
        id : {
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true
        },
        token : {
            type: DataTypes.STRING,
            allowNull: false
        },
        expire : {
            type: DataTypes.STRING,
        },
    });
    return EmailAuth;
};