const token = (req, res, next) => {
  if (!req.user) res.status(401).json({ msg: "No token, authorizaton denied" });
  else next();
};
module.exports = token;
