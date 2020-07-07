module.exports = (sequelize, DataTypes) => {
    const Certificate = sequelize.define("certificate", {
        id : {
            type: DataTypes.INTEGER,        // 구분용 키 값
            primaryKey : true,
            autoIncrement: true
        },
        certificateCate : {
            type: DataTypes.STRING,         // 자격증 구분
        },
        certificateName : {
            type: DataTypes.STRING,         // 자격증 이름
        },
        certificateDate : {
            type: DataTypes.STRING,         // 자격증 날짜
        },
    });
    Certificate.associate = function(models) {
        Certificate.belongsTo(models.user)
    }
    return Certificate;
};