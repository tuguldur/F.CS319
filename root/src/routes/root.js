const express = require("express");
const router = express.Router();
const root = require("../controllers/root");
// middleware
const token = require("../middleware/token");
const validator = require("../middleware/validator");
router.get("/", token, root.index);
router.get("/delete/:id", token, root.delete);
router.post("/create", token, validator.new_staff, root.create);
module.exports = router;
