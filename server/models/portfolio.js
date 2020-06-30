module.exports = (sequelize, DataTypes) => {
    const Portfolio = sequelize.define("portfolio", {
        id : {
            type: DataTypes.INTEGER,        // 구분용 키 값
            primaryKey : true,
            autoIncrement: true
        },
        title : {
            type: DataTypes.STRING,         // 제목
        },
        content : {
            type: DataTypes.STRING(255),         // 내용
        },
        tag : {
            type: DataTypes.JSON,         // 태그 목록
        },
        startDate : {
            type: DataTypes.STRING(20),         // 시작일
        },
        endDate : {
            type: DataTypes.STRING(20),         // 종료일
        },
        partner : {
            type: DataTypes.JSON,           // 프로젝트 구성원
        },
        projectCate : {
            type: DataTypes.STRING(50),         // 프로젝트 구분 - 교내 교외 등..
        },
        projectUrl : {
            type: DataTypes.STRING,         // 프로젝트 주소
        },
        imagesUrl : {
            type: DataTypes.JSON,         // 프로젝트 이미지 파이어베이스 주소 배열로 담음
        },
    });
    Portfolio.associate = function(models) {
        Portfolio.belongsTo(models.user)
    }
    return Portfolio;
};