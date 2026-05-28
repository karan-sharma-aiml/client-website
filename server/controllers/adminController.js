const User =
  require(
    "../models/User"
  );

const Recharge =
  require(
    "../models/Recharge"
  );

const Withdraw =
  require(
    "../models/Withdraw"
  );

const VipPurchase =
  require(
    "../models/VipPurchase"
  );

/* DASHBOARD */

const getDashboardStats =
  async (req, res) => {

    try {

      /* TOTAL USERS */

      const totalUsers =
        await User.countDocuments();

      /* TOTAL RECHARGES */

      const totalRecharges =
        await Recharge.countDocuments({

          status:
            "approved",

        });

      /* TOTAL WITHDRAWS */

      const totalWithdraws =
        await Withdraw.countDocuments({

          status:
            "approved",

        });

      /* PENDING */

      const pendingRecharges =
        await Recharge.countDocuments({

          status:
            "pending",

        });

      const pendingWithdraws =
        await Withdraw.countDocuments({

          status:
            "pending",

        });

      /* VIP PURCHASES */

      const totalVipPurchases =
        await VipPurchase.countDocuments();

      /* TOTAL RECHARGE AMOUNT */

      const rechargeData =
        await Recharge.find({

          status:
            "approved",

        });

      const totalRechargeAmount =
        rechargeData.reduce(

          (total, item) =>

            total +
            Number(
              item.amount || 0
            ),

          0

        );

      /* TOTAL WITHDRAW AMOUNT */

      const withdrawData =
        await Withdraw.find({

          status:
            "approved",

        });

      const totalWithdrawAmount =
        withdrawData.reduce(

          (total, item) =>

            total +
            Number(
              item.amount || 0
            ),

          0

        );

      /* VIP SALES */

      const vipData =
        await VipPurchase.find();

      const totalVipSalesAmount =
        vipData.reduce(

          (total, item) =>

            total +
            Number(
              item.amount || 0
            ),

          0

        );

      /* USERS */

      const users =
        await User.find()

          .select(

            "name email phone balance vipLevel createdAt"

          )

          .sort({

            createdAt: -1,

          });

      /* LATEST RECHARGES */

      const latestRecharges =
        await Recharge.find()

          .populate(

            "userId",

            "name email"

          )

          .sort({

            createdAt: -1,

          })

          .limit(10);

      /* LATEST WITHDRAWS */

      const latestWithdraws =
        await Withdraw.find()

          .populate(

            "userId",

            "name email"

          )

          .sort({

            createdAt: -1,

          })

          .limit(10);

      /* TOTAL PLATFORM BALANCE */

      const allUsers =
        await User.find();

      const totalPlatformBalance =
        allUsers.reduce(

          (total, user) =>

            total +
            Number(
              user.balance || 0
            ),

          0

        );

      res.status(200).json({

        success: true,

        totalUsers,

        totalRecharges,

        totalWithdraws,

        pendingRecharges,

        pendingWithdraws,

        totalVipPurchases,

        totalRechargeAmount,

        totalWithdrawAmount,

        totalVipSalesAmount,

        totalPlatformBalance,

        users,

        latestRecharges,

        latestWithdraws,

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

module.exports = {

  getDashboardStats,

};