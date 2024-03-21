const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    session: false,
  }),
  (req, res) => {
    if (req.user && req.user.nr === true) {
      return res.redirect(`${process.env.FRONTEND_URL}/nr`);
    }

    res.redirect(
      `${process.env.FRONTEND_URL}/googleToken?token=${req.user.token}`
    );
  }
);

module.exports = router;
