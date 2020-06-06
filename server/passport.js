let models = require('./models');
let config = require('./server-configs');

const User = models.user;

let FacebookStrategy = require('passport-facebook').Strategy;
let GoogleStrategy = require('passport-google-oauth20').Strategy;
let NaverStrategy = require('passport-naver').Strategy;

let JwtStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.app.secretKey;
opts.ignoreExpiration = true;

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
        clientID: config.app.googleId,
        clientSecret: config.app.googleSd,
        callbackURL: "http://localhost:5000/users/google/callback"
      },
      function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile)
      }
    ));

    passport.use(new FacebookStrategy({
        clientID: config.app.facebookId,
        clientSecret: config.app.facebookSd,
        callbackURL: 'http://localhost:5000/users/facebook/callback'
      },
      function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
      })
    );

    passport.use(new NaverStrategy({
        clientID: config.app.naverId,
        clientSecret: config.app.naverSd,
        callbackURL: "http://localhost:5000/users/naver/callback"
    }, 
      function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
      }
    ));
};