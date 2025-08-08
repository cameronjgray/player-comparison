const playersAPI = require('./players');
const teamsAPI = require('./teams');
const calculateAPI = require('./calculate');
const weightsAPI = require('./weights');

const YEAR = 2024;

const getRandomWeights = (weightLength) => {
  let totalWeight = 1;
  const weights = [];

  for(let i = 0; i<weightLength; i++){
    if (i === weightLength - 1) {
      weights.push(totalWeight);
      continue;
    }

    const weight = Math.random() * totalWeight;
    weights.push(weight);
    totalWeight -= weight;
  }

  return weights.sort(_ => (Math.random() * 2) - 1);
};

const predictPlayers = async () => {
  const playersByFFPointsWithGoalRank = await playersAPI.getPlayersByFFPointsWithGoalRank();
  let score = 1;
  let runs = 0;
  const TOTAL_RUNS = 1000;
  const TARGET = 0.1;
  const WEIGHT_LENGTH = 1;
  const RUN_NAME = 'Player Weights';

  while (score > TARGET && runs < TOTAL_RUNS) {
    const weightsList = getRandomWeights(WEIGHT_LENGTH);
    const weights = {
      age: weightsList[0],
      height: weightsList[1],
      weight: weightsList[2],
      experience: weightsList[3],
      rating: weightsList[4],
      powerRanking: weightsList[5],
      oppositionPosition: weightsList[6],
      teamPosition: weightsList[7],
    };
    const testPlayers = playersByFFPointsWithGoalRank.map(player => player);
    const teamsWithGrade = [];

    for(const player of testPlayers) {
      const grade = await calculateAPI.calculatePlayerGrade(player, weights, YEAR);
      teamsWithGrade.push({ ...player, grade });
    };

    const sortedTeams = teamsWithGrade.sort((playerA, playerB) => playerB.grade - playerA.grade);
    const teamsWithTestRank = []

    for(let j = 0; j < sortedTeams.length; j++) {
      const testRank = j / sortedTeams.length;
      teamsWithTestRank.push({ ...sortedTeams[j], testRank });
    };

    const testRankDifferences = teamsWithTestRank.map(player => Math.abs(player.goalRank - player.testRank));

    score = testRankDifferences.reduce((acc, currentRank) =>
      acc + currentRank, 0) /
        testRankDifferences.length;

    await weightsAPI.insertWeight({ name: RUN_NAME, ...weights}, score);
    runs++;
  }

  if (runs >= TOTAL_RUNS) {
    console.log('Reached max runs of', TOTAL_RUNS);
  }
  else {
    console.log(`Met target of < ${TARGET}`);
  };
};

const predictTeams = async () => {
  const teams = await teamsAPI.getTeamsWithGoalRank();
  let score = 1;
  let runs = 0;
  const TOTAL_RUNS = 10000;
  const TARGET = 0.1;
  const WEIGHT_LENGTH = 2;
  const RUN_NAME = 'Team Weights';

  while (score > TARGET && runs < TOTAL_RUNS) {
    const weightsList = getRandomWeights(WEIGHT_LENGTH);
    const weights = {
      powerRanking: weightsList[0],
      strengthOfSchedule: weightsList[1],
    };
    const testTeams = teams.map(team => team);
    const teamsWithGrade = [];

    for(const team of testTeams) {
      const grade = await calculateAPI.calculateTeamGrade(team.abbreviation, weights, YEAR);
      teamsWithGrade.push({ ...team, grade });
    };

    const sortedTeams = teamsWithGrade.sort((teamA, teamB) => teamB.grade - teamA.grade);
    const teamsWithTestRank = []

    for(let j = 0; j < sortedTeams.length; j++) {
      const testRank = j / sortedTeams.length;
      teamsWithTestRank.push({ ...sortedTeams[j], testRank });
    };

    const testRankDifferences = teamsWithTestRank.map(team => Math.abs(team.goalRank - team.testRank));

    score = testRankDifferences.reduce((acc, currentRank) =>
      acc + currentRank, 0) /
        testRankDifferences.length;

    await weightsAPI.insertWeight({ name: RUN_NAME, ...weights}, score);
    runs++;
  }

  if (runs >= TOTAL_RUNS) {
    console.log('Reached max runs of', TOTAL_RUNS);
  }
  else {
    console.log(`Met target of < ${TARGET}`);
  };
};

module.exports = {
  predictPlayers,
  predictTeams,
};
