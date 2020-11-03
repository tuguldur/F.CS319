const User = require("../models/user");
const { validationResult } = require("express-validator");
exports.index = (req, res) => {
  return res.json({ status: true, user: req.user });
};
exports.register = (req, res) => {
  const { email, name, code, password, confirm_password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ status: false, errors: errors.array() });
  } else if (password !== confirm_password) {
    return res.json({
      status: false,
      errors: [{ param: "confirm_spassword", msg: "Password does not match." }],
    });
  } else {
    User.findOne()
      .or([
        { email: new RegExp(`^${email.trim()}$`, "i") },
        { code: new RegExp(`^${code.trim()}$`, "i") },
      ])
      .then((user) => {
        if (!user) {
          User.create(
            {
              name,
              email: email.toLowerCase(),
              code,
              password,
            },
            (err, created) =>
              err && !created
                ? res.json({
                    status: false,
                    msg: "Failed to register :((",
                    err,
                  })
                : res.json({ status: true })
          );
        } else {
          return res.json({
            status: false,
            errors: [{ param: "email", msg: "This email already in use" }],
          });
        }
      });
  }
};
