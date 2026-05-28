const express = require("express");

const router = express.Router();

const {
  giveDailyIncome,
} = require(
  "../controllers/incomeController"
);

router.post(
  "/daily",
  giveDailyIncome
);

module.exports = router;