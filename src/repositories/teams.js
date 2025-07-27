const query = require('../services/query');

const getTeams = async () => {
  const teams = await query(
    'SELECT * FROM teams;',
  );

  return teams?.rows ?? [];
}

const insertTeams = async (teams) => {
  if(!teams || !teams.length) {
    return false
  };

  let mapTeamsToQuery = '';
  let j = 0;
  for (let i = 0; i < teams.length; i++ ) {
    if (j === 0) {
      mapTeamsToQuery += `( $${j+1}, $${j+2} ) `;
    }
    else {
      mapTeamsToQuery += `, ( $${j+1}, $${j+2} ) `;
    }
    j+=2
  };

  const teamValuesForQuery = teams.flat();
  const queryString = `INSERT INTO teams (name, abbreviation) VALUES ${mapTeamsToQuery};`;

  const result =  await query(queryString, teamValuesForQuery);

  return result?.rowCount === teams.length;
}

module.exports = { getTeams, insertTeams };
