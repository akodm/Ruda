module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        id : {
            type: DataTypes.INTEGER,     // 구분용
            primaryKey : true,
            autoIncrement: true
        },
        email : {
            type: DataTypes.STRING,     // 이메일
            allowNull: false
        },
        authCate : {
            type : DataTypes.STRING(10),    // 소셜 로그인 구분
            allowNull: false
        },
        userPass : {
            type: DataTypes.STRING,     // 로그인 비밀번호
        },
        userCate : {
            type: DataTypes.STRING(10),     // 기업인지 유저인지
        },
    });
    User.associate = function(models) {
        User.hasMany(models.mail);
        User.hasMany(models.portfolio);
        User.hasMany(models.award);
        User.hasMany(models.certificate);
        User.hasMany(models.activity);
        User.hasMany(models.like);
    }
    return User;
};