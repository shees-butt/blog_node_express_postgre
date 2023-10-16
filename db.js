const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "blog",
    password: "shees",
    port: 5432,
});

module.exports = pool;