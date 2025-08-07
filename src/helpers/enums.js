const FILES = {
  DATA: {
    TEAMS: './setup/data/teams.csv',
    PLAYERS: './setup/data/players.csv',
    SCHEDULE_2025: './setup/data/schedule_2025.csv',
    RANKINGS: './setup/data/rankings.csv',
    FANTASY_POINTS_2024: './setup/data/fantasy-players_2024.csv',
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

const Positions = {
 S: 'S',
 FB: 'FB',
 HB: 'HB',
 QB: 'QB',
 P: 'P',
 C: 'C',
 LS: 'LS',
 WR: 'WR',
 DE: 'DE',
 CB: 'CB',
 DT: 'DT',
 T: 'T',
 K: 'K',
 TE: 'TE',
 LB: 'LB',
  G: 'G',
};

module.exports = {
  FILES,
  RankingType,
  SyncDataNames,
  Positions,
};
