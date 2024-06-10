import express from "express";
import cors from "cors";
import { router as stockMarket } from "./routes/stockMarket.js";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.use("/api/stock", stockMarket);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
