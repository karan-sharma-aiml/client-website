const User =
  require("../models/User");

/* GET USER */

const getUser =
  async (req, res) => {

    try {

      const { userId } =
        req.params;

      if (!userId) {

        return res.status(400).json({

          success: false,

          message:
            "User ID Required",

        });

      }

      /* FRESH USER FETCH */

      const user =
        await User.findById(
          userId
        ).lean();

      if (!user) {

        return res.status(404).json({

          success: false,

          message:
            "User Not Found",

        });

      }

      /* REMOVE SENSITIVE DATA */

      delete user.password;

      delete user.withdrawPassword;

      res.status(200).json({

        success: true,

        user,

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

/* LIVE USER BALANCE */

const getUserBalance =
  async (req, res) => {

    try {

      const { userId } =
        req.params;

      if (!userId) {

        return res.status(400).json({

          success: false,

          message:
            "User ID Required",

        });

      }

      /* ALWAYS FETCH FRESH USER */

      const user =
        await User.findById(
          userId
        ).lean();

      if (!user) {

        return res.status(404).json({

          success: false,

          message:
            "User Not Found",

        });

      }

      /* REMOVE SENSITIVE DATA */

      delete user.password;

      delete user.withdrawPassword;

      res.status(200).json({

        success: true,

        user,

        balance:
          user.balance || 0,

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

/* UPDATE PAYMENT DETAILS */

const updateBankDetails =
  async (req, res) => {

    try {

      const {

        userId,

        bankName,

        accountHolderName,

        accountNumber,

        ifscCode,

        upiId,

      } = req.body;

      if (!userId) {

        return res.status(400).json({

          success: false,

          message:
            "User ID Required",

        });

      }

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

      /* VALIDATION */

      const bankFilled =

        bankName &&
        accountHolderName &&
        accountNumber &&
        ifscCode;

      const upiFilled =

        upiId &&
        accountHolderName;

      if (
        !bankFilled &&
        !upiFilled
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Add Complete Bank Or UPI Details",

        });

      }

      /* SAVE DETAILS */

      user.bankName =
        bankName || "";

      user.accountHolderName =
        accountHolderName || "";

      user.accountNumber =
        accountNumber || "";

      user.ifscCode =
        ifscCode || "";

      user.upiId =
        upiId || "";

      await user.save();

      /* FRESH UPDATED USER */

      const updatedUser =
        await User.findById(
          userId
        ).lean();

      delete updatedUser.password;

      delete updatedUser.withdrawPassword;

      res.status(200).json({

        success: true,

        message:
          "Payment Details Updated Successfully",

        user:
          updatedUser,

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

/* EXPORTS */

module.exports = {

  getUser,

  getUserBalance,

  updateBankDetails,

};