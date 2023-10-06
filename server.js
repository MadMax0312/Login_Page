const express = require("express");
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const nocache = require("nocache");
const router = require('./router');

const app = express();
const PORT = process.env.PORT || 9000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(nocache());
app.set("view engine", "ejs");

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: false,
  })
);

app.use('/route', router);

app.get('/',nocache(), (req, res) => {
  if(req.session.user){
      res.redirect('/route/dashboard')
  }
   res.render('base', { title: "Login page" });
});


// Set the view engine and views directory
app.set("views", path.join(__dirname, "view"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);0
});
