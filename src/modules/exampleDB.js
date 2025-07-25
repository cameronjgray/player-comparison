const query = require('../services/query');

const exampleDB = async () => {
  await query(
    'INSERT INTO teams (name, abbreviation) VALUES ($1, $2);',
    ['Green Bay','GB']
  );
  console.log(await query(
    'SELECT * FROM teams;',
  ));
};

module.exports = { exampleDB };
