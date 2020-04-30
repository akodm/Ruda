module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define("company", {
        email : {
            type: DataTypes.STRING,
            primaryKey : true,
            allowNull: false
        },
        companyPass : {
            type: DataTypes.STRING,
        },
        companyName : {
            type: DataTypes.STRING,
        },
        companyPhone : {
            type: DataTypes.STRING,
        },
        companyAdd : {
            type: DataTypes.STRING,
        },
        companyCate : {
            type: DataTypes.STRING,
        },
    });
    Company.associate = function(models) {
        Company.hasMany(models.mail);
    }
    return Company;
};