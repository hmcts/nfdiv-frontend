import { Checkbox } from '../case/case';
import { DivorceOrDissolution, JurisdictionConnections, YesOrNo } from '../case/definition';

import { addConnection } from './connections';

describe('connections', () => {
  test(
    'Given both applicant 1 and applicant 2 are both habitually resident, ' + 'should find connection A',
    async () => {
      const body = { yourLifeBasedInEnglandAndWales: YesOrNo.YES, partnersLifeBasedInEnglandAndWales: YesOrNo.YES };

      const connectionAdded = addConnection(body);
      expect(connectionAdded).toEqual([JurisdictionConnections.APP_1_APP_2_RESIDENT]);
    }
  );

  test(
    'Given applicant 1 and applicant 2 are both last habitually resident, ' + 'should find connection B',
    async () => {
      const body = { lastHabituallyResident: YesOrNo.YES };

      const connectionAdded = addConnection(body);
      expect(connectionAdded).toEqual([JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT]);
    }
  );

  test('Given only applicant 2 is habitually resident, should find connection C', async () => {
    const body = { yourLifeBasedInEnglandAndWales: YesOrNo.NO, partnersLifeBasedInEnglandAndWales: YesOrNo.YES };

    const connectionAdded = addConnection(body);
    expect(connectionAdded).toEqual([JurisdictionConnections.APP_2_RESIDENT]);
  });

  test(
    'Given only applicant 1 is habitually resident, and has been for the last 12 months, ' + 'should find connection D',
    async () => {
      const body = {
        yourLifeBasedInEnglandAndWales: YesOrNo.YES,
        partnersLifeBasedInEnglandAndWales: YesOrNo.NO,
        livingInEnglandWalesTwelveMonths: YesOrNo.YES,
      };

      const connectionAdded = addConnection(body);
      expect(connectionAdded).toEqual([JurisdictionConnections.APP_1_RESIDENT_TWELVE_MONTHS]);
    }
  );

  test(
    'Given only applicant 1 is habitually resident and domiciled, and has been for the last 6 months, ' +
      'should find connection E',
    async () => {
      const body = {
        yourLifeBasedInEnglandAndWales: YesOrNo.YES,
        partnersLifeBasedInEnglandAndWales: YesOrNo.NO,
        livingInEnglandWalesSixMonths: YesOrNo.YES,
        yourDomicileInEnglandWales: YesOrNo.YES,
        partnersDomicileInEnglandWales: YesOrNo.NO,
      };

      const connectionAdded = addConnection(body);
      expect(connectionAdded).toEqual([
        JurisdictionConnections.APP_1_RESIDENT_SIX_MONTHS,
        JurisdictionConnections.APP_1_DOMICILED,
      ]);
    }
  );

  test('Given both applicant 1 and applicant 2 are both domiciled, should find connection F', async () => {
    const body = { yourDomicileInEnglandWales: YesOrNo.YES, partnersDomicileInEnglandWales: YesOrNo.YES };

    const connectionAdded = addConnection(body);
    expect(connectionAdded).toEqual([JurisdictionConnections.APP_1_APP_2_DOMICILED]);
  });

  test.each([
    {
      sameSex: Checkbox.Checked,
      partnersLifeBasedInEnglandAndWales: YesOrNo.NO,
      yourDomicileInEnglandWales: YesOrNo.NO,
      partnersDomicileInEnglandWales: YesOrNo.NO,
      jurisdictionResidualEligible: YesOrNo.YES,
      lastHabituallyResident: YesOrNo.NO,
    },
    {
      divorceOrDissolution: DivorceOrDissolution.DISSOLUTION,
      yourLifeBasedInEnglandAndWales: YesOrNo.YES,
      partnersLifeBasedInEnglandAndWales: YesOrNo.NO,
      yourDomicileInEnglandWales: YesOrNo.NO,
      partnersDomicileInEnglandWales: YesOrNo.NO,
      jurisdictionResidualEligible: YesOrNo.YES,
      lastHabituallyResident: YesOrNo.NO,
    },
  ])('Given there is residual jurisdiction, should find connection G', async body => {
    const connectionAdded = addConnection(body);
    expect(connectionAdded).toEqual([JurisdictionConnections.RESIDUAL_JURISDICTION]);
  });

  test('Given applicant 1 is domiciled, should find connection H', async () => {
    const body = { yourDomicileInEnglandWales: YesOrNo.YES };

    const connectionAdded = addConnection(body);
    expect(connectionAdded).toEqual([JurisdictionConnections.APP_1_DOMICILED]);
  });

  test('Given applicant 2 is domiciled, should find connection I', async () => {
    const body = { partnersDomicileInEnglandWales: YesOrNo.YES };

    const connectionAdded = addConnection(body);
    expect(connectionAdded).toEqual([JurisdictionConnections.APP_2_DOMICILED]);
  });

  test('Given both were last habitually resident in England or Wales and applicant 2 is domiciled, should find connection B and I', async () => {
    const body = { lastHabituallyResident: YesOrNo.YES, partnersDomicileInEnglandWales: YesOrNo.YES };

    const connectionAdded = addConnection(body);
    expect(connectionAdded).toEqual([
      JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT,
      JurisdictionConnections.APP_2_DOMICILED,
    ]);
  });
});
