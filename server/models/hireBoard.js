module.exports = (sequelize, DataTypes) => {
    const HireBoard = sequelize.define("hireBoard", {
        id : {
            type: DataTypes.INTEGER,        // 구분용 값
            primaryKey : true,
            autoIncrement: true
        },
        title : {
            type: DataTypes.STRING,         // 제목
            allowNull: false
        },
        content : {
            type: DataTypes.TEXT,         // 내용
        },
        files : {
            type: DataTypes.JSON,         // 올린 파일 이미지 등
        },
        boardTag : {
            type: DataTypes.JSON,         // 게시판 내의 달린 태그
        },
        startDate : {
            type: DataTypes.STRING(10),         // 시작일
        },
        endDate : {
            type: DataTypes.STRING(10),         // 종료일
        },
        field : {
            type: DataTypes.STRING,         // 채용하는 분야
        }
    });
    HireBoard.associate = function(models) {
        HireBoard.belongsTo(models.user);
    }
    return HireBoard;
};