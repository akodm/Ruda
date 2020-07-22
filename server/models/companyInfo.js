module.exports = (sequelize, DataTypes) => {
    const CompanyInfo = sequelize.define("companyInfo", {
        id : {
            type: DataTypes.INTEGER,    // 구분을 위한 번호
            primaryKey : true,
            autoIncrement: true
        },
        companyName : {
            type: DataTypes.STRING(20),     // 기업 이름
        },
        companyPhone : {
            type: DataTypes.STRING(11),     // 기업 번호
        },
        companyAdd : {
            type: DataTypes.STRING(100),     // 주소
        },
        companyImageUrl : {
            type: DataTypes.STRING,     // 기업 사진 - firebase 이미지 경로
        },
        companyCEO : {
            type: DataTypes.STRING(11),     // 기업 대표
        },
        companyField : {
            type: DataTypes.STRING(50),     // 기업 분야
        },
        companyTags : {
            type: DataTypes.JSON,     // 기업 태그
        },
        companySince : {
            type: DataTypes.STRING(10),     // 기업 설립일
        },
        companyAgeAvg : {
            type: DataTypes.STRING(10),     // 기업 평균 연령
        },
        companyIntro : {
            type: DataTypes.STRING,     // 기업 소개
        },
        companyRule : {
            type: DataTypes.JSON,     // 사내 규칙
        },
        companyWelfare : {
            type: DataTypes.JSON,     // 기업의 복지
        },
        companyRequest : {
            type: DataTypes.JSON,     // 기업에서 필요로 하는 최소 조건
        },
        companyWorkCate : {             
            type: DataTypes.STRING(10),
        },
        companyWorkDateState : {
            type: DataTypes.STRING(10),     // 일할 수 있는 상태
        },
        companyWorkDate : {
            type: DataTypes.STRING(30),     // 기업에서 일할 수 있는 날짜
        },
        companyQuestion : {
            type: DataTypes.JSON,     // 기업이 준비한 질문     
        },
        companyOccupation : {
            type: DataTypes.STRING(50),     // 기업 원하는 직종
        },
        companyLike : {
            type: DataTypes.INTEGER(11),    // 추천 받은 수
        },
        companyUrl : {
            type: DataTypes.STRING,     // 기업 사이트 주소
        },
        companyHistory : {
            type: DataTypes.JSON,     // 기업 연혁 { year, text }
        },
    });
    CompanyInfo.associate = function(models) {
        CompanyInfo.belongsTo(models.user);
    }
    return CompanyInfo;
};