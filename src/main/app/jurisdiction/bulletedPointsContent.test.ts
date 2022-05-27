import { JurisdictionConnections } from '../case/definition';

import {
  connectionBulletPointsSummarisedForAllUsers,
  enConnectionBulletPointsUserReads,
  enConnectionUserReads,
} from './bulletedPointsContent';

describe('jurisdictionBulletPointContent', () => {
  test('Given both applicant 1 and applicant 2 are both habitually resident, should find connection B for bullet point summarised for all users for divorce', async () => {
    const expected = [
      'both parties to the marriage were last habitually resident in England and Wales and one of them continues to reside there',
    ];
    const result = connectionBulletPointsSummarisedForAllUsers(
      [JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT],
      'en',
      true,
      true
    );
    expect(result).toEqual(expected);
  });

  test('Given both applicant 1 and applicant 2 are both habitually resident, should find connection B for bullet point summarised for all users for civil partnership', async () => {
    const expected = [
      'both parties to the civil partnership were last habitually resident in England and Wales and one of them continues to reside there',
    ];
    const result = connectionBulletPointsSummarisedForAllUsers(
      [JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT],
      'en',
      false,
      false
    );
    expect(result).toEqual(expected);
  });

  test('Given both applicant 1 and applicant 2 are both habitually resident, should find connection B for bullet point summarised for all users for divorce and in welsh', async () => {
    const expected = [
      'roedd y ddau barti i’r briodas yn preswylio’n arferol ddiwethaf yng Nghymru a Lloegr ac mae un ohonynt yn parhau i breswylio yno',
    ];
    const result = connectionBulletPointsSummarisedForAllUsers(
      [JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT],
      'cy',
      true,
      true
    );
    expect(result).toEqual(expected);
  });

  test('Given both applicant 1 and applicant 2 are both habitually resident, should find connection B for bullet point summarised for all users for civil partnership in welsh', async () => {
    const expected = [
      'roedd y ddau barti i’r bartneriaeth sifil yn preswylio’n arferol ddiwethaf yng Nghymru a Lloegr ac mae un ohonynt yn parhau i breswylio yno',
    ];
    const result = connectionBulletPointsSummarisedForAllUsers(
      [JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT],
      'cy',
      false,
      false
    );
    expect(result).toEqual(expected);
  });

  test('Given both applicant 1 and applicant 2 are both habitually resident, should find connection A for bullet point user reads', async () => {
    const expected =
      '<ul class="govuk-list govuk-list--bullet"><li>you and your husband are habitually resident in England and Wales</li></ul>';
    const result = enConnectionBulletPointsUserReads(
      [JurisdictionConnections.APP_1_APP_2_RESIDENT],
      'husband',
      true,
      true
    );
    expect(result).toEqual(expected);
  });

  test('Given only applicant 2 are both habitually resident, should find connection C for user reads for marriage', async () => {
    const expected = 'your husband is habitually resident in England and Wales';
    const result = enConnectionUserReads('husband', true, false)[JurisdictionConnections.APP_2_RESIDENT_SOLE];
    expect(result).toEqual(expected);
  });

  test('Given only residual jurisdiction connection, should find connection C for user reads for civil partnership', async () => {
    const expected =
      'you and your civil partner registered your civil partnership in England and Wales and it would be in the interests of justice for the court to assume jurisdiction in this case';
    const result = enConnectionUserReads('husband', false, false)[JurisdictionConnections.RESIDUAL_JURISDICTION_CP];
    expect(result).toEqual(expected);
  });
});
