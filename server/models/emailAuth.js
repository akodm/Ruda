module.exports = (sequelize, DataTypes) => {
    const EmailAuth = sequelize.define("emailAuth", {
        id : {
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true
        },
        email : {
            type: DataTypes.STRING,     // 인증용 이메일
        },
        token : {
            type: DataTypes.STRING,     // 인증용 값
            allowNull: false
        },
        expire : {
            type: DataTypes.STRING,     // 만료 기한
        },
        use : {
            type: DataTypes.STRING,     // 사용 여부
        }
    });
    return EmailAuth;
};