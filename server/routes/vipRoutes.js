const express =
  require("express");

const router =
  express.Router();

const {

  buyVip,

  getVipHistory,

} = require(

  "../controllers/vipController"

);

/* =========================
   BUY VIP PLAN
========================= */

router.post(

  "/buy",

  buyVip

);

/* =========================
   GET VIP HISTORY
========================= */

router.get(

  "/history/:userId",

  getVipHistory

);

/* =========================
   EXPORT ROUTER
========================= */

module.exports =
  router;