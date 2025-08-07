const query = require('../services/query');

const TABLE = 'weights';

const insertWeight = async (weights, score) => {
  const result = await query(
    `INSERT INTO ${TABLE} (weights, score) VALUES ('{${weights}}', ${score});`
  );

  return result?.rowCount === 1;
};

const getWeights = async () => {
  const result = query(
    `SELECT * from weights;`
  );

  return result?.rows;
};

module.exports = { insertWeight, getWeights };
