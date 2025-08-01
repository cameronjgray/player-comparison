const teamsRepository = require('../repositories/teams');
const syncRepository = require('../repositories/sync');
const readCSVFile = require('../helpers/readCSVFile');
const { FILES, SyncDataNames } = require('../helpers/enums');

const getTeams = async () => {
  const teams = teamsRepository.getTeams();

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

module.exports = { getTeams, insertTeams };
