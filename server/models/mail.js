module.exports = (sequelize, DataTypes) => {
    const Mail = sequelize.define("mail", {
        id : {
            type: DataTypes.INTEGER,        // 구분용 키 값
            primaryKey : true,
            autoIncrement: true
        },
        title : {
            type: DataTypes.STRING,         // 제목
        },
        content : {
            type: DataTypes.STRING,         // 내용
        },
        readState : {
            type: DataTypes.BOOLEAN,        // 읽은지 여부
        },
        target : {
            type: DataTypes.INTEGER(11),    // 받는 이
        }
    });
    Mail.associate = function(models) {
        Mail.belongsTo(models.user)         // 보낸 이
    }
    return Mail;
};