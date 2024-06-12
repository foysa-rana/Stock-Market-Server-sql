import express from "express";
import cors from "cors";
import { router as CRUD } from "./routes/CRUD.js";
// import dotenv from "dotenv";

// dotenv.config();

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.use("/api/stock", CRUD);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
