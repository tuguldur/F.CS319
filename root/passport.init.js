// passport.init.js
const Root = require("./src/models/root");
const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
passport.serializeUser((root, done) => done(null, root.id));
passport.deserializeUser((id, done) => {
  Root.findById(id)
    .select("-password")
    .then((root) => done(null, root))
    .catch(() => done(new Error("Failed to deserialize a root")));
});
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      Root.findOne({ email: new RegExp(`^${email.trim()}$`, "i") }).then(
        (root) => {
          if (!root) {
            return done(null, false, [
              {
                param: "email",
                msg: "User does not exist.",
              },
            ]);
          } else if (!bcrypt.compareSync(password, root.password)) {
            return done(null, false, [
              {
                param: "password",
                msg: "Pasword does not match.",
              },
            ]);
          } else return done(null, root);
        }
      );
    }
  )
);
