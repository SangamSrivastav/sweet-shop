const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const {
  addSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
} = require("../controllers/sweetController");

router.post("/", auth, admin, addSweet);
router.get("/", auth, getAllSweets);
router.get("/search", auth, searchSweets);
router.put("/:id", auth, admin, updateSweet);
router.delete("/:id", auth, admin, deleteSweet);
router.post("/:id/purchase", auth, purchaseSweet);
router.post("/:id/restock", auth, admin, restockSweet);

module.exports = router;
