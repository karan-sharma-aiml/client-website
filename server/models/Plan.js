const mongoose =
  require("mongoose");

const planSchema =
  new mongoose.Schema({

    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    dailyIncome: {
      type: Number,
      required: true,
    },

    totalIncome: {
      type: Number,
      required: true,
    },

    validity: {
      type: Number,
      default: 30,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

  });

module.exports =
  mongoose.model(
    "Plan",
    planSchema
  );