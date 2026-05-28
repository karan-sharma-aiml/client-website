const User = require("../models/User");

const bindBank = async (
  req,
  res
) => {

  try {

    const {
      userId,
      bankName,
      accountNumber,
      ifscCode,
      accountHolderName,
      upiId,
    } = req.body;

    const user =
      await User.findById(userId);

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }

    user.bankName = bankName;

    user.accountNumber =
      accountNumber;

    user.ifscCode = ifscCode;

    user.accountHolderName =
      accountHolderName;

    user.upiId = upiId;

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Bank Account Linked Successfully",
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  bindBank,
};