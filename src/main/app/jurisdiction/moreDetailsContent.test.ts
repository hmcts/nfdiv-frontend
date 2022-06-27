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

  test('Given only habitual residence connection made should only return habitual residence text (Welsh)', async () => {
    const expectedText = [
      {
        heading: '',
        body: cyHabitualResident.body,
      },
    ];
    const expectedTitle = 'Darllenwch fwy am preswylio’n arferol';

    const result = jurisdictionMoreDetailsContent(
      [JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT],
      false,
      true,
      'wife',
      false
    );
    expect(result.text).toEqual(expectedText);
    expect(result.title).toEqual(expectedTitle);
  });

  test('Partner and divorce / civil partnership should interpolate enResidual correctly', async () => {
    const expectedText = [
      {
        heading: '',
        body: enResidual(false, 'wife').body,
      },
    ];
    const expectedTitle = 'Read more about residual jurisdiction';

    const result = jurisdictionMoreDetailsContent(
      [JurisdictionConnections.RESIDUAL_JURISDICTION_CP],
      true,
      false,
      'wife',
      false
    );
    expect(result.text).toEqual(expectedText);
    expect(result.title).toEqual(expectedTitle);
  });

  test('Given showAllResidences is true and language is welsh should return all 3 connection content', async () => {
    const expectedText = [
      {
        heading: 'Preswylio’n arferol',
        body: cyHabitualResident.body,
      },
      {
        heading: 'Domisil',
        body: cyDomicile.body,
      },
      {
        heading: 'Awdurdodaeth weddillol',
        body: cyResidual(true, 'wife').body,
      },
    ];

    const expectedTitle = 'Darllenwch fwy am eich cysylltiadau';

    const result = jurisdictionMoreDetailsContent(
      [JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT],
      false,
      true,
      'wife',
      true
    );
    expect(result.text).toEqual(expectedText);
    expect(result.title).toEqual(expectedTitle);
  });
});
