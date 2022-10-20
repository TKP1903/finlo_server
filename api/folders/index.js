const express = require("express");

//utils
const s3Upload = require("../../utils/s3");
const db = require("../../db");

const Router = express.Router();

let now = new Date();
let date = now.toLocaleDateString();
let time = now.toLocaleTimeString();
const date_time = now;

/*
Route     /get-user-folders/:_id
Des       
Params    none
Access    Public
Method    GET  
*/
Router.get("/get-user-folders/:_id", async (req, res) => {
  try {
    console.log(req.params._id);
    const q = "SELECT * FROM client_folders Where user_id = (?)";
    db.query(q, [req.params._id], (err, data) => {
      if (err) return res.status(500).json(err.message);
      // else console.log(data);
      return res.status(200).json({ data });
    });
  } catch (error) {}
});

/*
Route     /create-folder
Des       
Params    none
Access    Public
Method    POST  
*/
Router.post("/create-folder", async (req, res) => {
  try {
    const user_id = req.body.user_id;
    const folderName = req.body.folderName;
    const parentFolderName = req.body?.parentFolderName
      ? req.body?.parentFolderName
      : "/";
    // s3 bucket options
    const bucketOptions = {
      Bucket: "finlo",
      Key: `${folderName}/`,
      Body: `${folderName}`,
      // ContentType: file.mimetype,
      //   ACL: "public-read", // Access Control List
    };
    const uploadImage = await s3Upload(bucketOptions);

    const values = [
      user_id,
      folderName,
      uploadImage.Location,
      parentFolderName,
      date_time,
      date_time,
    ];
    const q =
      "INSERT INTO client_folders (`user_id`,`folder_name`,`s3_folder_location`, `parent_folder_name`,`created_date_time`,`updated_date_time`) VALUES(?)";
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err.message);
      return res
        .status(200)
        .json({ message: "File uploaded successfully", data });
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
/*
Route     /delete-folder
Des       
Params    none
Access    Public
Method    DELETE
*/
Router.delete("/delete-folder", (req, res) => {
  const { folderName, user_id } = req.body;
  console.log({ folderName, user_id });
  const q = `DELETE FROM client_folders WHERE folder_name = (?) and user_id = (?)`;
  db.query(q, [folderName, user_id], (err, data) => {
    if (err) return res.status(500).json(err.message);
    return res.status(200).json({ data });
  });
});

/*
Route     /update-folder-name
Des       
Params    none
Access    Public
Method    DELETE
*/
Router.put("/update-folder-name", (req, res) => {
  const { folderNewName, folderName, user_id } = req.body;
  let client_folder_id;
  db.query(
    "SELECT * FROM client_folders where folder_name = ? and user_id = ?",
    [folderName, user_id],
    (err, data) => {
      if (err) return res.status(500).json(err.message);
      client_folder_id = data[0].client_folders_id;
    }
  );
  console.log(client_folder_id);
  //   const q = `UPDATE client_folders
  //   SET
  //   folder_name = ${folderNewName},
  //   WHERE folder_name = ? and user_id = ?
  //   `;
  //   //   UPDATE `finlotax`.`client_folders` SET `folder_name` = 'demo/d' WHERE (`client_folders_id` = '3') and (`user_id` = '1');

  //   db.query(q, [folderName, user_id], (err, data) => {
  //     if (err) return res.status(00500).json(err.message);
  //     return res.status(200).json({ data });
  //   });
});

module.exports = Router;
