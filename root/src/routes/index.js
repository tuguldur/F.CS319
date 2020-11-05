const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.send("👻👻"));
router.use("/auth", require("./auth.js"));
router.use("/root", require("./root.js"));
module.exports = router;
