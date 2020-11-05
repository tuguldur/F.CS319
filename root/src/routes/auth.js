const express = require("express");
const passport = require("passport");
const router = express.Router();
const auth = require("../controllers/auth");
// middleware
const token = require("../middleware/token");
const validator = require("../middleware/validator");
/**
 * /api/auth:
 */
router.get("/", token, auth.index);
router.post("/login", validator.auth, (req, res, next) => {
  passport.authenticate("local", (err, root, error) => {
    if (!root || err) {
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
    req.logIn(root, (e) => {
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
router.get("/logout", token, (req, res) => {
  req.logout();
  return res.json({ status: true });
});
module.exports = router;
