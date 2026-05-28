const express =
  require("express");

const cors =
  require("cors");

require("dotenv").config();

/* DAILY INCOME CRON */

// require(
//   "./cron/dailyIncomeCron"
// );

/* DATABASE */

const connectDB =
  require("./config/db");

/* ROUTES */

const authRoutes =
  require("./routes/authRoutes");

const rechargeRoutes =
  require("./routes/rechargeRoutes");

const withdrawRoutes =
  require("./routes/withdrawRoutes");

const userRoutes =
  require("./routes/userRoutes");

const vipRoutes =
  require("./routes/vipRoutes");

const incomeRoutes =
  require("./routes/incomeRoutes");

const bankRoutes =
  require("./routes/bankRoutes");

const historyRoutes =
  require("./routes/historyRoutes");

const adminRoutes =
  require("./routes/adminRoutes");

/* APP */

const app =
  express();

/* CONNECT DATABASE */

connectDB();

/* SECURITY */

app.disable(
  "x-powered-by"
);

/* CORS */

app.use(

  cors({

    origin: "*",

    methods: [

      "GET",

      "POST",

      "PUT",

      "DELETE",

    ],

    credentials: true,

  })

);

/* BODY LIMIT */

app.use(

  express.json({

    limit: "10mb",

  })

);

app.use(

  express.urlencoded({

    extended: true,

    limit: "10mb",

  })

);

/* REQUEST LOGGER */

app.use(

  (req, res, next) => {

    console.log(

      `${req.method} ${req.url}`

    );

    next();

  }

);

/* =========================
   API ROUTES
========================= */

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/recharge",
  rechargeRoutes
);

app.use(
  "/api/withdraw",
  withdrawRoutes
);

app.use(
  "/api/user",
  userRoutes
);

app.use(
  "/api/vip",
  vipRoutes
);

app.use(
  "/api/income",
  incomeRoutes
);

app.use(
  "/api/bank",
  bankRoutes
);

app.use(
  "/api/history",
  historyRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

/* =========================
   ROOT
========================= */

app.get(
  "/",
  (req, res) => {

    res.status(200).json({

      success: true,

      message:
        "Luxora API Running",

      serverTime:
        new Date(),

    });

  }
);

/* =========================
   HEALTH CHECK
========================= */

app.get(
  "/health",
  (req, res) => {

    res.status(200).json({

      success: true,

      server:
        "Healthy",

      uptime:
        process.uptime(),

    });

  }
);

/* =========================
   404 HANDLER
========================= */

app.use(

  (req, res) => {

    res.status(404).json({

      success: false,

      message:
        "Route Not Found",

    });

  }

);

/* =========================
   ERROR HANDLER
========================= */

app.use(

  (
    err,
    req,
    res,
    next
  ) => {

    console.log(

      "SERVER ERROR:",

      err

    );

    res.status(500).json({

      success: false,

      message:

        err.message ||

        "Internal Server Error",

    });

  }

);

/* =========================
   SERVER PORT
========================= */

const PORT =

  process.env.PORT ||
  5000;

/* =========================
   START SERVER
========================= */

app.listen(

  PORT,

  () => {

    console.log(

      `Server running on ${PORT}`

    );

  }

);

/* =========================
   CRASH PREVENTION
========================= */

process.on(

  "unhandledRejection",

  (err) => {

    console.log(

      "UNHANDLED REJECTION:",

      err

    );

  }

);

process.on(

  "uncaughtException",

  (err) => {

    console.log(

      "UNCAUGHT EXCEPTION:",

      err

    );

  }

);