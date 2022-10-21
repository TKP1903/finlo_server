const express = require("express");

const db = require("../../db");

const Router = express.Router();

Router.get("/get-all-user", (req, res) => {
  const q = `SELECT * FROM users WHERE user_role = 'client'`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err.message);
    return res.status(200).json({ data });
  });
});

module.exports = Router;
