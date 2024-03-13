const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const jwt = require("jsonwebtoken");

const User = require("../models/user");

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
      const oldUser = await User.findOneAndUpdate(
        { email: profile.email },
        { name: profile.displayName, avatar: profile.picture }
      );
      oldUser.token = token;
      if (oldUser) {
        return done(null, oldUser);
      }
    } catch (err) {
      console.log(err.message);
    }

    try {
      const newUser = await new User({
        email: profile.email,
        name: profile.displayName,
        avatar: profile.picture,
      }).save();
      newUser.token = token;
      return done(null, newUser);
    } catch (err) {
      console.log(err.message);
    }
  }
);

passport.use(googleLogin);