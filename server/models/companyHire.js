module.exports = (sequelize, DataTypes) => {
    const CompanyHire = sequelize.define("companyHire", {
        id : {
            type: DataTypes.INTEGER,        // 구분용 키 값
            primaryKey : true,
            autoIncrement: true
        },
        companySugeuser : {
            type: DataTypes.STRING,         // 기업이 제안한 유저
        },
        companyHireUser : {
            type: DataTypes.STRING,           // 채용한 유저
        },
    });
    CompanyHire.associate = function(models) {
        CompanyHire.belongsTo(models.user);
    }
    return CompanyHire;
};