const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;
const rootSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});
// hash root password before saving into database
rootSchema.pre("save", function (next) {
  const current = this;
  if (!current.isModified("password")) return next();
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});
const root = mongoose.model("root", rootSchema);
module.exports = root;
