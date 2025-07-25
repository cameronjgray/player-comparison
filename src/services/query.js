const pool = require('./db');

const query = async (psql, vars) => {
  return await pool.query(
    psql,
    vars,
  );
};

module.exports = query;
