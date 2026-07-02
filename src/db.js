const { Pool } = require("pg");

const connectionString =
  process.env.DATABASE_URL ||
  "postgres://postgres:postgres@localhost:5432/tasks";

const pool = new Pool({
  connectionString,
});

// handle errors on the idle clients in the pool through the EvenEmitter
pool.on("error", (err) => {
  console.error("Unexpected error on idle PostgreSQL client", err);
});

const query = (text, params) => pool.query(text, params);

module.exports = {
  pool,
  query,
};
