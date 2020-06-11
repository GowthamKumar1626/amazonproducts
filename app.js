const express = require("express");
const morgan = require("morgan");
const path = require("path");

const kurthiesRouter = require("./routes/kurthiRoutes");
const jeanTopsRouter = require("./routes/jeanTopsRoutes");
const userRouter = require("./routes/userRoutes");
const viewRouter = require("./routes/viewRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const compression = require("compression");

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(compression());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/", viewRouter);
app.use("/api/v1/kurthies", kurthiesRouter);
app.use("/api/v1/jeantops", jeanTopsRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} is not found`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
