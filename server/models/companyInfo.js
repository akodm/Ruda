module.exports = (sequelize, DataTypes) => {
    const CompanyInfo = sequelize.define("companyInfo", {
        id : {
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true
        },
        companyCEO : {
            type: DataTypes.STRING,
        },
        companyQuestion : {
            type: DataTypes.STRING,
        },
        companyRule : {
            type: DataTypes.STRING,
        },
        companyAwards : {
            type: DataTypes.STRING,
        },
        companyOccupation : {
            type: DataTypes.STRING,
        },
        companyIntro : {
            type: DataTypes.STRING,
        },
        companyAgeAvg : {
            type: DataTypes.STRING,
        },
        companyRequest : {
            type: DataTypes.STRING,
        },
        companySince : {
            type: DataTypes.STRING,
        },
        companyFile : {
            type: DataTypes.STRING,
        },
        companyPortfolio : {
            type: DataTypes.STRING,
        },
        companyLike : {
            type: DataTypes.INTEGER,
        },
        companyClick : {
            type: DataTypes.INTEGER,
        },
        companyWelfare : {
            type: DataTypes.STRING,
        },
        companyWorkDate : {
            type: DataTypes.STRING,
        },
        companyState : {
            type: DataTypes.STRING,
        },
    });
    return CompanyInfo;
};