const express = require("express");
const passport = require("passport");
const Router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../../db");

/*
Route     /register
Des       
Params    none
Access    Public
Method    POST  
*/
Router.post("/register", (req, res) => {
  console.log(req.body);

  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err.message);
    if (data.length) return res.status(409).json("User already exists!");

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users(`email`,`password`, `user_role`) VALUES (?)";
    const values = [req.body.email, hash, req.body.user_role];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
});

/*
Route     /login
Des       
Params    none
Access    Public
Method    POST  
*/
Router.post("/login", (req, res) => {
  console.log(req.body);
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    try {
      console.log(data);
      if (err) {
        console.log (err);
        return res.status(500).json(err);
      }
      if (data.length === 0) return res.status(404).json("User not found!!");

      //Check password
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );

      if (!isPasswordCorrect)
        return res.status(400).json("Wrong username or password!");

      const token = jwt.sign({ id: data[0].id }, "jwtkey");
      const { password, ...other } = data[0];

      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(other);
    } catch (err) {
      console.log(err);
    }
  });
});

/*
Route     /google
Des       Google Signin
Params    none
Access    Public
Method    GET  
*/
Router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

/*
  Route     /google/callback
  Des       Google Signin Callback
  Params    none
  Access    Public
  Method    GET  
  */
Router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // return res.json({token: req.session.passport.user.token})
    return res.redirect(
      `http://52.53.219.188/google/${req.session.passport.user.token}`
    );
  }
);

/*
Route     /logout
Des       
Params    none
Access    Public
Method    POST  
*/
Router.post("/logout", (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
});
module.exports = Router;

// INSERT INTO `finlotax`.`customer`
// (`email`,
// `password`,
// `customer_profile_id`,
// `customer_documents_id`,
// `user_role_id`,
// `phone`,
// `city`,
// `state`,
// `pincode`,
// `country`,
// `profile_url`,
// `created_date_time`,
// `updated_date_time`)
// VALUES
// (
// "client@finlo.com",
// "1234",
// "profile_id",
// "documents_id",
// "user_role_id",
// 7896,
// "HYD",
// "AP",
// 89569,
// "INDIA",
// "profile_id",
// "2003-12-31 12:00:00",
// "2003-12-31 12:00:00");
