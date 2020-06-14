module.exports = (sequelize, DataTypes) => {
    const CompanyInfo = sequelize.define("companyInfo", {
        id : {
            type: DataTypes.INTEGER,    // 구분을 위한 번호
            primaryKey : true,
            autoIncrement: true
        },
        companyName : {
            type: DataTypes.STRING,     // 기업 이름
        },
        companyPhone : {
            type: DataTypes.STRING,     // 기업 번호
        },
        companyAdd : {
            type: DataTypes.STRING,     // 주소
        },
        companyField : {
            type: DataTypes.STRING,     // 기업 분야
        },
        companyImage : {
            type: DataTypes.STRING,     // 기업 사진
        },
        companyCEO : {
            type: DataTypes.STRING,     // 기업 대표
        },
        companyQuestion : {
            type: DataTypes.STRING,     // 기업이 준비한 질문     
        },
        companyRule : {
            type: DataTypes.STRING,     // 사내 규칙
        },
        companyAwards : {
            type: DataTypes.STRING,     // 기업이 수상한 이력
        },
        companyOccupation : {
            type: DataTypes.STRING,     // 기업 원하는 직종
        },
        companyIntro : {
            type: DataTypes.STRING,     // 기업 소개
        },
        companyAgeAvg : {
            type: DataTypes.STRING,     // 기업 평균 연령
        },
        companyRequest : {
            type: DataTypes.STRING,     // 기업에서 필요로 하는 최소 조건
        },
        companySince : {
            type: DataTypes.STRING,     // 기업 설립일
        },
        companyFile : {
            type: DataTypes.STRING,     // 기업이 올린 파일
        },
        companyPortfolio : {
            type: DataTypes.STRING,     // 기업의 포트폴리오
        },
        companyLike : {
            type: DataTypes.INTEGER,    // 추천 받은 수
        },
        companyClick : {
            type: DataTypes.INTEGER,    // 클릭된 수
        },
        companyWelfare : {
            type: DataTypes.STRING,     // 기업의 복지
        },
        companyWorkDate : {
            type: DataTypes.STRING,     // 기업에서 일할 수 있는 날짜
        },
        companyState : {
            type: DataTypes.STRING,     // 기업의 현재 채용 상태
        },
    });
    CompanyInfo.associate = function(models) {
        CompanyInfo.belongsTo(models.user);
    }
    return CompanyInfo;
};