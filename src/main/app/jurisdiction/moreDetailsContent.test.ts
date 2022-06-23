import { JurisdictionConnections } from '../case/definition';

import { enDomicile, enHabitualResident, enResidual, jurisdictionMoreDetailsContent } from './moreDetailsContent';

describe('jurisdictionMoreDetailsContent', () => {
  test('Given showAllResidences is true should return all 3 connection content', async () => {
    const expectedText = [
      {
        heading: 'Habitual residence',
        body: enHabitualResident.body,
      },
      {
        heading: 'Domicile',
        body: enDomicile.body,
      },
      {
        heading: 'Residual jurisdiction',
        body: enResidual(true, 'husband').body,
      },
    ];

    const expectedTitle = 'Read more about your connections';
    const result = jurisdictionMoreDetailsContent(
      [JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT],
      true,
      true,
      'husband',
      true
    );
    expect(result.text).toEqual(expectedText);
    expect(result.title).toEqual(expectedTitle);
  });

  test('Given only domicile connection made should only return domicile text', async () => {
    const expectedText = [
      {
        heading: '',
        body: enDomicile.body,
      },
    ];
    const expectedTitle = 'Read more about domicile';

    const result = jurisdictionMoreDetailsContent(
      [JurisdictionConnections.APP_1_APP_2_DOMICILED],
      true,
      true,
      'wife',
      false
    );
    expect(result.text).toEqual(expectedText);
    expect(result.title).toEqual(expectedTitle);
  });
});
