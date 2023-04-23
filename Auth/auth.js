const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/').User;
const bcrypt = require("bcrypt");

var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRET_KEY


// var localStrategy = new LocalStrategy(
//     { usernameField: "email", passwordField: "password" },
//     function (email, password, done) {
//         User.findOne({ where: { email: email }, raw: true, })
//             .then((user) => {
//                 if (!user) { return done(null, false); }
//                 bcrypt.compare(password, user.password).then((res) => {
//                     if (!res) {
//                         return done(null, false);
//                     } else {
//                         return done(null, user);
//                     }
//                 })
//             }).catch((err) => {
//                 return done(err);
//             })
//     }
// )
// passport.use(localStrategy);

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
    var user = User.findOne({
        where: { id: jwt_payload.id }
    })
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

passport.use(strategy);