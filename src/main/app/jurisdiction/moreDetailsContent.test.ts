import { JurisdictionConnections } from '../case/definition';

import {
  cyDomicile,
  cyHabitualResident,
  cyResidual,
  enDomicile,
  enHabitualResident,
  enResidual,
  jurisdictionMoreDetailsContent,
} from './moreDetailsContent';

describe('jurisdictionMoreDetailsContent', () => {
  test('Given showAllResidences is true should return all 3 connection content', async () => {
    const expectedText =
      '<strong>Habitual residence</strong><br>' +
      enHabitualResident +
      '<br><br><strong>Domicile</strong><br>' +
      enDomicile +
      '<br><br><strong>Residual jurisdiction</strong><br>' +
      enResidual(true);

    const expectedTitle = 'Read more about your connections';

    const result = jurisdictionMoreDetailsContent(
      [JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT],
      true,
      true,
      true
    );
    expect(result.text).toEqual(expectedText);
    expect(result.title).toEqual(expectedTitle);
  });

  test('Given only domicile connection made should only return domicile text', async () => {
    const expectedText = enDomicile;
    const expectedTitle = 'Read more about domicile';

    const result = jurisdictionMoreDetailsContent([JurisdictionConnections.APP_1_APP_2_DOMICILED], true, false);
    expect(result.text).toEqual(expectedText);
    expect(result.title).toEqual(expectedTitle);
  });

  test('Given showAllResidences is true and language is welsh should return all 3 connection content', async () => {
    const expectedText =
      '<strong>Preswylio’n arferol</strong><br>' +
      cyHabitualResident +
      '<br><br><strong>Domisil</strong><br>' +
      cyDomicile +
      '<br><br><strong>Awdurdodaeth weddillol</strong><br>' +
      cyResidual(true);

    const result = jurisdictionMoreDetailsContent(
      [JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT],
      false,
      true,
      true
    );
    expect(result.text).toEqual(expectedText);
  });
});
