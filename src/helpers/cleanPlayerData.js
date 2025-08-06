const { Positions } = require('../helpers/enums');

const getSimplifiedPosition = (position) => {
  switch (position) {
    case 'LT':
    case 'RT':
      return Positions.T;
    case 'LE':
    case 'RE':
      return Positions.DE;
    case 'MLB':
    case 'ROLB':
    case 'LOLB':
      return Positions.LB;
    case 'SS':
    case 'FS':
      return Positions.S;
    case 'RG':
    case 'LG':
      return Positions.G;
    default:
      return position;
  };
};

const mapPlayerPositions = (players) => {
  return players.map(player => {
    player.splice(
      player.length-1,
      1,
      getSimplifiedPosition(player[player.length -1]),
    );

    return player;
  });
};

const removePlayersWithoutTeam = (players) => players.filter(
  player => player[player.length - 2] !== ''
);

const cleanPlayerData = (players) => {
  const removeNoTeam = removePlayersWithoutTeam(players);
  const mapPositions = mapPlayerPositions(removeNoTeam);

  return mapPositions;
};

module.exports = cleanPlayerData;
