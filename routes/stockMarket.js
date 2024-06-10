import express from "express";
import data from "../data.json" with { type: "json" };

export const router = express.Router();

// Route 1 : Get all the stock data using GET: /api/stock/stockdata
router.get("/stockdata", async (req, res) => {
  try {
    let stockData = data;
    res.send(stockData);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});
