module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        email : {
            type: DataTypes.STRING,     // 이메일
            primaryKey : true,
            allowNull: false
        },
        userPass : {
            type: DataTypes.STRING,     // 로그인 비밀번호
        },
        userName : {
            type: DataTypes.STRING,     // 유저 이름
        },
        userPhone : {
            type: DataTypes.STRING,     // 유저 번호
        },
        userAdd : {
            type: DataTypes.STRING,     // 주소
        },
        userCate : {
            type: DataTypes.STRING,     // 주소
        },
    });
    User.associate = function(models) {
        User.hasMany(models.mail);
        User.hasMany(models.hireBoard);
    }
    return User;
};