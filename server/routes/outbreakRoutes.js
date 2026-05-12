const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/outbreakController");
const { protect, adminOnly } = require("../middleware/auth");

router.get("/", ctrl.getAll);
router.get("/stats", ctrl.getStats);
router.get("/trends", ctrl.getTrends);
router.get("/:id", ctrl.getById);
router.post("/", protect, ctrl.create);
router.put("/:id", protect, ctrl.update);
router.delete("/:id", protect, adminOnly, ctrl.remove);

module.exports = router;
