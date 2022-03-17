require('dotenv').config();

const express = require("express");
const { engine } = require('express-handlebars');
const path = require("path");
const session = require("express-session");
const compression = require("compression");
const errorHandler = require("./middleware/error");

const router = require("./router/routes");

const app = express();
app.set("trust proxy", 1);
app.use(
  session({
    secret: "Keep it secret",
    name: "uniqueSessionID",
    resave: true,
    saveUninitialized: false,
  })
);

app.set("views", path.join(__dirname, "/views/"));
app.engine(
  "handlebars",
  engine({
    extname: ".hbs",
    defaultLayout: "choose",
    layoutsDir: __dirname + "/views/layouts/",
    // challengesDir: __dirname + "/views/challenges/",
  })
);

app.set("view engine", "hbs");

app.use(express.static(__dirname + "/public"));

const cors = require("cors");

app.use(compression());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(errorHandler);
app.use(cors());
app.use(router);



app.listen(3000, () => {
  console.log("Hashing Algorithm Application.....");
});
