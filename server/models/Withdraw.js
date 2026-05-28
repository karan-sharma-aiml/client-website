const mongoose =
  require("mongoose");

const withdrawSchema =
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
         WITHDRAW CHARGE
      ========================= */

      withdrawCharge: {

        type: Number,

        default: 0,

        min: 0,

      },

      /* =========================
         FINAL AMOUNT
      ========================= */

      finalAmount: {

        type: Number,

        default: 0,

        min: 0,

      },

      /* =========================
         REFUND AMOUNT
      ========================= */

      refundAmount: {

        type: Number,

        default: 0,

        min: 0,

      },

      /* =========================
         PAYMENT METHOD
      ========================= */

      paymentMethod: {

        type: String,

        enum: [

          "Bank",

          "UPI",

        ],

        default: "Bank",

      },

      /* =========================
         BANK DETAILS
      ========================= */

      bankName: {

        type: String,

        default: "",

        trim: true,

      },

      accountHolderName: {

        type: String,

        default: "",

        trim: true,

      },

      accountNumber: {

        type: String,

        default: "",

        trim: true,

      },

      ifscCode: {

        type: String,

        default: "",

        uppercase: true,

        trim: true,

      },

      /* =========================
         OPTIONAL UPI
      ========================= */

      upiId: {

        type: String,

        default: "",

        lowercase: true,

        trim: true,

      },

      /* =========================
         STATUS
      ========================= */

      status: {

        type: String,

        enum: [

          "pending",

          "processing",

          "approved",

          "rejected",

        ],

        default: "pending",

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
         ADMIN NOTE
      ========================= */

      adminNote: {

        type: String,

        default: "",

        trim: true,

      },

      /* =========================
         ADMIN HANDLED BY
      ========================= */

      handledBy: {

        type: String,

        default: "",

        trim: true,

      },

      /* =========================
         PAYMENT SCREENSHOT
      ========================= */

      paymentScreenshot: {

        type: String,

        default: "",

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

    },

    {

      timestamps: true,

    }

  );

/* =========================
   AUTO FORMAT
========================= */

withdrawSchema.pre("save", function () {
  /* SAFE NUMBERS */
  this.amount =
    Number(this.amount || 0);

  this.withdrawCharge =
    Number(this.withdrawCharge || 0);

  this.finalAmount =
    Number(this.finalAmount || 0);

  this.refundAmount =
    Number(this.refundAmount || 0);

  /* AUTO FINAL AMOUNT */
  if (this.finalAmount <= 0) {
    this.finalAmount =
      this.amount -
      this.withdrawCharge;
  }

  /* SAFE NEGATIVE */
  if (this.finalAmount < 0) {
    this.finalAmount = 0;
  }

  /* SAFE IFSC */
  if (this.ifscCode) {
    this.ifscCode =
      this.ifscCode
        .toString()
        .trim()
        .toUpperCase();
  }

  /* SAFE UPI */
  if (this.upiId) {
    this.upiId =
      this.upiId
        .toString()
        .trim()
        .toLowerCase();
  }
});

/* =========================
   INDEXES
========================= */

withdrawSchema.index({

  userId: 1,

  status: 1,

});


withdrawSchema.index({

  createdAt: -1,

});

withdrawSchema.index({

  approvedAt: -1,

});

/* =========================
   EXPORT MODEL
========================= */

module.exports =
  mongoose.model(

    "Withdraw",

    withdrawSchema

  );