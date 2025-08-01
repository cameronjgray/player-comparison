const scheduleRepository = require('../repositories/schedule');
const syncRepository = require('../repositories/sync');
const readCSVFile = require('../helpers/readCSVFile');
const { FILES, SyncDataNames } = require('../helpers/enums');

const getSchedule = async (year) => {
  const schedule = scheduleRepository.getSchedule(year);

  return schedule;
}

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

module.exports = { getSchedule, insertSchedules };
