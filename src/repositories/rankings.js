const query = require('../services/query');
const generateInsertQueryValues = require('../helpers/generateInsertQueryValues');

const TABLE = 'team_rankings';

const getRanking = async (year, rankingType) => {
  const ranking = await query(
    `SELECT * FROM ${TABLE}
    WHERE year = ${year}
    AND "rankingType" = '${rankingType}';`,
  );

  return ranking?.rows ?? [];
}

const getRankingsForTeam = async (year, team) => {
  const ranking = await query(
    `SELECT * FROM ${TABLE}
    WHERE year = ${year}
    AND team = '${team}';`,
  );

  return ranking?.rows ?? [];
}


const insertRankings = async (rankings) => {
  if(!rankings || !rankings.length) {
    return false
  };

  const mapRankingsToQuery = generateInsertQueryValues(rankings);
  const rankingValuesForQuery = rankings.flat();
  const queryString = `INSERT INTO ${TABLE} (team, "rankingType", rank, year) VALUES ${mapRankingsToQuery};`;

  const result =  await query(queryString, rankingValuesForQuery);

  return result?.rowCount === rankings.length;
}

module.exports = { getRanking, insertRankings, getRankingsForTeam };
