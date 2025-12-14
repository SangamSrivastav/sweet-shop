const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  await User.create({ ...req.body, password: hash });
  res.json({ msg: "Registered" });
};

exports.login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(401).json({ msg: "Invalid" });

  const ok = await bcrypt.compare(req.body.password, user.password);
  if (!ok) return res.status(401).json({ msg: "Invalid" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );
  res.json({ token });
};
