const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const session = require("express-session");
const sequelize = require("./config/connection");

const exphbs = require("express-handlebars");

const routes = require("./controllers/index");

const app = express();
const PORT = process.env.PORT || 3001;
const usersFilePath = path.join(__dirname, "users.json");
const hbs = exphbs.create({});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

const sess = {
  secret: "Super secret secret",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sess));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  // Simple validation
  if (!username || !email || !password) {
    return res.status(400).send("All fields are required.");
  }

  // Check if user already exists
  const users = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));
  if (users[username]) {
    return res.status(400).send("User already exists.");
  }

  // Register new user
  users[username] = { email, password }; // Warning: store passwords securely using hashing
  fs.writeFileSync(usersFilePath, JSON.stringify(users));

  res.send("Registration successful.");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));

  if (!users[username] || users[username].password !== password) {
    return res.status(400).send("Invalid credentials.");
  }

  res.send("Login successful.");
});

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
