module.exports = (sequelize, DataTypes) => {
    const CompanyHire = sequelize.define("companyHire", {
        id : {
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true
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
    CompanyHire.associate = function(models) {
        CompanyHire.belongsTo(models.company);
    }
    return CompanyHire;
};