const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const Registered = require("../models/registeredModel");

const serverUrl = process.env.SERVER_URL;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const googleLogin = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${serverUrl}${process.env.GOOGLE_CALLBACK_URL}`,
  },
  async (accessToken, refreshToken, profile, done) => {
    const token = jwt.sign(
      {
        email: profile.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    try {
      let isRegistered = await Registered.findOne({
        where: { email: profile.email },
      });
      if (!isRegistered) {
        const userResponse = {
          nr: true,
        };
        return done(null, userResponse);
      }

      let user = await User.findOne({ where: { email: profile.email } });
      if (user) {
        user = await user.update({
          username: profile.displayName,
          avatar: profile.picture,
        });

        console.log(token);

        const userResponse = {
          email: profile.email,
          username: profile.displayName,
          avatar: profile.picture,
          token: token,
        };
        return done(null, userResponse);
      } else {
        user = await User.create({
          email: profile.email,
          username: profile.displayName,
          avatar: profile.picture,
        });
        const userResponse = {
          email: profile.email,
          username: profile.displayName,
          avatar: profile.picture,
          token: token,
        };
        console.log(token);
        return done(null, userResponse);
      }
    } catch (err) {
      console.log(err.message);
      return done(null, false, { message: err.message });
    }
  }
);

passport.use(googleLogin);
