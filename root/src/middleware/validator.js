const { check } = require("express-validator");

exports.new_staff = [
  check("email").isEmail(),
  check("name")
    .isLength({
      min: 2,
      max: 72,
    })
    .withMessage("Must be between 2 and 72 in length"),
  check("type")
    .isIn(["admin", "student", "teacher", "diploma", "department"])
    .withMessage("Invalid role attached"),
  check("password")
    .isLength({
      min: 6,
      max: 128,
    })
    .withMessage("Must be between 6 and 128 in length"),
];
exports.auth = [
  check("email").isEmail(),
  check("password")
    .isLength({
      min: 6,
      max: 128,
    })
    .withMessage("Must be between 6 and 128 in length"),
];
