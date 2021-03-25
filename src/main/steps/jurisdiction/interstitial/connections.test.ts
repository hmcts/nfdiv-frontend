import { YesOrNo } from '../../../app/case/case';
import { JurisdictionConnections } from '../../../app/case/definition';

import { addConnection } from './connections';

describe('connections', () => {
  test('Given both petitioner and respondent are both habitually resident, ' + 'should find connection A', async () => {
    const body = { yourLifeBasedInEnglandAndWales: YesOrNo.Yes, partnersLifeBasedInEnglandAndWales: YesOrNo.Yes };

    const connectionAdded = addConnection(body);
    expect(connectionAdded).toEqual(JurisdictionConnections.PET_RESP_RESIDENT);
  });

  test('Given petitioner and respondent are both last habitually resident, ' + 'should find connection B', async () => {
    const body = { lastHabituallyResident: YesOrNo.Yes };

    const connectionAdded = addConnection(body);
    expect(connectionAdded).toEqual(JurisdictionConnections.PET_RESP_LAST_RESIDENT);
  });

  test('Given only respondent is habitually resident, should find connection C', async () => {
    const body = { yourLifeBasedInEnglandAndWales: YesOrNo.No, partnersLifeBasedInEnglandAndWales: YesOrNo.Yes };

    const connectionAdded = addConnection(body);
    expect(connectionAdded).toEqual(JurisdictionConnections.RESP_RESIDENT);
  });

  test(
    'Given only petitioner is habitually resident, and has been for the last 12 months, ' + 'should find connection D',
    async () => {
      const body = {
        yourLifeBasedInEnglandAndWales: YesOrNo.Yes,
        partnersLifeBasedInEnglandAndWales: YesOrNo.No,
        livingInEnglandWalesTwelveMonths: YesOrNo.Yes,
      };

      const connectionAdded = addConnection(body);
      expect(connectionAdded).toEqual(JurisdictionConnections.PET_RESIDENT_TWELVE_MONTHS);
    }
  );

  test(
    'Given only petitioner is habitually resident and domiciled, and has been for the last 6 months, ' +
      'should find connection E',
    async () => {
      const body = {
        yourLifeBasedInEnglandAndWales: YesOrNo.Yes,
        partnersLifeBasedInEnglandAndWales: YesOrNo.No,
        livingInEnglandWalesSixMonths: YesOrNo.Yes,
        yourDomicileInEnglandWales: YesOrNo.Yes,
        partnersDomicileInEnglandWales: YesOrNo.No,
      };

      const connectionAdded = addConnection(body);
      expect(connectionAdded).toEqual(JurisdictionConnections.PET_RESIDENT_SIX_MONTHS);
    }
  );

  test('Given both petitioner and respondent are both domiciled, should find connection F', async () => {
    const body = { yourDomicileInEnglandWales: YesOrNo.Yes, partnersDomicileInEnglandWales: YesOrNo.Yes };

    const connectionAdded = addConnection(body);
    expect(connectionAdded).toEqual(JurisdictionConnections.PET_RESP_DOMICILED);
  });

  test('Given there is residual jurisdiction, should find connection G', async () => {
    const body = { jurisdictionResidualEligible: YesOrNo.Yes };

    const connectionAdded = addConnection(body);
    expect(connectionAdded).toEqual(JurisdictionConnections.RESIDUAL_JURISDICTION);
  });
});
