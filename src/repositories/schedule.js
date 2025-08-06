const query = require('../services/query');
const generateInsertQueryValues = require('../helpers/generateInsertQueryValues');

const TABLE = 'schedule';

const getSchedule = async (year) => {
  const schedule = await query(
    `SELECT * FROM ${TABLE} WHERE year = ${year};`,
  );

  return schedule?.rows ?? [];
}

const getTeamsSchedule = async (team, year) => {
  const schedule = await query(
    `SELECT * FROM ${TABLE}
    WHERE year = ${year}
    AND (home = '${team}' OR away = '${team}')
    ;`,
  );

  return schedule?.rows ?? [];
}

const insertSchedule = async (schedule) => {
  if(!schedule || !schedule.length) {
    return false
  };

  const mapScheduleToQuery = generateInsertQueryValues(schedule);
  const scheduleValuesForQuery = schedule.flat();
  const queryString = `INSERT INTO ${TABLE} (away, home, week, year) VALUES ${mapScheduleToQuery};`;

  const result =  await query(queryString, scheduleValuesForQuery);

  return result?.rowCount === schedule.length;
}

module.exports = {
  getSchedule,
  insertSchedule,
  getTeamsSchedule,
};
