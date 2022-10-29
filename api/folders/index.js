const express = require("express");

const Router = express.Router();
const db = require("../../db");


//utils
const s3Upload = require("../../utils/s3");

let now = new Date();
let date = now.toLocaleDateString();
let time = now.toLocaleTimeString();
const date_time = new Date();

/*
Route     /get-user-folders/:_id
Des       
Params    none
Access    Public
Method    GET  
*/
Router.get("/get-user-folders/:_id/:folder_name", async (req, res) => {
  try {
    const parent_folder_name = req.params.folder_name;
    console.log(req.params._id, "parent_folder_name", parent_folder_name);
    const q =
      "SELECT * FROM client_folders Where user_id = (?) and parent_folder_name = (?)";
    db.query(q, [req.params._id, parent_folder_name], (err, data) => {
      if (err) return res.status(500).json(err.message);
      // else console.log(data);
      console.log({ data });
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
    const userName = req.body.userName;
    const parentFolderName = req.body?.parentFolderName
      ? req.body?.parentFolderName
      : "root";
    // s3 bucket options
    const bucketOptions = {
      Bucket: "finlo",
      Key: `${userName}/${folderName}/`,
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
  const { folderNewName, client_folders_id, folderName, user_id } = req.body;
  let q =
    "UPDATE client_folders SET folder_name =?, updated_date_time = ? where `client_folders_id` =? AND `user_id` = ?";
  let q1 =
    "UPDATE client_folders SET parent_folder_name = ? WHERE `client_folders_id` =? AND `user_id` = ? AND `parent_folder_name` = ?";
  db.query(
    q,
    [
      folderNewName,
      date_time,
      client_folders_id,
      user_id,
      folderNewName,
      client_folders_id,
      user_id,
      folderName,
    ],
    (err, data) => {
      if (err) return res.status(500).json(err.message);
      else {
        let q1 =
          "UPDATE client_folders SET parent_folder_name = ? WHERE `client_folders_id` =? AND `parent_folder_name` = ?";
        db.query(
          q,
          [folderNewName, client_folders_id, folderName],
          (err, data) => {
            if (err) return res.status(500).json({ error: err.message });
            return res.status(200).json({ data });
          }
        );
      }
    }
  );
});

module.exports = Router;

