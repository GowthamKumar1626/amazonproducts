const express = require("express");
const morgan = require("morgan");
const path = require("path");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");

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

//SET SECURITY HTTP
app.use(helmet());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//LIMITER FORM SAME IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "To many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

app.use(express.json({ limit: "30kb" }));
app.use(cookieParser());

app.use(mongoSanitize());
app.use(xss());
app.use(
  hpp({
    whitelist: ["colors"],
  })
);

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
