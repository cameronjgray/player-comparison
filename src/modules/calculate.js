const rankingsAPI = require('./rankings');
const scheduleAPI = require('./schedule');
const { RankingType, Positions } = require('../helpers/enums');

const NUMBER_OF_TEAMS = 32;
const HIGHEST_RANKING = 99;
const CURRENT_YEAR = 2025;
const YEAR = 2025;
const MAX_AGE = 41;
const MAX_HEIGHT = 81;
const MAX_WEIGHT = 415;
const MAX_EXP = 20;

const getRankingGrade = (rank) => 1 - (rank / NUMBER_OF_TEAMS);

const getRatingGrade = (rank) => (rank / HIGHEST_RANKING);

const flipGrade = (grade) => 1 - grade;

const getPositionGrade = async (rankingType, team, year) => {
  const teamsInSchedule = await scheduleAPI.getTeamsInSchedule(team);
  const strengthRankingsForScheduledTeams = [];

  for (const team of teamsInSchedule) {
    const teamRanking = await rankingsAPI.getRankingForTeam(year, rankingType, team);
    strengthRankingsForScheduledTeams.push(teamRanking);
  }

  let totalStrength = 0;

  for (const rank of strengthRankingsForScheduledTeams) {
    totalStrength += getRankingGrade(rank);
  }

  return totalStrength ? totalStrength / NUMBER_OF_TEAMS : 0;
};

const getOppositionPositionGrade = async (team, position, year) => {
  switch (position) {
    case Positions.WR:
    case Positions.TE:
      return flipGrade(await getPositionGrade(RankingType.secondary, team, year));
    case Positions.HB:
    case Positions.FB:
    case Positions.QB:
      return flipGrade(await getPositionGrade(RankingType.dLine, team, year));
    default:
      return 0;
  };
};

const getTeamPositionGrade = async (team, position, year) => {
  switch (position) {
    case Positions.HB:
    case Positions.FB:
    case Positions.QB:
      return await getPositionGrade(RankingType.oLine, team, year);
    default:
      return 1;
  };
};

const getMetricGrade = (playerVariable, maxMetric) => {
  return playerVariable / maxMetric;
};

const calcGrade = (grades, weights) => {
  const gradeKeys = Object.keys(grades);

  if(gradeKeys.length !== Object.keys(weights).length){
    throw new Error('grades and weights do not match');
  }

  let grade = 0;

  for(let i = 0;i < gradeKeys.length;i++) {
    grade += grades[gradeKeys[i]]*weights[gradeKeys[i]];
  };

  return grade;
};

const calculatePlayerGrade = async (player, weights, year = CURRENT_YEAR) => {
  const yearsToSubtract = CURRENT_YEAR - year;
  const teamRankings = await rankingsAPI.getRankingsForTeam(year, player.team);
  const playerAgeGrade = getMetricGrade(player.age - yearsToSubtract, MAX_AGE);
  const playerHeightGrade = getMetricGrade(player.height, MAX_HEIGHT);
  const playerWeightGrade = getMetricGrade(player.weight, MAX_WEIGHT);
  const playerExperienceGrade = getMetricGrade(player.experience - yearsToSubtract, MAX_EXP);
  const playerRatingGrade = getRatingGrade(player.rating);
  const oppositionPositionGrade = await getOppositionPositionGrade(player.team, player.position, year);
  const teamPositionGrade = await getTeamPositionGrade(player.team, player.position, year);
  const { rank: teamPowerRanking } = teamRankings.find(ranking => ranking.rankingType === RankingType.powerRanking);

  const grades = {
    age: playerAgeGrade,
    height: playerHeightGrade,
    weight: playerWeightGrade,
    experience: playerExperienceGrade,
    rating: playerRatingGrade,
    powerRanking: teamPowerRanking,
    oppositionPosition: oppositionPositionGrade,
    teamPosition: teamPositionGrade,
  };

  return calcGrade(grades, weights);
};

const calculateTeamGrade = async (team, weights, year) => {
  const teamRankings = await rankingsAPI.getRankingsForTeam(year, team);
  const { rank: teamPowerRanking } = teamRankings.find(ranking => ranking.rankingType === RankingType.powerRanking);
  const { rank: teamStrengthOfScheduleRanking } = teamRankings.find(ranking => ranking.rankingType === RankingType.strengthOfSchedule);

  const playerTeamPowerRankingGrade = getRankingGrade(teamPowerRanking);
  const playerTeamStrengthOfScheduleGrade = getRankingGrade(teamStrengthOfScheduleRanking);
  // const oppositionPositionGrade = await getOppositionPositionGrade(team, position, year);
  // const teamPositionGrade = await getTeamPositionGrade(team, position, year);

  const grades = {
    powerRanking: playerTeamPowerRankingGrade,
    strengthOfSchedule: playerTeamStrengthOfScheduleGrade,
    // teamPosition: teamPositionGrade,
    // oppositionPosition: oppositionPositionGrade,
  };

  return calcGrade(grades, weights);
};

module.exports = {
  calculatePlayerGrade,
  calculateTeamGrade,
};
