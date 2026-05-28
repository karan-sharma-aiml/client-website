const mongoose =
  require("mongoose");

const vipPurchaseSchema =
  new mongoose.Schema(

    {

      /* =========================
         USER
      ========================= */

      userId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

      },

      /* =========================
         VIP INFO
      ========================= */

      vipName: {

        type: String,

        required: true,

        trim: true,

      },

      vipLevel: {

        type: Number,

        default: 0,

      },

      /* =========================
         PRICE
      ========================= */

      price: {

        type: Number,

        required: true,

        min: 0,

      },

      /* =========================
         DAILY INCOME
      ========================= */

      dailyIncome: {

        type: Number,

        required: true,

        min: 0,

      },

      /* =========================
         PLAN DAYS
      ========================= */

      totalDays: {

        type: Number,

        required: true,

        min: 1,

      },

      remainingDays: {

        type: Number,

        default: function () {

          return this.totalDays;

        },

      },

      /* =========================
         TOTAL INCOME
      ========================= */

      totalIncome: {

        type: Number,

        default: 0,

      },

      earnedAmount: {

        type: Number,

        default: 0,

      },

      /* =========================
         STATUS
      ========================= */

      status: {

        type: String,

        enum: [

          "active",

          "expired",

          "cancelled",

        ],

        default: "active",

      },

      /* =========================
         TRANSACTION
      ========================= */

      transactionId: {

        type: String,

        default: "",

        trim: true,

      },

      paymentMethod: {

        type: String,

        default: "Wallet",

      },

      /* =========================
         DATES
      ========================= */

      activatedAt: {

        type: Date,

        default: Date.now,

      },

      expireAt: {

        type: Date,

        default: null,

      },

      lastIncomeGiven: {

        type: Date,

        default: null,

      },

      /* =========================
         ADMIN NOTE
      ========================= */

      adminNote: {

        type: String,

        default: "",

        trim: true,

      },

      /* =========================
         DEVICE INFO
      ========================= */

      deviceInfo: {

        type: String,

        default: "",

      },

      ipAddress: {

        type: String,

        default: "",

      },

    },

    {

      timestamps: true,

    }

  );

/* =========================
   AUTO CALCULATE
========================= */

vipPurchaseSchema.pre(

  "save",

  function (next) {

    /* VIP LEVEL */

    if (

      this.vipName &&

      !this.vipLevel

    ) {

      this.vipLevel =
        Number(

          String(
            this.vipName
          )

            .replace(
              /\D/g,
              ""
            )

        ) || 0;

    }

    /* REMAINING DAYS */

    if (

      this.remainingDays ===
      undefined ||

      this.remainingDays ===
      null

    ) {

      this.remainingDays =
        this.totalDays;

    }

    /* TOTAL INCOME */

    this.totalIncome =

      Number(
        this.dailyIncome || 0
      ) *

      Number(
        this.totalDays || 0
      );

    /* AUTO EXPIRE */

    if (

      this.remainingDays <= 0 &&

      this.status === "active"

    ) {

      this.status =
        "expired";

    }

    next();

  }

);

/* =========================
   INDEXES
========================= */

vipPurchaseSchema.index({

  userId: 1,

  status: 1,

});

vipPurchaseSchema.index({

  createdAt: -1,

});

vipPurchaseSchema.index({

  vipLevel: 1,

});

vipPurchaseSchema.index({

  expireAt: 1,

});

/* =========================
   EXPORT MODEL
========================= */

module.exports =
  mongoose.model(

    "VipPurchase",

    vipPurchaseSchema

  );