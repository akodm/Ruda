let configs = {};
process.env.NODE_ENV === "development" ? configs = require('./server-configs') : configs = require('./server-configs');

function securityFunction() {
    this.originCheck = function origin(req) {
        if(req.headers.origin !== configs.app.c_local) {
            return false;
        } else {
            return true;
        }
    }

    this.tokenCheck = function token(req) {
        
    }
}

module.exports = securityFunction;