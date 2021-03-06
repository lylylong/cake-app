const path = require("path");

const express = require("express");

const routes = require("./controllers/");
const sequelize = require("./config/connection");

const session = require("express-session");

const format = require("date-fns/format");
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3001;

// set up Handlebars.js as your app's template engine
const exphbs = require("express-handlebars");
const { truncate } = require("./models/Post");
const hbs = exphbs.create({ helpers });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.locals.session = req.session;
  console.log(res.locals.session);
  next();
});

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});

// turn on connection to database and server
// sequelize.sync({ force: true }).then(() => {
//   app.listen(PORT, () => console.log("Now listening"));
// });
