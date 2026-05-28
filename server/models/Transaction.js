const mongoose =
  require("mongoose");

const transactionSchema =
  new mongoose.Schema({

    userId: {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    type: {
      type: String,

      enum: [
        "Recharge",
        "Withdraw",
        "VIP Purchase",
        "Income",
        "Spin Reward",
      ],

      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,

      enum: [
        "Pending",
        "Success",
        "Rejected",
      ],

      default: "Pending",
    },

    utr: {
      type: String,
      default: "",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

  });

module.exports =
  mongoose.model(
    "Transaction",
    transactionSchema
  );