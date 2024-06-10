import pg from "pg";

const client = new pg.Client({
  host: "localhost",
  port: 5432,
  database: "stock_market_db",
  user: "postgres",
  password: "127623",
});

export default client;
