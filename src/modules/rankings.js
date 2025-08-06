const rankingsRepository = require('../repositories/rankings');
const syncRepository = require('../repositories/sync');
const readCSVFile = require('../helpers/readCSVFile');
const { FILES, SyncDataNames } = require('../helpers/enums');

const getRanking = async (year, rankingType) => {
  const ranking = await rankingsRepository.getRanking(year, rankingType);

  return ranking;
}

const getRankingForTeam = async (year, rankingType, team) => {
  const rankingList = await rankingsRepository.getRankingForTeam(year, rankingType, team);

  return rankingList[0].rank;
}


const getRankingsForTeam = async (year, team) => {
  const rankingList = await rankingsRepository.getRankingsForTeam(year, team);

  return rankingList;
}

const insertRankings = async () => {
  const haveSynced = await syncRepository.getSyncStatus(SyncDataNames.rankings);
  if (haveSynced) {
    console.log('Rankings already synced.');
    return;
  };
  const rankings = readCSVFile(FILES.DATA.RANKINGS);

  const result =  await rankingsRepository.insertRankings(rankings);

  if (result) {
    await syncRepository.updateSyncStatus(SyncDataNames.rankings, true);
    console.log('Successfully inserted rankings.');
  }
  else {
    console.log('Failed to insert rankings.');
  }
};

module.exports = {
  getRanking,
  insertRankings,
  getRankingsForTeam,
  getRankingForTeam,
};
