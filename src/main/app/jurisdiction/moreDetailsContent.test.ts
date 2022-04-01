import { JurisdictionConnections } from '../case/definition';

import { enDomicile, enHabitualResident, enResidual, jurisdictionMoreDetailsContent } from './moreDetailsContent';

describe('jurisdictionMoreDetailsContent', () => {
  test('Given showAllResidences is true should return all 3 connection content', async () => {
    const expectedHabitualText = { heading: 'Habitual residence', body: enHabitualResident };
    const expectedDomicileText = { heading: 'Domicile', body: enDomicile };
    const expectedResidualText = { heading: 'Residual jurisdiction', body: enResidual(true) };

    const expectedTitle = 'Read more about your connections';

    const result = jurisdictionMoreDetailsContent([JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT], true, true);
    expect(result.text).toContainEqual(expectedHabitualText);
    expect(result.text).toContainEqual(expectedDomicileText);
    expect(result.text).toContainEqual(expectedResidualText);
    expect(result.title).toEqual(expectedTitle);
  });

  test('Given only domicile connection made should only return domicile text', async () => {
    const expectedText = enDomicile;
    const expectedTitle = 'Read more about domicile';

    const result = jurisdictionMoreDetailsContent([JurisdictionConnections.APP_1_APP_2_DOMICILED], false);
    expect(result.text).toContainEqual(expectedText);
    expect(result.title).toEqual(expectedTitle);
  });
});
