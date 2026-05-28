const Withdraw =
  require(
    "../models/Withdraw"
  );

const User =
  require(
    "../models/User"
  );

const Transaction =
  require(
    "../models/Transaction"
  );

const bcrypt =
  require(
    "bcryptjs"
  );

/* =========================
   CREATE WITHDRAW
========================= */

const createWithdraw =
  async (req, res) => {

    try {

      /* TIME CHECK */

      const now =
        new Date();

      const currentHour =
        now.getHours();

      if (
        currentHour < 0 ||
        currentHour >= 20
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Withdraw Available Between 12 AM To 8 PM",

        });

      }

      /* GET BODY */

      const {

        userId,

        amount,

        withdrawPassword,

      } = req.body;

      /* REQUIRED */

      if (

        !userId ||

        !amount ||

        !withdrawPassword

      ) {

        return res.status(400).json({

          success: false,

          message:
            "All Fields Required",

        });

      }

      /* FIND USER */

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

      /* PASSWORD CHECK */

      const isMatch =
        await bcrypt.compare(

          String(
            withdrawPassword
          ),

          user.withdrawPassword

        );

      if (!isMatch) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid Withdraw Password",

        });

      }

      /* PENDING CHECK */

      const pendingWithdraw =
        await Withdraw.findOne({

          userId,

          status:
            "pending",

        });

      if (
        pendingWithdraw
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Previous Withdraw Already Pending",

        });

      }

      /* SAFE NUMBER */

      const withdrawAmount =
        Number(amount);

      const currentBalance =
        Number(
          user.balance || 0
        );

      /* VALIDATION */

      if (

        isNaN(
          withdrawAmount
        ) ||

        withdrawAmount <= 0

      ) {

        return res.status(400).json({

          success: false,

          message:
            "Enter Valid Amount",

        });

      }

      /* MIN */

      if (
        withdrawAmount < 100
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Minimum Withdraw ₹100",

        });

      }

      /* MAX */

      if (
        withdrawAmount > 50000
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Maximum Withdraw ₹50000",

        });

      }

      /* BALANCE */

      if (
        withdrawAmount >
        currentBalance
      ) {

        return res.status(400).json({

          success: false,

          message:
            `Insufficient Balance. Available ₹${currentBalance}`,

        });

      }

      /* BANK / UPI */

      const bankAdded =

        user.bankName &&
        user.accountNumber &&
        user.ifscCode &&
        user.accountHolderName;

      const upiAdded =

        user.upiId &&
        user.accountHolderName;

      if (
        !bankAdded &&
        !upiAdded
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Please Add Bank Or UPI Details First",

        });

      }

      /* UPDATE BALANCE */

      const updatedBalance =

        currentBalance -
        withdrawAmount;

      user.balance =
        updatedBalance;

      user.totalWithdraw =

        Number(
          user.totalWithdraw || 0
        ) + withdrawAmount;

      user.lastWithdrawTime =
        new Date();

      await user.save();

      /* TRANSACTION ID */

      const transactionId =

        "WD" +

        Date.now() +

        Math.floor(
          Math.random() * 1000
        );

      /* CREATE WITHDRAW */

      const withdraw =
        await Withdraw.create({

          userId,

          amount:
            withdrawAmount,

          finalAmount:
            withdrawAmount,

          bankName:
            user.bankName || "",

          accountHolderName:
            user.accountHolderName || "",

          accountNumber:
            user.accountNumber || "",

          ifscCode:
            user.ifscCode || "",

          upiId:
            user.upiId || "",

          transactionId,

          paymentMethod:

            user.upiId
              ? "UPI"
              : "Bank",

          status:
            "pending",

          adminNote:
            "",

        });

      /* SAVE TRANSACTION */

      await Transaction.create({

        userId,

        amount:
          withdrawAmount,

        transactionId,

        type:
          "Withdraw",

        status:
          "Pending",

        note:
          "Withdraw Request Submitted",

      });

      /* RESPONSE */

      res.status(201).json({

        success: true,

        message:
          "Withdraw Request Submitted",

        balance:
          updatedBalance,

        transactionId,

        withdraw,

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
   APPROVE WITHDRAW
========================= */

const approveWithdraw =
  async (req, res) => {

    try {

      const {

        withdrawId,

        adminNote,

      } = req.body;

      if (!withdrawId) {

        return res.status(400).json({

          success: false,

          message:
            "Withdraw ID Required",

        });

      }

      /* FIND */

      const withdraw =
        await Withdraw.findById(
          withdrawId
        );

      if (!withdraw) {

        return res.status(404).json({

          success: false,

          message:
            "Withdraw Not Found",

        });

      }

      /* STATUS CHECK */

      if (
        withdraw.status ===
        "approved"
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Already Approved",

        });

      }

      if (
        withdraw.status ===
        "rejected"
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Already Rejected",

        });

      }

      /* UPDATE */

      withdraw.status =
        "approved";

      withdraw.approvedAt =
        new Date();

      withdraw.adminNote =
        adminNote || "";

      await withdraw.save();

      /* UPDATE TRANSACTION */

      await Transaction.findOneAndUpdate(

        {

          transactionId:
            withdraw.transactionId,

        },

        {

          status:
            "Success",

          note:
            "Withdraw Approved",

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
          "Withdraw Approved",

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
   REJECT WITHDRAW
========================= */

const rejectWithdraw =
  async (req, res) => {

    try {

      const {

        withdrawId,

        adminNote,

      } = req.body;

      if (!withdrawId) {

        return res.status(400).json({

          success: false,

          message:
            "Withdraw ID Required",

        });

      }

      /* FIND */

      const withdraw =
        await Withdraw.findById(
          withdrawId
        );

      if (!withdraw) {

        return res.status(404).json({

          success: false,

          message:
            "Withdraw Not Found",

        });

      }

      /* STATUS */

      if (
        withdraw.status ===
        "rejected"
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Already Rejected",

        });

      }

      if (
        withdraw.status ===
        "approved"
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Already Approved",

        });

      }

      /* USER */

      const user =
        await User.findById(
          withdraw.userId
        );

      if (!user) {

        return res.status(404).json({

          success: false,

          message:
            "User Not Found",

        });

      }

      /* REFUND */

      const refundAmount =
        Number(
          withdraw.amount || 0
        );

      const currentBalance =
        Number(
          user.balance || 0
        );

      const updatedBalance =

        currentBalance +
        refundAmount;

      /* REFUND USER */

      user.balance =
        updatedBalance;

      user.totalWithdraw =

        Math.max(

          0,

          Number(
            user.totalWithdraw || 0
          ) - refundAmount

        );

      await user.save();

      /* UPDATE WITHDRAW */

      withdraw.status =
        "rejected";

      withdraw.rejectedAt =
        new Date();

      withdraw.adminNote =
        adminNote ||
        "Withdraw Rejected";

      withdraw.refundAmount =
        refundAmount;

      await withdraw.save();

      /* UPDATE TRANSACTION */

      await Transaction.findOneAndUpdate(

        {

          transactionId:
            withdraw.transactionId,

        },

        {

          status:
            "Rejected",

          note:
            "Withdraw Rejected & Refunded",

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
          "Withdraw Rejected & Amount Refunded",

        refundedAmount:
          refundAmount,

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
   GET PENDING
========================= */

const getPendingWithdraws =
  async (req, res) => {

    try {

      const withdraws =
        await Withdraw.find({
          status: "pending",
        })

          .populate(
            "userId",
            "name email phone balance"
          )

          .sort({
            createdAt: -1,
          })

          .limit(20)

          .lean();

      return res.status(200).json({
        success: true,
        total: withdraws.length,
        withdraws,
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }

  };
/* =========================
   USER HISTORY
========================= */

const getUserWithdrawHistory =
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

      const withdraws =
        await Withdraw.find({

          userId,

        })

          .sort({

            createdAt: -1,

          });

      res.status(200).json({

        success: true,

        total:
          withdraws.length,

        withdraws,

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
   ALL HISTORY
========================= */

const getAllWithdraws =
  async (req, res) => {

    try {

      const withdraws =
        await Withdraw.find()

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
          withdraws.length,

        withdraws,

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

  createWithdraw,

  approveWithdraw,

  rejectWithdraw,

  getPendingWithdraws,

  getUserWithdrawHistory,

  getAllWithdraws,

};