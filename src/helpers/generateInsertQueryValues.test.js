const generateInsertQueryValues = require('./generateInsertQueryValues');

describe('generateInsertQueryValues', () => {
  const cases = [
    [ ' ($1,$2), ($3,$4), ($5,$6), ($7,$8), ($9,$10)', [
      ['Minnesota Vikings', 'MIN'],
      ['Green Bay Packers', 'GB'],
      ['Tampa Bay Buccaneers', 'TB'],
      ['Atlanta Falcons', 'ATL'],
      ['New York Jets', 'NYJ'],
    ]],
    [ ' ($1,$2)', [
      ['Minnesota Vikings', 'MIN'],
    ]],
    [ '', []],
    [ '', undefined],
  ];
  it.each(cases)('should return the expected string: "%s"', (expectedString, columns) => {
    const actual = generateInsertQueryValues(columns);
    expect(actual).toStrictEqual(expectedString);
  });
});
