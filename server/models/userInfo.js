module.exports = (sequelize, DataTypes) => {
    const UserInfo = sequelize.define("userInfo", {
        id : {
            type: DataTypes.INTEGER,    // 구분을 위한 번호
            primaryKey : true,
            autoIncrement: true
        },
        userTraning : {
            type: DataTypes.STRING,     // 실습생 여부
        },
        userUnvcity : {
            type: DataTypes.STRING,     // 대학
        },
        userSubject : {
            type: DataTypes.STRING,     // 과
        },
        userAwards : {
            type: DataTypes.STRING,     // 수상 이력
        },
        userCertification : {
            type: DataTypes.STRING,     // 자격증
        },
        userIntro : {
            type: DataTypes.STRING,     // 자기 소개
        },
        userKeyword : {
            type: DataTypes.STRING,     // 본인 키워드
        },
        userTags : {
            type: DataTypes.STRING,     // 본인 잘하는 태그 ( 언어 등 )
        },
        userFile : {
            type: DataTypes.STRING,     // 올린 파일
        },
        userPortfolio : {
            type: DataTypes.STRING,     // 올린 포트폴리오
        },
        userLike : {
            type: DataTypes.INTEGER,    // 받은 관심있어요 수
        },
        userSuggestion : {
            type: DataTypes.STRING,     // 받은 제안
        },
        userClick : {
            type: DataTypes.INTEGER,    // 클릭된 수
        },
        userSpecialty : {
            type: DataTypes.STRING,     // 잘하는 특기
        },
        userWorkDate : {
            type: DataTypes.STRING,     // 일할 수 있는 날짜
        },
        userHireBool : {
            type: DataTypes.STRING,     // 채용 여부
        },
        userState : {
            type: DataTypes.STRING,     // 현재 구직 상태
        },
    });
    UserInfo.associate = function(models) {
        UserInfo.belongsTo(models.user);
    }
    return UserInfo;
};