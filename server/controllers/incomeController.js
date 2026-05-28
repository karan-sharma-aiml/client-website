const User = require("../models/User");

const VipPurchase = require(
  "../models/VipPurchase"
);

const giveDailyIncome =
  async (req, res) => {

    try {

      const purchases =
        await VipPurchase.find({
          status: "active",
        });

      for (
        let purchase of purchases
      ) {

        const user =
          await User.findById(
            purchase.userId
          );

        if (user) {

          user.balance +=
            purchase.dailyIncome;

          await user.save();

        }
      }

      res.status(200).json({
        success: true,
        message:
          "Daily income distributed",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };

module.exports = {
  giveDailyIncome,
};