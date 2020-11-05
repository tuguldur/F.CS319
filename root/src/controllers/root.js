const Root = require("../models/root");
const { validationResult } = require("express-validator");
exports.index = (req, res) => {
  Root.find({})
    .select("-password")
    .then((root) => {
      return res.json(root);
    });
};
exports.create = (req, res) => {
  const { name, email, password, type } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(200).json({ errors: errors.array(), status: false });
  else {
    Root.find({ email: new RegExp(`^${email}$`, "i") }).then((root) => {
      if (root.length) {
        return res.status(200).json({
          errors: [
            {
              value: email,
              msg: "ажилтан бүртгэлтэй байна.",
              param: "email",
              location: "body",
            },
          ],
          status: false,
        });
      } else {
        Root.create({ name, email, type, password }).then(() => {
          return res.json({ status: true });
        });
      }
    });
  }
};
