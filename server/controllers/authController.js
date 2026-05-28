const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const {
      phone,
      password,
      withdrawPassword,
    } = req.body;

    const existingUser = await User.findOne({
      phone,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const hashedWithdrawPassword =
      await bcrypt.hash(
        withdrawPassword,
        10
      );

    const user = await User.create({
      phone,
      password: hashedPassword,
      withdrawPassword:
        hashedWithdrawPassword,
    });

    res.status(201).json({
      success: true,
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};




// LOGIN USER
const loginUser = async (req, res) => {
  try {

    const { phone, password } = req.body;

    const user = await User.findOne({
      phone,
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};




module.exports = {
  registerUser,
  loginUser,
};