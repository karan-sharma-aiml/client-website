const mongoose =
  require("mongoose");

const userSchema =
  new mongoose.Schema(

    {

      /* =========================
         BASIC INFO
      ========================= */

      phone: {

        type: String,

        required: true,

        unique: true,

        trim: true,

      },

      password: {

        type: String,

        required: true,

      },

      withdrawPassword: {

        type: String,

        required: true,

      },

      name: {

        type: String,

        default: "Luxora User",

        trim: true,

      },

      email: {

        type: String,

        default: "",

        lowercase: true,

        trim: true,

      },

      /* =========================
         WALLET
      ========================= */

      balance: {

        type: Number,

        default: 0,

        min: 0,

      },

      freezeBalance: {

        type: Number,

        default: 0,

        min: 0,

      },

      totalIncome: {

        type: Number,

        default: 0,

      },

      totalRecharge: {

        type: Number,

        default: 0,

      },

      totalWithdraw: {

        type: Number,

        default: 0,

      },

      totalReferralIncome: {

        type: Number,

        default: 0,

      },

      totalVipIncome: {

        type: Number,

        default: 0,

      },

      /* =========================
         VIP
      ========================= */

      vipLevel: {

        type: Number,

        default: 0,

      },

      activePlan: {

        type: String,

        default: "No Plan",

      },

      vipDailyIncome: {

        type: Number,

        default: 0,

      },

      vipTotalDays: {

        type: Number,

        default: 0,

      },

      totalVipPurchases: {

        type: Number,

        default: 0,

      },

      vipActivatedAt: {

        type: Date,

        default: null,

      },

      vipExpireAt: {

        type: Date,

        default: null,

      },

      /* =========================
         DAILY INCOME
      ========================= */

      todayIncome: {

        type: Number,

        default: 0,

      },

      lastIncomeDate: {

        type: String,

        default: "",

      },

      /* =========================
         SPIN
      ========================= */

      spinReward: {

        type: Number,

        default: 0,

      },

      lastSpinDate: {

        type: String,

        default: "",

      },

      /* =========================
         BANK DETAILS
      ========================= */

      bankName: {

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

      accountHolderName: {

        type: String,

        default: "",

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
         REFERRAL
      ========================= */

      referralCode: {

        type: String,

        unique: true,

        sparse: true,

      },

      referredBy: {

        type: String,

        default: "",

      },

      inviteCount: {

        type: Number,

        default: 0,

      },

      referralIncome: {

        type: Number,

        default: 0,

      },

      /* =========================
         SECURITY
      ========================= */

      status: {

        type: String,

        enum: [

          "active",

          "blocked",

          "suspended",

        ],

        default: "active",

      },

      loginAttempts: {

        type: Number,

        default: 0,

      },

      lastLoginAt: {

        type: Date,

        default: null,

      },

      lastWithdrawTime: {

        type: Date,

        default: null,

      },

      deviceInfo: {

        type: String,

        default: "",

      },

      ipAddress: {

        type: String,

        default: "",

      },

      /* =========================
         ADMIN
      ========================= */

      isAdmin: {

        type: Boolean,

        default: false,

      },

      adminNote: {

        type: String,

        default: "",

      },

    },

    {

      timestamps: true,

    }

  );

/* =========================
   AUTO RESET EXPIRED VIP
========================= */

userSchema.pre("save", function () {
  /* SAFE BALANCE */
  if (this.balance < 0) {
    this.balance = 0;
  }

  /* VIP EXPIRE CHECK */
  if (
    this.vipExpireAt &&
    new Date() > this.vipExpireAt
  ) {
    this.activePlan = "No Plan";
    this.vipLevel = 0;
    this.vipDailyIncome = 0;
    this.vipTotalDays = 0;
  }
});

/* =========================
   INDEXES
========================= */

userSchema.index({

  status: 1,

});



userSchema.index({

  vipLevel: 1,

});

/* =========================
   EXPORT MODEL
========================= */

module.exports =
  mongoose.model(

    "User",

    userSchema

  );