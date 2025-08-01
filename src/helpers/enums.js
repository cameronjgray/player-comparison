const FILES = {
  DATA: {
    TEAMS: './setup/data/teams.csv',
    PLAYERS: './setup/data/players.csv',
    SCHEDULE_2025: './setup/data/schedule_2025.csv',
    RANKINGS: './setup/data/rankings.csv',
  },
};

const RankingType = {
  powerRanking: 'Power Ranking',
  strengthOfSchedule: 'Strength of Schedule',
  oLine: 'OLine Ranking',
  dLine: 'DLine Ranking',
  secondary: 'Secondary Ranking',
};

const SyncDataNames = {
  teams: 'teams',
  schedules: 'schedules',
  rankings: 'rankings',
  players: 'players',
};

module.exports = { FILES, RankingType, SyncDataNames };
