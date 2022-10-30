const express = require("express");
const passport = require("passport");
const multer = require("multer");


//utils
const { s3Upload, s3Bucket } = require("../../utils/s3");
const db = require("../../db");
const { CostExplorer } = require("aws-sdk");

// const {
//   ConfigurationServicePlaceholders,
// } = require("aws-sdk/lib/config_service_placeholders");

const Router = express.Router();

// Multer Config
const storage = multer.memoryStorage();
const upload = multer({ storage });

let now = new Date();
let date = now.toLocaleDateString();
let time = now.toLocaleTimeString();
const date_time = now;

const getSignedUrl = async (key, expires) => {
  const params = {
    Bucket: "finlo",
    Key: key,
    Expires: expires || 1000 * 5,
  };
  try {
    const url = await new Promise((resolve, reject) => {
      s3Bucket.getSignedUrl("getObject", params, (err, url) => {
        err ? reject(err) : resolve(url);
      });
    });
    console.log(url);
    return url;
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
};

const getKeyFromS3Link = (s3Link) => {
  const url = new URL(s3Link);
  return decodeURIComponent (url.pathname.slice(1));
};  

Router.get(
  "/get-download-link",
  // passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const {
        user_id,
        s3Link,
        expires
      } = req.body;
      console.log (req.body);
      // check if user is in the db
      const user = await db.query(
        "SELECT * FROM users WHERE user_id = $1",
        [user_id],
        (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log(result.rows);
          // if user is not in the db
          if (result.rows.length === 0) {
            return res.status(401).json("Unauthorized");
          }
        }
      );
      const key = getKeyFromS3Link(s3Link);
      const url = await getSignedUrl(key, expires);  
      return res.status(200).json({ url });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }
);

/*
Route     /get-user-docs/:_id/:folderName
Des       
Params    none
Access    Public
Method    GET  
*/
Router.get("/get-user-docs/:_id/:folderName", async (req, res) => {
  try {
    const folder_name = req.params.folderName;
    const user_id = req.params._id;
    console.log({ folder_name });
    const q = `SELECT * FROM client_documents Where folder_name = ? AND user_id = ?`;
    db.query(q, [folder_name, user_id], (err, files) => {
      if (err) return res.status(500).json(err.message);
      else {
        const q =
          "SELECT * FROM client_folders Where user_id = (?) and parent_folder_name = (?)";
        db.query(q, [req.params._id, folder_name], (err, folders) => {
          if (err) return res.status(500).json(err.message);
          const data = {
            folders,
            files,
          };
          return res.status(200).json({ data });
        });
      }
    });
  } catch (error) {}
});

/*
Route     /get-recent-user-docs
Des       
Params    none
Access    Public
Method    GET  
*/
Router.get("/get-recent-user-docs/:_id", async (req, res) => {
  try {
    const q = `SELECT * FROM client_documents Where user_id = (?)`;
    db.query(q, req.params._id, (err, data) => {
      if (err) return res.status(500).json(err.message);
      return res.status(200).json({ data });
    });
  } catch (error) {}
});

/*
Route     /uploadfile/:_id/:folderName
Des       
Params    none
Access    Public
Method    POST  
*/
Router.post(
  "/uploadfile/:_id/:folderName",
  upload.single("file"),
  async (req, res) => {
    try {
      const file = req.file;
      const user_id = req.params._id;
      const folderName = req.params.folderName;

      // s3 bucket options
      const bucketOptions = {
        Bucket: "finlo",
        Key: `${folderName}/${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        //   ACL: "public-read", // Access Control List
      };

      const uploadImage = await s3Upload(bucketOptions);

      const q =
        "INSERT INTO client_documents (`user_id`, `document_name`, `document_link`, `document_Size`,`document_type`, `folder_name`, `created_date_time`,`updated_date_time`) VALUES (?)";
      const values = [
        user_id,
        file.originalname,
        uploadImage.Location,
        file.size,
        file.mimetype,
        folderName,
        date_time,
        date_time,
      ];

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err.message);
        // else console.log(data);
        return res
          .status(200)
          .json({ message: "File uploaded successfully", data });
      });
      // return res.status(200).json({ uploadImage });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

/*
Route     /delete-file
Des       
Params    none
Access    Public
Method    DELETE
*/
Router.delete("/delete-file", (req, res) => {
  const fileName = req.body.fileName;
  const user_id = req.body.user_id;
  console.log({ fileName, user_id });
  const q = `DELETE FROM client_documents WHERE document_name = ? AND user_id = ?`;
  db.query(q, [fileName, user_id], (err, data) => {
    if (err) return res.status(500).json(err.message);
    return res.status(200).json({ data });
  });
});

/*
Route     /update-file-name
Des       
Params    none
Access    Public
Method    DELETE
*/
Router.put("/update-file-name", (req, res) => {
  try {
    const { client_documents_id, user_id, updatedFileName } = req.body;
    const userID = parseInt(user_id);
    const q = `UPDATE client_documents
    SET
    folder_name = ${updatedFileName},
    WHERE (client_documents_id = ${client_documents_id}) and (user_id = ${userID})
    `;
    db.query(q, [updatedFileName, client_documents_id, userID], (err, data) => {
      if (err) return res.status(500).json(err.message);
      return res.status(200).json({ data });
    });
  } catch (error) {
    return res.status();
  }
});

// UPDATE `finlotax`.`client_documents` SET `document_name` = '6_Pista.jpg' WHERE (`client_documents_id` = '8') and (`user_id` = '2');

module.exports = Router;
