const teamsRepository = require('../repositories/teams');

const getTeams = async () => {
  const teams = teamsRepository.getTeams();

  return teams;
}

const insertTeams = async () => {
  const teams = [
    ['Tampa Bay Buccaneers', 'TB'],
    ['Housten Texans', 'HST'],
  ];

  const result =  await teamsRepository.insertTeams(teams);

  if (result) {
    console.log('Successfully inserted teams.');
  }
  else {
    console.log('Failed to insert teams');
  }
};

module.exports = { getTeams, insertTeams };
