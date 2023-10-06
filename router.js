const express = require("express");
const nocache = require("nocache");
const router = express.Router();

const credentials = {
  email: 'admin@gmail.com',
  password: 'admin123'
}

// Login route (POST)
router.post("/login", (req, res) => {
  try{
  if (
    req.body.email == credentials.email && req.body.password == credentials.password
  ) {
    req.session.user = req.body.email;
     res.redirect("/route/dashboard");
  } else {
    res.render("base", { message: "Invalid Email or Password" });
  }
}catch (err){
   console.log(err);
   res.status(500).send('Internal server Error')
}
});


// Dashboard route (GET)
router.get("/dashboard", (req, res) => {
  if (req.session.user) {
    res.render("dashboard", { user: req.session.user });
  } else {
    +  res.redirect("/");
  }
});

// Logout route (POST)
router.post("/logout", nocache(), (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
      res.send("Error");
    } else {
      res.render("base", {
        title: "logout",
        logout: "Logout successfully...!",
      });
    }
  });
});



module.exports = router;
