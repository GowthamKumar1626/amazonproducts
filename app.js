const express = require("express");
const morgan = require("morgan");
const path = require("path");

const kurthiesRouter = require("./routes/kurthiRoutes");
const jeanTopsRouter = require("./routes/jeanTopsRoutes");
const userRouter = require("./routes/userRoutes");
const viewRouter = require("./routes/viewRoutes");

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/", viewRouter);
app.use("/api/v1/kurthies", kurthiesRouter);
app.use("/api/v1/jeantops", jeanTopsRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  res.status(404).header("<h1>404! Page not Found</h1>");
  next();
});

module.exports = app;
