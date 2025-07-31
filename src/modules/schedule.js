const scheduleRepository = require('../repositories/schedule');
const readCSVFile = require('../helpers/readCSVFile');
const { FILES } = require('../helpers/enums');

const getSchedule = async (year) => {
  const schedule = scheduleRepository.getSchedule(year);

  return schedule;
}

const insertSchedules = async () => {
  const files = [ FILES.DATA.SCHEDULE_2025 ];

  for (const file of files) {
    const schedule = readCSVFile(file);

    const result =  await scheduleRepository.insertSchedule(schedule);

    if (result) {
      console.log(`Successfully inserted schedule: ${file}`);
    }
    else {
      console.log(`Failed to insert schedule: ${file}`);
    }
  }
};

module.exports = { getSchedule, insertSchedules };
