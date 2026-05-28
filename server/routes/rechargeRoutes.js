const express =
  require("express");

const router =
  express.Router();

const {

  createRecharge,

  approveRecharge,

  rejectRecharge,

  getPendingRecharges,

  getAllRecharges,

  getUserRechargeHistory,

} = require(
  "../controllers/rechargeController"
);

/* CREATE RECHARGE */

router.post(
  "/create",
  createRecharge
);

/* APPROVE RECHARGE */

router.post(
  "/approve",
  approveRecharge
);

/* REJECT RECHARGE */

router.post(
  "/reject",
  rejectRecharge
);

/* GET PENDING RECHARGES */

router.get(
  "/pending",
  getPendingRecharges
);

/* GET ALL RECHARGES */

router.get(
  "/all",
  getAllRecharges
);

/* USER RECHARGE HISTORY */

router.get(
  "/history/:userId",
  getUserRechargeHistory
);

module.exports =
  router;