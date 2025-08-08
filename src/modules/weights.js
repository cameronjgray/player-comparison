const weightRepository = require('../repositories/weights');
const { FILES, SyncDataNames } = require('../helpers/enums');

const getWeights = async () => {
  const weights = await weightRepository.getWeights();
  const titles = `${Object.keys(JSON.parse(weights[0].weights)).join(",")},score\n`;
  const weightsCSV = weights.map(weight =>
    `${Object.values(JSON.parse(weight.weights)).join(",")},${weight.score}`).join('\n');

  return titles + weightsCSV;
}

const insertWeight = async (weights, score) => {
  const stringifiedWeights = JSON.stringify(weights);
  const result =  await weightRepository.insertWeight(stringifiedWeights, score);

  if (result) {
    console.log(`Successfully inserted weights: ${stringifiedWeights} with score ${score}`);
  }
  else {
    console.log(`Failed to insert weights: ${stringifiedWeights} with score ${score}`);
  }
};

module.exports = {
  getWeights,
  insertWeight,
};
