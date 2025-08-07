const weightRepository = require('../repositories/weights');
const { FILES, SyncDataNames } = require('../helpers/enums');

const getWeights = async () => {
  const weights = await weightRepository.getWeights();

  return weights;
}

const insertWeight = async (weights, score) => {
  const result =  await weightRepository.insertWeight(weights, score);

  if (result) {
    console.log(`Successfully inserted weights: ${weights} with score ${score}`);
  }
  else {
    console.log(`Failed to insert weights: ${weights} with score ${score}`);
  }
};

module.exports = {
  getWeights,
  insertWeight,
};
