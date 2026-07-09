require("dotenv").config();

const express = require("express");

const { pool } = require("./src/db");
const PostgresRepository = require("./src/repositories/postgresRepo");
const Service = require("./src/services/service");
const createRouter = require("./src/routes/routes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// dependency injection
const repository = new PostgresRepository(pool);
const service = new Service(repository);
const router = createRouter(service);

app.use(router);

app.get("/", (req, res) => {
  res.json({
    name: "API",
    version: "1.0",
    endpoints: ["/tasks", "/tasks/:id", "/health", "/docs"],
  });
});

// global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled application error:", err);
  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

module.exports = app;
