exports.index = (req, res) => {
  return res.json({ status: true, user: req.user });
};
