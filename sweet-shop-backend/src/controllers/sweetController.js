const Sweet = require("../models/Sweet");

exports.addSweet = async (req, res) => {
  const sweet = await Sweet.create(req.body);
  res.json(sweet);
};

exports.getAllSweets = async (req, res) => {
  res.json(await Sweet.find());
};

exports.searchSweets = async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;
  let query = {};

  if (name) query.name = new RegExp(name, "i");
  if (category) query.category = category;
  if (minPrice || maxPrice)
    query.price = { $gte: minPrice || 0, $lte: maxPrice || Infinity };

  res.json(await Sweet.find(query));
};

exports.updateSweet = async (req, res) => {
  res.json(await Sweet.findByIdAndUpdate(req.params.id, req.body, { new: true }));
};

exports.deleteSweet = async (req, res) => {
  await Sweet.findByIdAndDelete(req.params.id);
  res.json({ message: "Sweet deleted" });
};

exports.purchaseSweet = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);
  if (sweet.quantity <= 0)
    return res.status(400).json({ message: "Out of stock" });

  sweet.quantity--;
  await sweet.save();
  res.json(sweet);
};

exports.restockSweet = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);
  sweet.quantity += req.body.amount;
  await sweet.save();
  res.json(sweet);
};
