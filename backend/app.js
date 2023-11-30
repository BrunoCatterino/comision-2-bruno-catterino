const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require("cors");
var cookieParser = require("cookie-parser");

const errorHandler = require('./middleware/error');

//import routes
const authRoutes = require("./routes/authRoutes");
const postRoute = require('./routes/postRoute')

//DATABASE
mongoose
  .connect(
    "mongodb+srv://admin:brunocatterino@blogviajesdb.vuxbdoj.mongodb.net/"
  )
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB disconnected", err));

//MIDDLEWARE
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
  })
);
app.use(cookieParser());
app.use(cors());

//ROUTES MIDDLEWARE
app.use("/api", authRoutes);
app.use("/api", postRoute);
//error middleware
app.use(errorHandler);

//PORT
const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
