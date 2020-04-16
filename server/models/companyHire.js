module.exports = (sequelize, DataTypes) => {
    const CompanyHire = sequelize.define("companyHire", {
        userId : {
            type: DataTypes.STRING,
            primaryKey : true,
            allowNull: false
        },
        companyQuestUser : {
            type: DataTypes.JSON,
        },
        companySugeuser : {
            type: DataTypes.JSON,
        },
        companyHireUser : {
            type: DataTypes.JSON,
        },
    });
    // User.associate = function(models) {
    //     User.hasMany(models.slackchat)
    // }
    return CompanyHire;
};