// passport.init.js
const User = require("./src/models/user");
const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id)
    .select("-password")
    .then((user) => done(null, user))
    .catch(() => done(new Error("Failed to deserialize an user")));
});
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      User.findOne()
        .or([
          { email: new RegExp(`^${email.trim()}$`, "i") },
          { code: new RegExp(`^${email.trim()}$`, "i") },
        ])
        .then((user) => {
          if (!user) {
            return done(null, false, [
              {
                param: "email",
                msg: "User does not exist.",
              },
            ]);
          } else if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, [
              {
                param: "password",
                msg: "Pasword does not match.",
              },
            ]);
          } else return done(null, user);
        });
    }
  )
);
