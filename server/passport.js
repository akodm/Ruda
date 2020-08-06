let models = require('./models');

let configs = {};
process.env.NODE_ENV === "development" ? configs = require('./server-configs') : configs = require('./server-configs');

const User = models.user;

let FacebookStrategy = require('passport-facebook').Strategy;
let GoogleStrategy = require('passport-google-oauth20').Strategy;
let NaverStrategy = require('passport-naver').Strategy;

let JwtStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = configs.app.secretKey;
opts.jsonWebTokenOptions = { expiresIn : '24h' }

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({
            where : {
                email : jwt_payload.email,
                authCate : jwt_payload.tag,
            }
        })
        .then(user => {
            if(user) {
                return done(null, user);
            }
            return done(null, false);
        }).catch(err => console.log("passport jwt err : " + err));
    }));

    passport.use(new GoogleStrategy({
        clientID: configs.app.googleId,
        clientSecret: configs.app.googleSd,
        callbackURL: `${configs.app.s_local}/users/google/callback`
      },
      function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile)
      }
    ));

    passport.use(new FacebookStrategy({
        clientID: configs.app.facebookId,
        clientSecret: configs.app.facebookSd,
        callbackURL: `${configs.app.s_local}/users/facebook/callback`
      },
      function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
      })
    );

    passport.use(new NaverStrategy({
        clientID: configs.app.naverId,
        clientSecret: configs.app.naverSd,
        callbackURL: `${configs.app.s_local}/users/naver/callback`
    }, 
      function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
      }
    ));
};