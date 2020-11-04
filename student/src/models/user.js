const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
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
// hash admin password before saving into database
userSchema.pre("save", function (next) {
  const current = this;
  if (!current.isModified("password")) return next();
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});
const user = mongoose.model("user", userSchema);
module.exports = user;
