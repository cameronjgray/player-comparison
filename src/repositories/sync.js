const query = require('../services/query');

const TABLE = 'sync';

const getSyncStatus = async (syncDataName) => {
  const result = await query(
    `SELECT "hasSynced" FROM ${TABLE} WHERE "dataName" = '${syncDataName}';`
  );

  return result?.rows[0]?.hasSynced ?? false;
};

const updateSyncStatus = async (syncDataName, status) => {
  const result = query(
    `UPDATE ${TABLE} SET "hasSynced" = '${status}'
    WHERE "dataName" = '${syncDataName}';`
  );

  return result?.rowCount === 1;
};

module.exports = { updateSyncStatus, getSyncStatus };
