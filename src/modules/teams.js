const teamsRepository = require('../repositories/teams');
const readCSVFile = require('../helpers/readCSVFile');
const { FILES } = require('../helpers/enums');

const getTeams = async () => {
  const teams = teamsRepository.getTeams();

  return teams;
}

const insertTeams = async () => {
  const teams = readCSVFile(FILES.DATA.TEAMS);

  const result =  await teamsRepository.insertTeams(teams);

  if (result) {
    console.log('Successfully inserted teams.');
  }
  else {
    console.log('Failed to insert teams');
  }
};

module.exports = { getTeams, insertTeams };
