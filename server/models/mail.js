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
        files : {
            type: DataTypes.STRING,         // 주고받은 파일 등
        },
        readState : {
            type: DataTypes.STRING,         // 읽은지 여부
        },
        targetUser : {
            type: DataTypes.STRING,         // 메시지의 상대방
        }
    });
    Mail.associate = function(models) {
        Mail.belongsTo(models.user)
    }
    return Mail;
};