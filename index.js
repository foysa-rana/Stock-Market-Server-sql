import express from "express";
import cors from "cors";
import { router as CRUD } from "./routes/CRUD.js";
// import client from "./db/db.js";
// import data from "./data.json" with { type: 'json' }

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.use("/api/stock", CRUD);

// connection to db
// client.connect((err) => {
//   if (err) {
//     console.error("connection error", err.stack);
//   } else {
//     console.log("db connected");
//   }
// });

// data.forEach((el) => {
//   client.query(
//     `INSERT INTO stock_data(date, trade_code, high, low, open, close, volume)
//   VALUES( DATE'${el.date}','${el.trade_code}', ${el.high}, ${el.low}, ${
//       el.open
//     }, ${el.close}, ${el.volume.split(",").join("")});`,
//     (err, res) => {
//       console.log(err, res);
//     }
//   );
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
