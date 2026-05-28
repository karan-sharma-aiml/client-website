const Plan =
  require("../models/Plan");

exports.getPlans =
  async (req, res) => {

    try {

      const plans =
        await Plan.find();

      res.json({
        success: true,
        plans,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

  };

exports.createPlan =
  async (req, res) => {

    try {

      const {
        name,
        price,
        dailyIncome,
        totalIncome,
        validity,
      } = req.body;

      const newPlan =
        new Plan({

          name,
          price,
          dailyIncome,
          totalIncome,
          validity,

        });

      await newPlan.save();

      res.json({
        success: true,
        message:
          "Plan Created Successfully",
        newPlan,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

  };