import { covertToDateObject } from './parser';

describe('Parser', () => {
  test('Should covert object with different date properties to 1 property', async () => {
    const date = {
      'date-day': '1',
      'date-month': '1',
      'date-year': '1',
    };

    expect(covertToDateObject('date', date)).toStrictEqual({
      day: '1',
      month: '1',
      year: '1',
    });
  });
});
