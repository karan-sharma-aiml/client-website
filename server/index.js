const express =
  require("express");

const mongoose =
  require("mongoose");

const cors =
  require("cors");

require("dotenv").config();

const app = express();

/* MIDDLEWARE */

app.use(cors());

app.use(express.json());

/* ROUTES */

const authRoutes =
  require("./routes/authRoutes");

const rechargeRoutes =
  require("./routes/rechargeRoutes");

const planRoutes =
  require("./routes/planRoutes");

/* API ROUTES */

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/recharge",
  rechargeRoutes
);

app.use(
  "/api/plans",
  planRoutes
);

/* HOME ROUTE */

app.get("/", (req, res) => {

  res.send(
    "🚀 Luxora Server Running"
  );

});

/* DATABASE CONNECTION */

mongoose.connect(
  process.env.MONGO_URI
)

.then(() => {

  console.log(
    "✅ MongoDB Connected"
  );

})

.catch((error) => {

  console.log(
    "❌ MongoDB Error:",
    error.message
  );

});

/* SERVER */

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `🔥 Server Running On Port ${PORT}`
  );

});