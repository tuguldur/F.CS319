const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.send("👻👻"));
router.use("/auth", require("./auth.js"));
module.exports = router;
