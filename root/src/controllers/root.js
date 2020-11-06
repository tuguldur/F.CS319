const Root = require("../models/root");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
exports.index = (req, res) => {
  Root.find({ _id: { $ne: req.user._id } })
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
exports.delete = (req, res) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id) && req.user._id !== id) {
    Root.findByIdAndRemove(id)
      .then(() => res.json({ status: true }))
      .catch((err) => res.json({ status: false }));
  } else return res.json({ status: false });
};
