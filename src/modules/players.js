const playersRepository = require('../repositories/players');
const syncRepository = require('../repositories/sync');
const readCSVFile = require('../helpers/readCSVFile');
const cleanPlayerData = require('../helpers/cleanPlayerData');
const addFantasyPointsToPlayers  = require('../helpers/addFantasyPointsToPlayers');
const { FILES, SyncDataNames } = require('../helpers/enums');

const getPlayerByNumber = async (team, number) => {
  const playerList = await playersRepository.getPlayerByNumber(team, number);

  return playerList[0];
}

const insertPlayers = async () => {
  const haveSynced = await syncRepository.getSyncStatus(SyncDataNames.players);
  if (haveSynced) {
    console.log('Players already synced.');
    return;
  };
  const players = cleanPlayerData(readCSVFile(FILES.DATA.PLAYERS));
  const fantasyPoints2024 = readCSVFile(FILES.DATA.FANTASY_POINTS_2024);
  const playersWithFantasyPoints = addFantasyPointsToPlayers(players, fantasyPoints2024);

  const result = await playersRepository.insertPlayers(playersWithFantasyPoints);

  if (result) {
    await syncRepository.updateSyncStatus(SyncDataNames.players, true);
    console.log('Successfully inserted players.');
  }
  else {
    console.log('Failed to insert players.');
  }
};

const getPlayersWithFantasyPoints = async () => {
  const players = await playersRepository.getPlayersWithFantasyPoints();

  return players;
};

const getPlayersByFFPointsWithGoalRank = async () => {
  const playersWithPoints = await getPlayersWithFantasyPoints();
  const sortedPlayers = playersWithPoints.sort((playerA, playerB) => playerB.fantasyPoints2024 - playerA.fantasyPoints2024);
  const playersWithGoalRank = [];

  sortedPlayers.forEach((player, index) => {
    const goalRank = index / sortedPlayers.length;

    playersWithGoalRank.push({...player, goalRank});
  });

  return playersWithGoalRank;
};

module.exports = {
  getPlayerByNumber,
  insertPlayers,
  getPlayersByFFPointsWithGoalRank,
};
