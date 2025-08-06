const rankingsAPI = require('./rankings');
const scheduleAPI = require('./schedule');
const { RankingType, Positions } = require('../helpers/enums');

const NUMBER_OF_TEAMS = 32;
const HIGHEST_RANKING = 99;

const getRankingGrade = (rank) => 1 - (rank / NUMBER_OF_TEAMS);

const getRatingGrade = (rank) => 1 - (rank / HIGHEST_RANKING);

const getPositionGrade = async (rankingType, team) => {
  const teamsInSchedule = await scheduleAPI.getTeamsInSchedule(team);
  console.log(teamsInSchedule);
  const strengthRankingsForScheduledTeams = [];
  let totalStrength = 0;

  for (const rank of strengthRankingsForScheduledTeams) {
    totalStrength += getRankingGrade(rank);
  }

  return totalStrength ? totalStrength / NUMBER_OF_TEAMS : 0;
};

const getOppositionPositionGrades = async (team, position) => {
  switch (position) {
    case Positions.WR:
    case Positions.TE:
      const oppositionPositions = [RankingType.secondary];
      await getPositionGrade(RankingType.secondary, team);
      return [];
    case Positions.HB:
    case Positions.FB:
    case Positions.QB:
      // const oppositionPositions = [RankingType.dLine];
      return [];
    default:
      return [];
  };
};

const getOppositionPositionWeights = (team, position) => {
  switch (position) {
    case Positions.WR:
      return [];
    case Positions.HB:
    case Positions.FB:
      return [];
    case Positions.TE:
      return [];
    case Positions.QB:
      return [];
    default:
      return [];
  };
};

const getTeamPositionGrades = (team, position) => {
  switch (position) {
    case Positions.HB:
    case Positions.FB:
    case Positions.QB:
      const oppositionPositions = [RankingType.dLine];
      return [];
    default:
      return [];
  };
};

const getTeamPositionWeights = (team, position) => {
  switch (position) {
    case Positions.HB:
    case Positions.FB:
    case Positions.QB:
      const oppositionPositions = [RankingType.dLine];
      return [];
    default:
      return [];
  };
};

const calculatePlayerGrade = async (player) => {
  const teamRankings = await rankingsAPI.getRankingsForTeam(2025, player.team);
  const { rank: teamPowerRanking } = teamRankings.find(ranking => ranking.rankingType === RankingType.powerRanking);
  const { rank: teamStrengthOfScheduleRanking } = teamRankings.find(ranking => ranking.rankingType === RankingType.strengthOfSchedule);
  const playerTeamPowerRankingGrade = getRankingGrade(teamPowerRanking);
  const playerTeamPowerRankingWeight = 0.2; // these need to adapt based off of the position weights perhaps as a percentage of what's left

  const playerTeamStrengthOfScheduleGrade = getRankingGrade(teamStrengthOfScheduleRanking);
  const playerTeamStrengthOfScheduleWeight = 0.2;// these need to adapt based off of the position weights

  const oppositionPositionGrades = await getOppositionPositionGrades(player.team, player.position);
  const oppositionPositionWeights = await getOppositionPositionWeights(player.team, player.position);

  const playerRatingGrade = getRatingGrade(player.rating);
  const playerRatingWeight = 0;

  const grades = [
    playerTeamPowerRankingGrade,
    playerTeamStrengthOfScheduleGrade,
    ...oppositionPositionGrades,
    playerRatingGrade,
  ];

  const weights = [
    playerTeamPowerRankingWeight,
    playerTeamStrengthOfScheduleWeight,
    ...oppositionPositionWeights,
    playerRatingWeight,
  ];

  if(grades.length !== weights.length){
    throw new Error('grades and weights do not match');
  }

  let grade = 0;

  for(let i = 0;i < grades.length;i++) {
    grade += grades[i]*weights[i];
  };

  return grade;
};

module.exports = { calculatePlayerGrade };
