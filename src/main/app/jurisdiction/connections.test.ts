import { Checkbox } from '../case/case';
import { DivorceOrDissolution, JurisdictionConnections, YesOrNo } from '../case/definition';

import { addConnection } from './connections';

describe('connections', () => {
  test('Given both petitioner and respondent are both habitually resident, ' + 'should find connection A', async () => {
    const body = { yourLifeBasedInEnglandAndWales: YesOrNo.YES, partnersLifeBasedInEnglandAndWales: YesOrNo.YES };

    const connectionAdded = addConnection(body);
    expect(connectionAdded).toEqual([JurisdictionConnections.PET_RESP_RESIDENT]);
  });

  test('Given petitioner and respondent are both last habitually resident, ' + 'should find connection B', async () => {
    const body = { lastHabituallyResident: YesOrNo.YES };

    const connectionAdded = addConnection(body);
    expect(connectionAdded).toEqual([JurisdictionConnections.PET_RESP_LAST_RESIDENT]);
  });

  test('Given only respondent is habitually resident, should find connection C', async () => {
    const body = { yourLifeBasedInEnglandAndWales: YesOrNo.NO, partnersLifeBasedInEnglandAndWales: YesOrNo.YES };

    const connectionAdded = addConnection(body);
    expect(connectionAdded).toEqual([JurisdictionConnections.RESP_RESIDENT]);
  });

  test(
    'Given only petitioner is habitually resident, and has been for the last 12 months, ' + 'should find connection D',
    async () => {
      const body = {
        yourLifeBasedInEnglandAndWales: YesOrNo.YES,
        partnersLifeBasedInEnglandAndWales: YesOrNo.NO,
        livingInEnglandWalesTwelveMonths: YesOrNo.YES,
      };

      const connectionAdded = addConnection(body);
      expect(connectionAdded).toEqual([JurisdictionConnections.PET_RESIDENT_TWELVE_MONTHS]);
    }
  );

  test(
    'Given only petitioner is habitually resident and domiciled, and has been for the last 6 months, ' +
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
      expect(connectionAdded).toEqual([JurisdictionConnections.PET_RESIDENT_SIX_MONTHS]);
    }
  );

  test('Given both petitioner and respondent are both domiciled, should find connection F', async () => {
    const body = { yourDomicileInEnglandWales: YesOrNo.YES, partnersDomicileInEnglandWales: YesOrNo.YES };

    const connectionAdded = addConnection(body);
    expect(connectionAdded).toEqual([JurisdictionConnections.PET_RESP_DOMICILED]);
  });

  test.each([
    {
      sameSex: Checkbox.Checked,
      partnersLifeBasedInEnglandAndWales: YesOrNo.NO,
      yourDomicileInEnglandWales: YesOrNo.NO,
      partnersDomicileInEnglandWales: YesOrNo.NO,
      jurisdictionResidualEligible: YesOrNo.YES,
    },
    {
      divorceOrDissolution: DivorceOrDissolution.DISSOLUTION,
      yourLifeBasedInEnglandAndWales: YesOrNo.YES,
      partnersLifeBasedInEnglandAndWales: YesOrNo.NO,
      yourDomicileInEnglandWales: YesOrNo.NO,
      partnersDomicileInEnglandWales: YesOrNo.NO,
      jurisdictionResidualEligible: YesOrNo.YES,
    },
  ])('Given there is residual jurisdiction, should find connection G', async body => {
    const connectionAdded = addConnection(body);
    expect(connectionAdded).toEqual([JurisdictionConnections.RESIDUAL_JURISDICTION]);
  });
});
