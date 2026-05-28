const express = require("express");

const router = express.Router();

const {
  bindBank,
} = require(
  "../controllers/bankController"
);

router.post(
  "/bind",
  bindBank
);

module.exports = router;