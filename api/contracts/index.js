const express = require("express");

const Router = express.Router();
const db = require("../../db");


//db functions
// const { getCostumerIdFromUserId } = require("../../db_functions/getCostumerId");
// const { getLastInsertId } = require("../../db_functions/getLastInsertId");
const {
  db_query,
  getLastInsertId,
  getCostumerIdFromUserId,
} = require("../../db_functions");

let now = new Date();
let date = now.toLocaleDateString();
let time = now.toLocaleTimeString();
const date_time = new Date();

// req to know about the endpoints
Router.get("/", (req, res) => {
  res.json(
    `The following are the endpoints for the contract module:
    1 /create-new-contract/:user_id - POST 
        req.body: {
          amount : int,
          payment_order_id : int,
          invoice_provider_id : int,
          invoice_provider_name : string,
        }    
    2. /get-contracts/:user_id - GET
    3. /update-contract/:user_id/:contract_id - PUT
        req.body: {
          id : int,
          customer_id : int,
          amount : int,
          isApproved : tinyint (0 or 1),
          comment : string,
          payment_date : date,
          payment_order_id : string,
          invoice_provider_id : int,
          invoice_provider_name : string,
          created_by : string,
          created_date_time : date,
          updated_date_time : date,
        }
          
    4. /delete-contract/:user_id/:contract_id - DELETE 
`
  );
});

/**
 * -- costumers table
 *  id int(11) AI PK
 *  customer_id int(11)
 *  amount int(11)
 *  isApproved tinyint(4)
 *  comment varchar(255)
 *  payment_date date
 *  payment_order_id varchar(255)
 *  invoice_provider_id int(11)
 *  invoice_provider_name varchar(255)
 *  created_by varchar(255)
 *  created_date_time datetime
 *  updated_date_time
 *
//  * -- maybe fields to add to contracts table
//  * name,
//  * type,
//  * description,
//  * start_date,
//  * end_date,
//  * value,
//  * currency,
//  * status,
//  * document_id
 */

// get contracts
Router.get("/get-contracts/:user_id", async (req, res) => {
  try {
    const costumer_id = await getCostumerIdFromUserId(req.params.user_id);
    
    if (!costumer_id && costumer_id !== 0) {
      throw new Error("No costumer_id found for the given user_id");
    }

    const q = "SELECT * FROM contracts WHERE customer_id = (?)";
    
    db.query(q, [costumer_id], (err, data) => {
      
      if (err) {
        return res.status(500).json(err.message);
      }

      console.log({ data });
      return res.status(200).json({ data });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

// create contract
Router.post("/create-new-contract/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const {
      amount,
      payment_order_id,
      invoice_provider_id,
      invoice_provider_name,
    } = req.body;

    const { created_by, created_date_time, updated_date_time } = {
      created_by: invoice_provider_name,
      created_date_time: date_time,
      updated_date_time: date_time,
    };

    const customer_id = await getCostumerIdFromUserId(user_id);

    // make new contract in the db
    const q =
      "INSERT INTO contracts (customer_id, amount, payment_order_id, invoice_provider_id, invoice_provider_name, created_by, created_date_time, updated_date_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(
      q,
      [
        customer_id,
        amount,
        payment_order_id,
        invoice_provider_id,
        invoice_provider_name,
        created_by,
        created_date_time,
        updated_date_time,
      ],
      async (err, data) => {
        if (err) return res.status(500).json(err.message);
        // else console.log(data);
        const contract_id = await getLastInsertId();
        const contract = (
          await db_query("SELECT * FROM contracts WHERE id = (?)", [
            contract_id,
          ])
        )[0];

        console.log({ contract });
        return res.status(200).json({ contract });
      }
    );
  } catch (err) {
    console.error(err.message);
  }
});

// update contract
Router.put("/update-contract/:user_id/:contract_id", async (req, res) => {
  try {
    const { user_id, contract_id } = req.params;
    const {
      id,
      customer_id,
      amount,
      isApproved,
      comment,
      payment_date,
      payment_order_id,
      invoice_provider_id,
      invoice_provider_name,
      created_by,
      created_date_time,
      updated_date_time,
    } = req.body;

    const contract_rows = await db_query(
      "UPDATE contracts SET contract_name = $1, contract_type = $2, contract_description = $3, contract_start_date = $4, contract_end_date = $5, contract_value = $6, contract_currency = $7, contract_status = $8, contract_file = $9, contract_file_name = $10, contract_file_type = $11, contract_file_size = $12, contract_file_url = $13, contract_file_key = $14, date_updated = $15, time_updated = $16, date_time_updated = $17 WHERE user_id = $18 AND contract_id = $19 RETURNING *",
      [
        id,
        customer_id,
        amount,
        isApproved,
        comment,
        payment_date,
        payment_order_id,
        invoice_provider_id,
        invoice_provider_name,
        created_by,
        created_date_time,
        updated_date_time,
        user_id,
        contract_id,
      ]
    );

    res.json({ contract: contract_rows[0] });
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = Router;
