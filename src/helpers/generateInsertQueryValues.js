const generateInsertQueryValues = (columns) => {
  if(!columns || !columns.length) {
    return '';
  };

  let queryValues = '';
  let j = 0;
  const columnLength = columns[0].length;
  for (let i = 0; i < columns.length; i++ ) {
    queryValues += `${j===0 ? '' : ','} (${
      columns[0].map((_, index) => `$${j+index+1}`)
    })`;
    j+=columnLength;
  };

  return queryValues;
};

module.exports = generateInsertQueryValues;
