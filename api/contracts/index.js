const express = require("express");

<<<<<<< HEAD
const Router = express.Router();
const db = require("../../db");


//utils
const s3Upload = require("../../utils/s3");

let now = new Date();
let date = now.toLocaleDateString();
let time = now.toLocaleTimeString();
const date_time = new Date();

Router.get (
    "/get-user-contracts/:user_id",
    async (req, res) => {
        try {
            const q = "SELECT * FROM contracts WHERE user_id = (?)";
            db.query(q, [req.params.user_id], (err, data) => {
                if (err) return res.status(500).json(err.message);
                // else console.log(data);
                console.log({ data });
                return res.status(200).json({ data });
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }
);


=======
//utils
const s3Upload = require("../../utils/s3");
const db = require("../../db");

const Router = express.Router();

// let now = new Date();
// let date = now.toLocaleDateString();
// let time = now.toLocaleTimeString();
// const date_time = new Date();

// Router.get (
//   "/get-user-contracts/:user_id", async (req, res) => {
    
//   }
// );
>>>>>>> e91f963af27717ec432df3ef291c918a1f125b8d

module.exports = Router;