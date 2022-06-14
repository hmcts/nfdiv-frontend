import { JurisdictionConnections } from '../case/definition';

import {
  connectionBulletPointsUserReads,
  cyConnectionBulletPointsSummarisedForAllUsers,
  cyConnectionUserReads,
  enConnectionBulletPointsSummarisedForAllUsers,
  enConnectionUserReads,
} from './bulletedPointsContent';

describe('jurisdictionBulletPointContent', () => {
  test('Given both applicant 1 and applicant 2 are both habitually resident, should find connection B for bullet point summarised for all users for divorce in English', async () => {
    const expected = [
      'both parties to the marriage were last habitually resident in England and Wales and one of them continues to reside there',
    ];
    const result = enConnectionBulletPointsSummarisedForAllUsers(
      [JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT],
      true,
      true
    );
    expect(result).toEqual(expected);
  });

  test('Given both applicant 1 and applicant 2 are both habitually resident, should find connection B for bullet point summarised for all users for civil partnership in English', async () => {
    const expected = [
      'both parties to the civil partnership were last habitually resident in England and Wales and one of them continues to reside there',
    ];
    const result = enConnectionBulletPointsSummarisedForAllUsers(
      [JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT],
      false,
      false
    );
    expect(result).toEqual(expected);
  });

  test('Given both applicant 1 and applicant 2 are both habitually resident, should find connection B for bullet point summarised for all users for divorce in Welsh', async () => {
    const expected = [
      'roedd y ddau barti i’r briodas yn preswylio’n arferol ddiwethaf yng Nghymru a Lloegr, ac mae un ohonynt yn parhau i fyw yno',
    ];
    const result = cyConnectionBulletPointsSummarisedForAllUsers(
      [JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT],
      true,
      true
    );
    expect(result).toEqual(expected);
  });

  test('Given both applicant 1 and applicant 2 are both habitually resident, should find connection B for bullet point summarised for all users for civil partnership in Welsh', async () => {
    const expected = [
      'roedd y ddau barti i’r bartneriaeth sifil yn preswylio’n arferol ddiwethaf yng Nghymru a Lloegr, ac mae un ohonynt yn parhau i fyw yno',
    ];
    const result = cyConnectionBulletPointsSummarisedForAllUsers(
      [JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT],
      false,
      false
    );
    expect(result).toEqual(expected);
  });

  test('Given both applicant 1 and applicant 2 are both habitually resident, should find connection A for bullet point user reads', async () => {
    const expected =
      '<ul class="govuk-list govuk-list--bullet"><li>you and your husband are habitually resident in England and Wales</li></ul>';
    const result = connectionBulletPointsUserReads(
      [JurisdictionConnections.APP_1_APP_2_RESIDENT],
      'husband',
      true,
      true,
      true
    );
    expect(result).toEqual(expected);
  });

  test('Given only applicant 2 are both habitually resident, should find connection C for user reads for marriage in English', async () => {
    const expected = 'your husband is habitually resident in England and Wales';
    const result = enConnectionUserReads('husband', true, false)[JurisdictionConnections.APP_2_RESIDENT_SOLE];
    expect(result).toEqual(expected);
  });

  test('Given only residual jurisdiction connection, should find connection C for user reads for civil partnership in English', async () => {
    const expected =
      'you and your civil partner registered your civil partnership in England and Wales and it would be in the interests of justice for the court to assume jurisdiction in this case';
    const result = enConnectionUserReads('husband', false, false)[JurisdictionConnections.RESIDUAL_JURISDICTION_CP];
    expect(result).toEqual(expected);
  });

  test('Given only applicant 2 are both habitually resident, should find connection C for user reads for marriage in Welsh', async () => {
    const expected = 'mae eich gŵr yn preswylio’n arferol yng Nghymru a Lloegr';
    const result = cyConnectionUserReads('gŵr', true, false)[JurisdictionConnections.APP_2_RESIDENT_SOLE];
    expect(result).toEqual(expected);
  });

  test('Given only residual jurisdiction connection, should find connection C for user reads for civil partnership in Welsh', async () => {
    const expected =
      "mi wnaethoch chi a’ch partner sifil gofrestru eich partneriaeth sifil yng Nghymru a Lloegr, a byddai er budd cyfiawnder i'r llys ysgwyddo awdurdodaeth yn yr achos hwn";
    const result = cyConnectionUserReads('gŵr', false, false)[JurisdictionConnections.RESIDUAL_JURISDICTION_CP];
    expect(result).toEqual(expected);
  });
});
