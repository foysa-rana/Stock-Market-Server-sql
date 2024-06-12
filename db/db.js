import pg from "pg";
// import dotenv from "dotenv";

// dotenv.config();

const client = new pg.Pool({
  connectionString:
    "postgres://default:iIl3m5aQzKPT@ep-red-dawn-a1aol9z2-pooler.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require",
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
