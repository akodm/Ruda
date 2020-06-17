module.exports = (sequelize, DataTypes) => {
    const UserInfo = sequelize.define("userInfo", {
        id : {
            type: DataTypes.INTEGER,    // 구분을 위한 번호
            primaryKey : true,
            autoIncrement: true
        },
        userName : {
            type: DataTypes.STRING(10),     // 유저 이름
        },
        userPhone : {
            type: DataTypes.STRING(20),     // 유저 번호
        },
        userAdd : {
            type: DataTypes.STRING(50),     // 주소
        },
        userImageUrl : {
            type: DataTypes.STRING,     // 본인 사진 - firebase 이미지 경로
        },
        userTraning : {
            type: DataTypes.STRING(2),     // 실습생 여부
        },
        userUnvcity : {
            type: DataTypes.STRING(11),     // 대학
        },
        userSubject : {
            type: DataTypes.STRING(20),     // 과
        },
        userAttendDate : {
            type: DataTypes.STRING(10),     // 대학 재학 기간 및 졸업일
        },
        userAttend : {
            type: DataTypes.STRING(10),     // 대학 다니는 구분 휴학 등..
        },
        userField : {
            type: DataTypes.STRING(10),     // 희망 직무
        },
        userAwards : {
            type: DataTypes.JSON,     // 수상 이력
        },
        userCertification : {
            type: DataTypes.JSON,     // 자격증
        },
        userIntro : {
            type: DataTypes.STRING(50),     // 자기 소개
        },
        userKeyword : {
            type: DataTypes.JSON,     // 본인 키워드
        },
        userTags : {
            type: DataTypes.JSON,     // 본인 잘하는 태그 ( 언어 등 )
        },
        userLike : {
            type: DataTypes.INTEGER(11),    // 받은 관심있어요 수
        },
        userSuggestion : {
            type: DataTypes.JSON,     // 받은 제안
        },
        userClick : {
            type: DataTypes.INTEGER(11),    // 클릭된 수
        },
        userSpecialty : {
            type: DataTypes.JSON,     // 잘하는 특기
        },
        userTraningDate : {
            type: DataTypes.STRING(20),     // 실습 할 수 있는 날짜
        },
        userWorkDate : {
            type: DataTypes.STRING(20),     // 일할 수 있는 날짜
        },
        userHireBool : {
            type: DataTypes.STRING(10),     // 채용 여부
        },
        userState : {
            type: DataTypes.STRING(10),     // 현재 구직 상태
        },
    });
    UserInfo.associate = function(models) {
        UserInfo.belongsTo(models.user);
    }
    return UserInfo;
};