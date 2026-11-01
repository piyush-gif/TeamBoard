const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/userRoutes");
const bookingRoute = require("./routes/bookingRoutes");
const authRoute = require("./routes/authRoutes");

const PORT = process.env.PORT;
const Db = process.env.MONGOOSE_URI;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/user", userRoute);
app.use("/booking", bookingRoute);
app.use("/auth", authRoute);

mongoose
  .connect(Db)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected to Db and listening to port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
