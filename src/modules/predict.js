const playersAPI = require('./players');
const calculateAPI = require('./calculate');
const weightsAPI = require('./weights');

const YEAR = 2024;

const getRandomWeights = () => {
  let totalWeight = 1;
  const WEIGHT_LENGTH = 5;
  const weights = [];

  for(let i = 0; i<WEIGHT_LENGTH; i++){
    if (i === WEIGHT_LENGTH - 1) {
      weights.push(totalWeight);
      continue;
    }

    const weight = Math.random() * totalWeight;
    weights.push(weight);
    totalWeight -= weight;
  }

  return weights.sort(_ => (Math.random() * 2) - 1);
};

const predict = async () => {
  const playersByFFPointsWithGoalRank = await playersAPI.getPlayersByFFPointsWithGoalRank();
  let score = 1;
  let runs = 0;
  const TOTAL_RUNS = 10000;
  const TARGET = 0.1;

  while (score > TARGET && runs < TOTAL_RUNS) {
    const weights = getRandomWeights();
    const grades = [];
    const testPlayers = playersByFFPointsWithGoalRank.map(player => player);
    const playersWithGrade = [];

    for(const player of testPlayers) {
      const grade = await calculateAPI.calculatePlayerGrade(player, weights, YEAR);
      playersWithGrade.push({ ...player, grade });
    };

    const sortedPlayers = playersWithGrade.sort((playerA, playerB) => playerB.grade - playerA.grade);
    const playersWithTestRank = []

    for(let j = 0; j < sortedPlayers.length; j++) {
      const testRank = j / sortedPlayers.length;
      playersWithTestRank.push({ ...sortedPlayers[j], testRank });
    };

    const testRankDifferences = playersWithTestRank.map(player => Math.abs(player.goalRank - player.testRank));

    score = testRankDifferences.reduce((acc, currentRank) =>
      acc + currentRank, 0) /
        testRankDifferences.length;

    await weightsAPI.insertWeight(weights, score);
    runs++;
  }

  if (runs >= TOTAL_RUNS) {
    console.log('Reached max runs of', TOTAL_RUNS);
  }
  else {
    console.log(`Met target of < ${TARGET}`);
  };
};

module.exports = { predict };
