const playersRepository = require('../repositories/players');
const syncRepository = require('../repositories/sync');
const readCSVFile = require('../helpers/readCSVFile');
const cleanPlayerData = require('../helpers/cleanPlayerData');
const { FILES, SyncDataNames } = require('../helpers/enums');

const getPlayerByNumber = async (team, number) => {
  const player = playersRepository.getPlayerByNumber(team, number);

  return player;
}

const insertPlayers = async () => {
  const haveSynced = await syncRepository.getSyncStatus(SyncDataNames.players);
  if (haveSynced) {
    console.log('Players already synced.');
    return;
  };
  const players = cleanPlayerData(readCSVFile(FILES.DATA.PLAYERS));

  const result = await playersRepository.insertPlayers(players);

  if (result) {
    await syncRepository.updateSyncStatus(SyncDataNames.players, true);
    console.log('Successfully inserted players.');
  }
  else {
    console.log('Failed to insert players.');
  }
};

module.exports = { getPlayerByNumber, insertPlayers };
