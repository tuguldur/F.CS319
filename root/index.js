const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const cookie = require("cookie-session");
require("dotenv").config();
require("./passport.init");
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));
if (!Boolean(process.env.DEVELOPMENT)) {
  app.use(express.static(path.join(__dirname, "/client/build")));
}
app.use(express.json());
// passport
app.use(
  cookie({
    name: "root-token",
    maxAge: 72 * 60 * 60 * 1000, // token will expire after 72 hours
    keys: [process.env.COOKIE_SECRET],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api", require("./src/routes"));
if (!Boolean(process.env.DEVELOPMENT))
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
    app.use((request, response, next) => {
      const error = new Error("Not found");
      error.status = 404;
      next(error);
    });
    // error handler middleware
    app.use((error, request, response, next) => {
      res.status(error.status || 500).send({
        error: {
          status: error.status || 500,
          message: "Error",
        },
      });
    });
  });
app.listen(process.env.PORT || 5000, "0.0.0.0", () => {
  console.log(`App listening on port ${process.env.PORT || 5000}`);
  console.log("Press Ctrl+C to quit.");
});
