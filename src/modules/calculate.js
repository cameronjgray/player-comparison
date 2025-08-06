const rankingsAPI = require('./rankings');
const scheduleAPI = require('./schedule');
const { RankingType, Positions } = require('../helpers/enums');

const NUMBER_OF_TEAMS = 32;
const HIGHEST_RANKING = 99;
const YEAR = 2025;

const getRankingGrade = (rank) => 1 - (rank / NUMBER_OF_TEAMS);

const getRatingGrade = (rank) => (rank / HIGHEST_RANKING);

const flipGrade = (grade) => 1 - grade;

const getPositionGrade = async (rankingType, team) => {
  const teamsInSchedule = await scheduleAPI.getTeamsInSchedule(team);
  const strengthRankingsForScheduledTeams = [];

  for (const team of teamsInSchedule) {
    const teamRanking = await rankingsAPI.getRankingForTeam(YEAR, rankingType, team);
    strengthRankingsForScheduledTeams.push(teamRanking);
  }

  let totalStrength = 0;

  for (const rank of strengthRankingsForScheduledTeams) {
    totalStrength += getRankingGrade(rank);
  }

  return totalStrength ? totalStrength / NUMBER_OF_TEAMS : 0;
};

const getOppositionPositionGrade = async (team, position) => {
  switch (position) {
    case Positions.WR:
    case Positions.TE:
      return flipGrade(await getPositionGrade(RankingType.secondary, team));
    case Positions.HB:
    case Positions.FB:
    case Positions.QB:
      return flipGrade(await getPositionGrade(RankingType.dLine, team));
    default:
      return 1;
  };
};

const getTeamPositionGrade = async (team, position) => {
  switch (position) {
    case Positions.HB:
    case Positions.FB:
    case Positions.QB:
      return await getPositionGrade(RankingType.oLine, team);
    default:
      return 1;
  };
};

const calculatePlayerGrade = async (player, weights) => {
  const teamRankings = await rankingsAPI.getRankingsForTeam(YEAR, player.team);
  const { rank: teamPowerRanking } = teamRankings.find(ranking => ranking.rankingType === RankingType.powerRanking);
  const { rank: teamStrengthOfScheduleRanking } = teamRankings.find(ranking => ranking.rankingType === RankingType.strengthOfSchedule);

  const playerTeamPowerRankingGrade = getRankingGrade(teamPowerRanking);
  const playerTeamStrengthOfScheduleGrade = getRankingGrade(teamStrengthOfScheduleRanking);
  const oppositionPositionGrade = await getOppositionPositionGrade(player.team, player.position);
  const teamPositionGrade = await getTeamPositionGrade(player.team, player.position);
  const playerRatingGrade = getRatingGrade(player.rating);

  const grades = [
    playerTeamPowerRankingGrade,
    playerTeamStrengthOfScheduleGrade,
    teamPositionGrade,
    oppositionPositionGrade,
    playerRatingGrade,
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
