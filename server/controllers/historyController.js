const Recharge = require(
  "../models/Recharge"
);

const Withdraw = require(
  "../models/Withdraw"
);

const VipPurchase = require(
  "../models/VipPurchase"
);

const getHistory = async (
  req,
  res
) => {

  try {

    const { userId } = req.params;

    const recharges =
      await Recharge.find({
        userId,
      }).sort({
        createdAt: -1,
      });

    const withdraws =
      await Withdraw.find({
        userId,
      }).sort({
        createdAt: -1,
      });

    const vipPurchases =
      await VipPurchase.find({
        userId,
      }).sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      recharges,
      withdraws,
      vipPurchases,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  getHistory,
};