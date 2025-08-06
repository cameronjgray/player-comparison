const query = require('../services/query');
const generateInsertQueryValues = require('../helpers/generateInsertQueryValues');

const TABLE = 'players';

const getPlayerByNumber = async (team, number) => {
  const player = await query(
    `SELECT * FROM ${TABLE}
    WHERE team = '${team}'
    AND "jerseyNumber" = ${number};`,
  );

  return player?.rows ?? [];
}

const insertPlayers = async (players) => {
  if(!players || !players.length) {
    return false
  };

  const mapPlayersToQuery = generateInsertQueryValues(players);
  const playerValuesForQuery = players.flat();
  const queryString = `INSERT INTO ${TABLE} (name, age, "jerseyNumber", height, weight, rating, college, experience, team, position, "fantasyPoints2024")
  VALUES ${mapPlayersToQuery};`;

  const result =  await query(queryString, playerValuesForQuery);

  return result?.rowCount === players.length;
}

module.exports = { getPlayerByNumber, insertPlayers };
