const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const User = require("../models/userModel");
const { ExtractJwt } = passportJWT;

const JwtStrategy = passportJWT.Strategy;

passport.use(
  "checkJWT",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const email = String(jwtPayload.email);
        const user = await User.findOne({ where: { email: email } });
        return done(null, user);
      } catch (error) {
        return done(null, false, {
          message: error.message || "Something went wrong with your token",
        });
      }
    }
  )
);
