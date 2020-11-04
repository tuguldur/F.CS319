const express = require("express");
const passport = require("passport");
const router = express.Router();
const auth = require("../controllers/auth");
const validator = require("../middleware/validator");
// middleware
const token = require("../middleware/token");
/**
 * /api/auth:
 */
router.get("/", token, auth.index);
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, error) => {
    if (!user || err) {
      return res.json({
        status: false,
        errors: error || [
          {
            param: "email",
            msg: "Failed to login",
          },
        ],
      });
    }
    req.logIn(user, (e) => {
      if (e)
        return res.json({
          status: false,
          errors: [
            {
              param: "email",
              msg: "Failed to login",
            },
          ],
        });
      return res.json({ status: true });
    });
  })(req, res, next);
});
router.post("/register", validator.register, auth.register);
router.get("/logout", (req, res) => {
  req.logout();
  return res.json({ status: true });
});
module.exports = router;
