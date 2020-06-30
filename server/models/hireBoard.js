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
            type: DataTypes.STRING,         // 내용
            allowNull: false
        },
        files : {
            type: DataTypes.STRING,         // 올린 파일 이미지 등
        },
        boardTag : {
            type: DataTypes.JSON,         // 게시판 내의 달린 태그
        },
    });
    HireBoard.associate = function(models) {
        HireBoard.belongsTo(models.user);
    }
    return HireBoard;
};