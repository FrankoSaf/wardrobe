const express = require("express");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
var cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const wardrobeRoutes = require("./routes/wardrobeRoutes");
const outfitRoutes = require("./routes/outfitRoutes");
const groupRoutes = require("./routes/groupRoutes");
const { isVerified } = require("./middlewares/userVerified");
const app = express();

app.use(express.json());
app.use(cors());
const options = {
  host: process.env.HOST,
  port: 3306,
  user: process.env.DB_USERNAME,
  password: process.env.PASSWORD,
  database: "Wardrobe",
};
const sessionStore = new MySQLStore(options);
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { secure: false, httpOnly: false, maxAge: 259200000 },
  })
);
app.use("/auth", authRoutes);
app.use("/wardrobe", isVerified, wardrobeRoutes);
app.use("/outfits", isVerified, outfitRoutes);
app.use("/group", isVerified, groupRoutes);
app.use((err, req, res, next) => {
  const { message = "Something went wrong", status = 500 } = err;
  res.status(status).send(message);
});
app.listen(process.env.PORT, () => {
  console.log("Server is listening on port " + process.env.PORT);
});
