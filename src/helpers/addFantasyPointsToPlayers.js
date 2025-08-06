const addFantasyPointsToPlayers = (players, fantasyPoints) => {
  const fantasyPlayerNumber = fantasyPoints.length;
  let successfulFindings = 0;
  const playersWithFantasyData = [];

  for(const player of players) {
    const updatedPlayer = [ ...player ];
    const findPlayer = fantasyPoints.find(fantasyPlayer => fantasyPlayer[0] === player[0]);

    if (findPlayer) {
      if (findPlayer[0] === 'Davante Adams') {
        console.log(findPlayer);
      }
      updatedPlayer.push(parseFloat(findPlayer[3]));
      successfulFindings++;
    }
    else {
      updatedPlayer.push(undefined);
    }

    playersWithFantasyData.push(updatedPlayer);
  }

  return playersWithFantasyData;
};

module.exports = addFantasyPointsToPlayers;
