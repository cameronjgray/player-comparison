const fs = require('fs');

const readCSVFile = (filename) => {
  const fileContents = fs.readFileSync(filename).toString();
  const contents = fileContents.split('\n').map(row => row.split(','));
  contents.pop();
  return contents;
}

module.exports = readCSVFile;
