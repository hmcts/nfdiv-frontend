import { JurisdictionConnections } from '../case/definition';

import {
  connectionBulletPointsTextForRespondent,
  connectionBulletPointsTextForSoleAndJoint,
} from './bulletedPointsContent';

describe('connectionBulletPointsTextForSoleAndJoint', () => {
  test('Given both applicant 1 and applicant 2 are both habitually resident, should find connection A', async () => {
    const expected =
      'Your answers indicate that you can apply in England and Wales because:<ul><li>you and your goldfish were both last habitually resident and one of you still lives here</li></ul>';
    const result = connectionBulletPointsTextForSoleAndJoint(
      [JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT],
      'goldfish',
      true
    );
    expect(result).toEqual(expected);
  });

  test('Given both applicant 1 and applicant 2 are both habitually resident, should find connection A for civil partnership', async () => {
    const expected =
      'Your answers indicate that you can apply in England and Wales because:<ul><li>you and your goldfish were both last habitually resident and one of you still lives here</li></ul>';
    const result = connectionBulletPointsTextForSoleAndJoint(
      [JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT],
      'goldfish',
      false
    );
    expect(result).toEqual(expected);
  });

  test('Given both applicant 1 and applicant 2 are both habitually resident, should find connection A for respond', async () => {
    const expected = [
      'the applicant and respondent were last habitually resident in England and Wales and one of them still resides there',
    ];
    const result = connectionBulletPointsTextForRespondent([JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT]);
    expect(result).toEqual(expected);
  });
});
