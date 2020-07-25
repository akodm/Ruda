const fs = require("fs");
const path = require("path");
const basename  = path.basename(__filename);
const Sequelize = require("sequelize");

const configs = require('../server-configs.js');

// 로컬에서 배포 실행용
// const config = require("../server_config");

// let config = {};
// process.env.NODE_ENV === 'development' ? config = require('../devServer_config') : config = require('../server_config');
 
const db = {};
 
const sequelize = new Sequelize(configs.app.db, configs.app.root, configs.app.pass, { host: configs.app.host, dialect: configs.app.dia, timezone: '+09:00' });

sequelize.authenticate().then(() => {
    console.log("연결 성공");
}).catch(err => {
    console.log("연결 실패: ", err);
});
 
fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
}).forEach(file => {
    let model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
 
db.sequelize = sequelize;
db.Sequelize = Sequelize;
 
module.exports = db;