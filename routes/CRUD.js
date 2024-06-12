import express from "express";
import client from "../db/db.js";
import data from "../data.json" with { type: 'json' };

// export router
export const router = express.Router();

// Route 0 : POST all the stock data using POST: /api/stock/push/alljsondata
// router.post("/push/alljsondata", async (req, res) => {
//   try {
//     // create table if not exist
//     client.query(
//       `CREATE TABLE IF NOT EXISTS stock_data
//       (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1),
//       date DATE,
//       trade_code VARCHAR(50),
//       high NUMERIC(10,2),
//       low NUMERIC(10,2),
//       open NUMERIC(10,2),
//       close NUMERIC(10,2),
//       volume BIGINT);`,
//       (err) => {
//         if (err) {
//           console.log(err.message);
//         }
//       }
//     );
//     // pushing multiple data
//     data.forEach((el) => {
//       client.query(
//         `INSERT INTO stock_data(date, trade_code, high, low, open, close, volume) VALUES( DATE'${
//           el.date
//         }','${el.trade_code}', ${el.high}, ${el.low}, ${el.open}, ${
//           el.close
//         }, ${el.volume.split(",").join("")});`,
//         (err, response) => {
//           if (err) {
//            console.log(err.message);
//           }
//         }
//       );
//     });
//   } catch (error) {
//     res.status(500).send("Internal server error");
//   }
// });

// Route 1 : Get all the stock data using GET: /api/stock/getall/stockdata
router.get("/getall/stockdata", async (req, res) => {
  try {
    client.query(
      `SELECT * FROM stock_data ORDER BY id DESC;`,
      (err, response) => {
        if (!err) {
          res.send(response.rows);
        } else {
          res.status(404).send(err.message);
        }
      }
    );
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// Route 2 : PUT all the stock data using PUT: /api/stock/update/stockdata/:id
router.put("/update/stockdata/:id", async (req, res) => {
  try {
    const { date, trade_code, high, low, open, close, volume } = req.body;
    client.query(
      `UPDATE stock_data SET date = DATE'${date}', trade_code = '${trade_code}', high = '${high}', low = '${low}', open = '${open}', close = '${close}', volume = '${volume}' WHERE id = ${req.params.id};`,
      (err, response) => {
        if (!err) {
          res.send({
            id: req.params.id,
            date,
            trade_code,
            high,
            low,
            open,
            close,
            volume,
          });
        } else {
          res.status(404).send({ error: err.message });
        }
      }
    );
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// Route 3 : DELETE all the stock data using DELETE: /api/stock/delete/stockdata/:id
router.delete("/delete/stockdata/:id", async (req, res) => {
  try {
    client.query(
      `DELETE FROM stock_data WHERE id = ${req.params.id};`,
      (err, response) => {
        if (!err) {
          res.send({ successful: "Delete Successfull" });
        } else {
          res.status(404).send({ error: err.message });
        }
      }
    );
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// Route 4 : POST all the stock data using POST: /api/stock/create/stockdata
router.post("/create/stockdata", async (req, res) => {
  try {
    // create table if not exist
    client.query(
      `CREATE TABLE IF NOT EXISTS stock_data
      (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1),
      date DATE,
      trade_code VARCHAR(50),
      high NUMERIC(10,2),
      low NUMERIC(10,2),
      open NUMERIC(10,2),
      close NUMERIC(10,2),
      volume BIGINT);`,
      (err) => {
        if (err) {
          console.log(err.message);
        }
      }
    );
    // adding data
    const { date, trade_code, high, low, open, close, volume } = req.body;
    client.query(
      `INSERT INTO stock_data(date, trade_code, high, low, open, close, volume) VALUES( DATE'${date}','${trade_code}', ${high}, ${low}, ${open}, ${close}, ${volume}) RETURNING id, date, trade_code, high, low, open, close, volume;;`,
      (err, response) => {
        if (!err) {
          res.send(response.rows[0]);
        } else {
          res.status(404).send({ error: err.message });
        }
      }
    );
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});
