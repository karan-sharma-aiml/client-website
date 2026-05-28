const Recharge =
  require("../models/Recharge");

const User =
  require("../models/User");

const Transaction =
  require("../models/Transaction");

/* =========================
   CREATE RECHARGE
========================= */

const createRecharge =
  async (req, res) => {

    try {

      const {

        userId,

        amount,

        utrNumber,

      } = req.body;

      /* REQUIRED VALIDATION */

      if (

        !userId ||

        !amount ||

        !utrNumber

      ) {

        return res.status(400).json({

          success: false,

          message:
            "All Fields Required",

        });

      }

      /* SAFE NUMBER */

      const rechargeAmount =
        Number(amount);

      /* AMOUNT VALIDATION */

      if (

        isNaN(
          rechargeAmount
        ) ||

        rechargeAmount <= 0

      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid Recharge Amount",

        });

      }

      /* MINIMUM */

      if (
        rechargeAmount < 100
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Minimum Recharge ₹100",

        });

      }

      /* UTR VALIDATION */

      if (
        String(
          utrNumber
        ).length < 12
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid UTR Number",

        });

      }

      /* USER CHECK */

      const user =
        await User.findById(
          userId
        );

      if (!user) {

        return res.status(404).json({

          success: false,

          message:
            "User Not Found",

        });

      }

      /* ACCOUNT STATUS */

      if (
        user.status !==
        "active"
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Account Suspended",

        });

      }

      /* DUPLICATE UTR */

      const safeUTR =
       String(utrNumber)
        .trim()
        .toUpperCase();

      const existingUTR =
       await Recharge.findOne({
        utrNumber: safeUTR,
      });

      if (
        existingUTR
      ) {

        return res.status(400).json({

          success: false,

          message:
            "UTR Already Submitted",

        });

      }

      /* TRANSACTION ID */

      const transactionId =

        "RC" +

        Date.now() +

        Math.floor(
          Math.random() * 1000
        );

      /* CREATE RECHARGE */

      const recharge =
        await Recharge.create({

          userId,

          amount:
            rechargeAmount,

          utrNumber,

          transactionId,

          status:
            "pending",

          paymentMethod:
            "UPI",

        });

      console.log("Recharge saved =>", recharge);

      /* SAVE TRANSACTION */
      
      await Transaction.create({

        userId,

        amount:
          rechargeAmount,

        utr:
          utrNumber,

        transactionId,

        type:
          "Recharge",

        status:
          "Pending",

        note:
          "Recharge Request Submitted",

      });

      /* RESPONSE */

      return res.status(201).json({
       success: true,
       message: "Recharge Request Submitted",
       recharge,
      });

    } catch (error) {

      console.log("RECHARGE ERROR =>", error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

/* =========================
   APPROVE RECHARGE
========================= */

const approveRecharge =
  async (req, res) => {

    try {

      const {

        rechargeId,

        adminNote,

      } = req.body;

      if (!rechargeId) {

        return res.status(400).json({

          success: false,

          message:
            "Recharge ID Required",

        });

      }

      /* FIND RECHARGE */

      const recharge =
        await Recharge.findById(
          rechargeId
        );

      if (!recharge) {

        return res.status(404).json({

          success: false,

          message:
            "Recharge Not Found",

        });

      }

      /* STATUS CHECK */

      if (
        recharge.status ===
        "approved"
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Recharge Already Approved",

        });

      }

      if (
        recharge.status ===
        "rejected"
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Recharge Already Rejected",

        });

      }

      /* FIND USER */

      const user =
        await User.findById(
          recharge.userId
        );

      if (!user) {

        return res.status(404).json({

          success: false,

          message:
            "User Not Found",

        });

      }

      /* SAFE BALANCE */

      const currentBalance =
        Number(
          user.balance || 0
        );

      const rechargeAmount =
        Number(
          recharge.amount || 0
        );

      const updatedBalance =

        currentBalance +
        rechargeAmount;

      /* UPDATE USER */

      user.balance =
        updatedBalance;

      user.totalRecharge =


        Number(
          user.totalRecharge || 0
        ) + rechargeAmount;

      await user.save();

      /* UPDATE RECHARGE */

      recharge.status =
        "approved";

      recharge.adminNote =
        adminNote || "";

      recharge.approvedAt =
        new Date();

      await recharge.save();

      /* UPDATE TRANSACTION */

      await Transaction.findOneAndUpdate(

        {

          transactionId:
            recharge.transactionId,

        },

        {

          status:
            "Success",

          note:
            "Recharge Approved",

        },

        {

          returnDocument:
            "after",

        }

      );

      /* RESPONSE */

      res.status(200).json({

        success: true,

        message:
          "Recharge Approved Successfully",

        balance:
          updatedBalance,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

/* =========================
   REJECT RECHARGE
========================= */

const rejectRecharge =
  async (req, res) => {

    try {

      const {

        rechargeId,

        adminNote,

      } = req.body;

      if (!rechargeId) {

        return res.status(400).json({

          success: false,

          message:
            "Recharge ID Required",

        });

      }

      /* FIND RECHARGE */

      const recharge =
        await Recharge.findById(
          rechargeId
        );

      if (!recharge) {

        return res.status(404).json({

          success: false,

          message:
            "Recharge Not Found",

        });

      }

      /* STATUS CHECK */

      if (
        recharge.status ===
        "approved"
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Recharge Already Approved",

        });

      }

      if (
        recharge.status ===
        "rejected"
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Recharge Already Rejected",

        });

      }

      /* UPDATE RECHARGE */

      recharge.status =
        "rejected";

      recharge.adminNote =
        adminNote ||
        "Recharge Rejected";

      recharge.rejectedAt =
        new Date();

      await recharge.save();

      /* UPDATE TRANSACTION */

      await Transaction.findOneAndUpdate(

        {

          transactionId:
            recharge.transactionId,

        },

        {

          status:
            "Rejected",

          note:
            "Recharge Rejected",

        },

        {

          returnDocument:
            "after",

        }

      );

      /* RESPONSE */

      res.status(200).json({

        success: true,

        message:
          "Recharge Rejected Successfully",

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

/* =========================
   GET PENDING RECHARGES
========================= */

const getPendingRecharges =
  async (req, res) => {

    try {

      const recharges =
        await Recharge.find({

          status:
            "pending",

        })

          .populate(

            "userId",

            "name email phone balance"

          )

          .sort({

            createdAt: -1,

          });

      res.status(200).json({

        success: true,

        total:
          recharges.length,

        recharges,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

/* =========================
   GET ALL RECHARGES
========================= */

const getAllRecharges =
  async (req, res) => {

    try {

      const recharges =
        await Recharge.find()

          .populate(

            "userId",

            "name email phone"

          )

          .sort({

            createdAt: -1,

          });

      res.status(200).json({

        success: true,

        total:
          recharges.length,

        recharges,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

/* =========================
   USER RECHARGE HISTORY
========================= */

const getUserRechargeHistory =
  async (req, res) => {

    try {

      const {
        userId,
      } = req.params;

      if (!userId) {

        return res.status(400).json({

          success: false,

          message:
            "User ID Required",

        });

      }

      const recharges =
        await Recharge.find({

          userId,

        })

          .sort({

            createdAt: -1,

          });

      res.status(200).json({

        success: true,

        total:
          recharges.length,

        recharges,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };

/* =========================
   EXPORTS
========================= */

module.exports = {

  createRecharge,

  approveRecharge,

  rejectRecharge,

  getPendingRecharges,

  getAllRecharges,

  getUserRechargeHistory,

};