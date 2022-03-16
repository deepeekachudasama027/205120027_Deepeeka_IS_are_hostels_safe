const { Pool } = require("pg");
var config = {
  connectionString:
    "postgresql://postgres:Postgres@1485@localhost:5432/205120027_ISLab_Hash_app",
 ssl: { rejectUnauthorized: false },
 ssl:false,
  max: 10,
  idleTimeoutMillis: 1000000,
};
const pool = new Pool(config);
pool.on("error", function (err, client) {
  console.error("idle client error", err.message, err.stack);
});

module.exports = pool;