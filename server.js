<<<<<<< HEAD
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
=======
const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const routes = require("./controllers/");
const sequelize = require("./config/connection");
const session = require("express-session");
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({ helpers });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sess = {
  secret: "Super secret secret",
>>>>>>> e02694bab5c96cb6802f8616f45a0d2485c15929
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
<<<<<<< HEAD
    db: sequelize
  })
};

app.use(session(sess));

const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
=======
    db: sequelize,
  }),
};

app.use(session(sess));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});

// turn on connection to database and server
// sequelize.sync({ force: true }).then(() => {
//   app.listen(PORT, () => console.log("Now listening"));
// });
>>>>>>> e02694bab5c96cb6802f8616f45a0d2485c15929
