import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const client = new pg.Pool({
  connectionString: process.env.POSTGRES_URL,
});

// connection to db
client.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("db connected");
  }
});

export default client;
