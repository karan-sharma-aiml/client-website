const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const {

  getUser,

  getUserBalance,

  updateBankDetails,

} = require(
  "../controllers/userController"
);

/* GET USER */

router.get(

  "/:userId",

  authMiddleware,

  getUser

);

/* UPDATE BANK DETAILS */

router.post(

  "/bank/update",

  updateBankDetails

);

/* GET LIVE BALANCE */

router.get(

  "/balance/:userId",

  getUserBalance

);

module.exports =
  router;