const express =
  require("express");

const router =
  express.Router();

const withdrawController =
  require(
    "../controllers/withdrawController"
  );

/* CREATE WITHDRAW */

router.post(
  "/create",
  withdrawController.createWithdraw
);

/* APPROVE WITHDRAW */

router.post(
  "/approve",
  withdrawController.approveWithdraw
);

/* REJECT WITHDRAW */

router.post(
  "/reject",
  withdrawController.rejectWithdraw
);

/* GET PENDING WITHDRAWS */

router.get(
  "/pending",
  withdrawController.getPendingWithdraws
);

/* USER WITHDRAW HISTORY */

router.get(
  "/history/:userId",
  withdrawController.getUserWithdrawHistory
);

/* ALL WITHDRAW HISTORY */

router.get(
  "/all",
  withdrawController.getAllWithdraws
);

module.exports =
  router;