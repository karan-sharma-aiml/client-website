const express =
  require("express");

const router =
  express.Router();

const {
  getPlans,
  createPlan,
} = require(
  "../controllers/planController"
);

router.get(
  "/all",
  getPlans
);

router.post(
  "/create",
  createPlan
);

module.exports = router;