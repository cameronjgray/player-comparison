const query = require('../services/query');
const generateInsertQueryValues = require('../helpers/generateInsertQueryValues');

const TABLE = 'teams';

const getTeams = async () => {
  const teams = await query(
    `SELECT * FROM ${TABLE};`,
  );

  return teams?.rows ?? [];
}

const insertTeams = async (teams) => {
  if(!teams || !teams.length) {
    return false
  };

  const mapTeamsToQuery = generateInsertQueryValues(teams);
  const teamValuesForQuery = teams.flat();
  const queryString = `INSERT INTO ${TABLE} (name, abbreviation, "position2024") VALUES ${mapTeamsToQuery};`;

  const result =  await query(queryString, teamValuesForQuery);

  return result?.rowCount === teams.length;
}

module.exports = { getTeams, insertTeams };
