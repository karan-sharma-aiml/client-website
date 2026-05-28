const User =
  require("../models/User");

const VipPurchase =
  require(
    "../models/VipPurchase"
  );

/* BUY VIP */

const buyVip =
  async (req, res) => {

    try {

      const {

        userId,

        vipName,

        price,

        dailyIncome,

        totalDays,

      } = req.body;

      /* REQUIRED VALIDATION */

      if (

        !userId ||

        !vipName ||

        !price ||

        !dailyIncome ||

        !totalDays

      ) {

        return res.status(400).json({

          success: false,

          message:
            "All VIP Fields Required",

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

      /* SAFE NUMBER CONVERSION */

      const currentBalance =
        Number(
          user.balance || 0
        );

      const vipPrice =
        Number(
          price || 0
        );

      const vipIncome =
        Number(
          dailyIncome || 0
        );

      const vipDays =
        Number(
          totalDays || 0
        );

      const totalIncome =

        Number(vipIncome) *
        Number(vipDays);

      /* VIP LEVEL */

      const vipLevelNumber =
        Number(

          String(vipName)
            .replace(
              /\D/g,
              ""
            )

        );

      /* NUMBER VALIDATION */

      if (

        isNaN(
          currentBalance
        ) ||

        isNaN(
          vipPrice
        ) ||

        isNaN(
          vipIncome
        ) ||

        isNaN(
          vipDays
        ) ||

        isNaN(
          vipLevelNumber
        )

      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid Number Data",

        });

      }

      /* INVALID VALUE CHECK */

      if (

        vipPrice <= 0 ||

        vipIncome <= 0 ||

        vipDays <= 0

      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid VIP Data",

        });

      }

      /* BALANCE CHECK */

      if (
        currentBalance <
        vipPrice
      ) {

        return res.status(400).json({

          success: false,

          message:
            `Insufficient Balance. Available ₹${currentBalance}`,

        });

      }

      /* PREVENT SAME VIP */

      if (

        String(
          user.activePlan || ""
        )

          .trim()

          .toLowerCase()

        ===

        String(
          vipName
        )

          .trim()

          .toLowerCase()

      ) {

        return res.status(400).json({

          success: false,

          message:
            `${vipName} Already Active`,

        });

      }

      /* EXPIRE OLD ACTIVE VIP */

      await VipPurchase.updateMany(

        {

          userId,

          status:
            "active",

        },

        {

          status:
            "expired",

        }

      );

      /* UPDATE BALANCE */

      const updatedBalance =

        currentBalance -
        vipPrice;

      user.balance =
        updatedBalance;

      /* VIP DATA */

      user.vipLevel =
        vipLevelNumber;

      user.activePlan =
        vipName;

      user.vipDailyIncome =
        vipIncome;

      user.vipTotalDays =
        vipDays;

      user.vipActivatedAt =
        new Date();

      /* VIP EXPIRE */

      const expireDate =
        new Date();

      expireDate.setDate(

        expireDate.getDate() +
        vipDays

      );

      user.vipExpireAt =
        expireDate;

      /* TOTAL VIP PURCHASE */

      user.totalVipPurchases =

        Number(
          user.totalVipPurchases || 0
        ) + 1;

      /* SAVE USER */

      await user.save();

      /* SAVE VIP PURCHASE */

      const vipPurchase =
        await VipPurchase.create({

          userId,

          vipName,

          vipLevel:
            vipLevelNumber,

          price:
            vipPrice,

          dailyIncome:
            vipIncome,

          totalDays:
            vipDays,

          remainingDays:
            vipDays,

          totalIncome,

          earnedAmount: 0,

          status:
            "active",

          activatedAt:
            new Date(),

          expireAt:
            expireDate,

        });

      /* RESPONSE */

      res.status(200).json({

        success: true,

        message:
          `${vipName} Purchased Successfully`,

        balance:
          updatedBalance,

        activePlan:
          user.activePlan,

        vipLevel:
          user.vipLevel,

        vipExpireAt:
          user.vipExpireAt,

        vipPurchase,

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

/* VIP HISTORY */

const getVipHistory =
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

      const history =
        await VipPurchase.find({

          userId,

        })

          .sort({

            createdAt: -1,

          });

      res.status(200).json({

        success: true,

        total:
          history.length,

        history,

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

  buyVip,

  getVipHistory,

};