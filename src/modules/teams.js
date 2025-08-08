const teamsRepository = require('../repositories/teams');
const syncRepository = require('../repositories/sync');
const readCSVFile = require('../helpers/readCSVFile');
const { FILES, SyncDataNames } = require('../helpers/enums');

const getTeams = async () => {
  const teams = await teamsRepository.getTeams();

  return teams;
}

const insertTeams = async () => {
  const haveSynced = await syncRepository.getSyncStatus(SyncDataNames.teams);
  if (haveSynced) {
    console.log('Teams already synced.');
    return;
  };

  const teams = readCSVFile(FILES.DATA.TEAMS);

  const result =  await teamsRepository.insertTeams(teams);

  if (result) {
    await syncRepository.updateSyncStatus(SyncDataNames.teams, true);
    console.log('Successfully inserted teams.');
  }
  else {
    console.log('Failed to insert teams.');
  }
};

const getTeamsWithGoalRank = async () => {
  const teams = await getTeams();
  const sortedTeams = teams.sort((teamA, teamB) => teamA.position2024 - teamB.position2024);
  const teamsWithGoalRank = [];

  sortedTeams.forEach((team, index) => {
    const goalRank = index / sortedTeams.length;

    teamsWithGoalRank.push({ ...team, goalRank });
  });

  return teamsWithGoalRank;
}

module.exports = { getTeams, insertTeams, getTeamsWithGoalRank };
