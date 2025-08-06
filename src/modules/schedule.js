const scheduleRepository = require('../repositories/schedule');
const syncRepository = require('../repositories/sync');
const readCSVFile = require('../helpers/readCSVFile');
const { FILES, SyncDataNames } = require('../helpers/enums');

const CURRENT_YEAR = 2025;

const getSchedule = async (year) => {
  const schedule = await scheduleRepository.getSchedule(year);

  return schedule;
}

const getTeamsSchedule = async (team, year) => {
  const schedule = await scheduleRepository.getTeamsSchedule(team, year);

  return schedule;
};

const getTeamsInSchedule = async (team, year) => {
  const schedule = await getTeamsSchedule(team, year ?? CURRENT_YEAR);

  return schedule.map(game => game.home === team ? game.away : game.home);
};

const insertSchedules = async () => {
  const haveSynced = await syncRepository.getSyncStatus(SyncDataNames.schedules);
  if (haveSynced) {
    console.log('Schedule already synced.');
    return;
  };
  const files = [ FILES.DATA.SCHEDULE_2025 ];

  for (const file of files) {
    const schedule = readCSVFile(file);

    const result =  await scheduleRepository.insertSchedule(schedule);

    if (result) {
    await syncRepository.updateSyncStatus(SyncDataNames.schedules, true);
      console.log(`Successfully inserted schedule: ${file}`);
    }
    else {
      console.log(`Failed to insert schedule: ${file}`);
    }
  }
};

module.exports = {
  getSchedule,
  insertSchedules,
  getTeamsSchedule,
  getTeamsInSchedule,
};
