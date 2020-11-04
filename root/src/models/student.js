const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;
const studentSchema = new Schema({
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
// hash student password before saving into database
studentSchema.pre("save", function (next) {
  const current = this;
  if (!current.isModified("password")) return next();
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});
const student = mongoose.model("student", studentSchema);
module.exports = student;
