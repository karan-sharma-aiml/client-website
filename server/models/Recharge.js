const mongoose =
  require("mongoose");

const rechargeSchema =
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
         AMOUNT
      ========================= */

      amount: {

        type: Number,

        required: true,

        min: 100,

      },

      /* =========================
         UTR NUMBER
      ========================= */

      utrNumber: {

        type: String,

        required: true,

        unique: true,

        trim: true,

        uppercase: true,

      },

      /* =========================
         TRANSACTION ID
      ========================= */

      transactionId: {

        type: String,

        required: true,

        unique: true,

        trim: true,

      },

      /* =========================
         STATUS
      ========================= */

      status: {

        type: String,

        enum: [

          "pending",

          "approved",

          "rejected",

        ],

        default: "pending",

      },

      /* =========================
         PAYMENT METHOD
      ========================= */

      paymentMethod: {

        type: String,

        default: "UPI",

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
         SCREENSHOT
      ========================= */

      paymentScreenshot: {

        type: String,

        default: "",

      },

      /* =========================
         BONUS
      ========================= */

      bonusAmount: {

        type: Number,

        default: 0,

      },

      /* =========================
         FINAL CREDIT
      ========================= */

      finalCreditAmount: {

        type: Number,

        default: 0,

      },

      /* =========================
         APPROVED TIME
      ========================= */

      approvedAt: {

        type: Date,

        default: null,

      },

      /* =========================
         REJECTED TIME
      ========================= */

      rejectedAt: {

        type: Date,

        default: null,

      },

      /* =========================
         DEVICE INFO
      ========================= */

      deviceInfo: {

        type: String,

        default: "",

      },

      /* =========================
         IP ADDRESS
      ========================= */

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
   AUTO FORMAT
========================= */

rechargeSchema.pre("save", function () {
  if (this.utrNumber) {
    this.utrNumber = this.utrNumber
      .toString()
      .trim()
      .toUpperCase();
  }

  if (this.transactionId) {
    this.transactionId = this.transactionId
      .toString()
      .trim();
  }

  if (
    !this.finalCreditAmount ||
    this.finalCreditAmount <= 0
  ) {
    this.finalCreditAmount =
      Number(this.amount || 0) +
      Number(this.bonusAmount || 0);
  }
});
/* =========================
   INDEXES
========================= */

rechargeSchema.index({

  userId: 1,

  status: 1,

});



rechargeSchema.index({

  createdAt: -1,

});

/* =========================
   EXPORT MODEL
========================= */

module.exports =
  mongoose.model(

    "Recharge",

    rechargeSchema

  );