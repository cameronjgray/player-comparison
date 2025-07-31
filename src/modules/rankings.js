const rankingsRepository = require('../repositories/rankings');
const readCSVFile = require('../helpers/readCSVFile');
const { FILES } = require('../helpers/enums');

const getRanking = async (year, rankingType) => {
  const ranking = rankingsRepository.getRanking(year, rankingType);

  return ranking;
}

const insertRankings = async () => {
  const rankings = readCSVFile(FILES.DATA.RANKINGS);

  const result =  await rankingsRepository.insertRankings(rankings);

  if (result) {
    console.log('Successfully inserted rankings.');
  }
  else {
    console.log('Failed to insert rankings.');
  }
};

module.exports = { getRanking, insertRankings };
