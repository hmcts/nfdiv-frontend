import { Checkbox } from '../case/case';
import { ApplicationType, DivorceOrDissolution, JurisdictionConnections, YesOrNo } from '../case/definition';

import {
  addConnectionsBasedOnQuestions,
  allowedToAnswerResidualJurisdiction,
  previousConnectionMadeUptoLastHabituallyResident,
} from './connections';

describe('connections', () => {
  test('Should be allowed to answer residual jurisdiction if residual jurisdiction connection is already made', async () => {
    const body = {
      sameSex: Checkbox.Checked,
      bothLastHabituallyResident: YesOrNo.NO,
    };
    const connections = [JurisdictionConnections.RESIDUAL_JURISDICTION];

    const isAllowedToAnswerResidualJurisdiction = allowedToAnswerResidualJurisdiction(body, connections);
    expect(isAllowedToAnswerResidualJurisdiction).toBeTruthy();
  });
  test('Given both applicant 1 and applicant 2 are both habitually resident, should find connection A', async () => {
    const body = {
      applicant1LifeBasedInEnglandAndWales: YesOrNo.YES,
      applicant2LifeBasedInEnglandAndWales: YesOrNo.YES,
    };

    const connectionAdded = addConnectionsBasedOnQuestions(body);
    expect(connectionAdded).toEqual([JurisdictionConnections.APP_1_APP_2_RESIDENT]);
  });

  test('Given applicant 1 and applicant 2 are both last habitually resident, should find connection B', async () => {
    const body = { bothLastHabituallyResident: YesOrNo.YES };

    const connectionAdded = addConnectionsBasedOnQuestions(body);
    expect(connectionAdded).toEqual([JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT]);
  });

  test('Given only applicant 2 is habitually resident, should find connection C', async () => {
    const body = {
      applicant1LifeBasedInEnglandAndWales: YesOrNo.NO,
      applicant2LifeBasedInEnglandAndWales: YesOrNo.YES,
    };

    const connectionAdded = addConnectionsBasedOnQuestions(body);
    expect(connectionAdded).toEqual([JurisdictionConnections.APP_2_RESIDENT]);
  });

  test('Given only applicant 1 is habitually resident, and has been for the last 12 months, should find connection D', async () => {
    const body = {
      applicant1LifeBasedInEnglandAndWales: YesOrNo.YES,
      applicant2LifeBasedInEnglandAndWales: YesOrNo.NO,
      applicant1LivingInEnglandWalesTwelveMonths: YesOrNo.YES,
    };

    const connectionAdded = addConnectionsBasedOnQuestions(body);
    expect(connectionAdded).toEqual([JurisdictionConnections.APP_1_RESIDENT_TWELVE_MONTHS]);
  });

  test(
    'Given only applicant 1 is habitually resident and domiciled, and has been for the last 6 months, ' +
      'should find connection E',
    async () => {
      const body = {
        applicant1LifeBasedInEnglandAndWales: YesOrNo.YES,
        applicant2LifeBasedInEnglandAndWales: YesOrNo.NO,
        applicant1LivingInEnglandWalesSixMonths: YesOrNo.YES,
        applicant1DomicileInEnglandWales: YesOrNo.YES,
        applicant2DomicileInEnglandWales: YesOrNo.NO,
      };

      const connectionAdded = addConnectionsBasedOnQuestions(body);
      expect(connectionAdded).toEqual([
        JurisdictionConnections.APP_1_RESIDENT_SIX_MONTHS,
        JurisdictionConnections.APP_1_DOMICILED,
      ]);
    }
  );

  test('Given both applicant 1 and applicant 2 are both domiciled, should find connection F', async () => {
    const body = { applicant1DomicileInEnglandWales: YesOrNo.YES, applicant2DomicileInEnglandWales: YesOrNo.YES };

    const connectionAdded = addConnectionsBasedOnQuestions(body);
    expect(connectionAdded).toEqual([JurisdictionConnections.APP_1_APP_2_DOMICILED]);
  });

  test.each([
    {
      sameSex: Checkbox.Checked,
      applicant2LifeBasedInEnglandAndWales: YesOrNo.NO,
      applicant1DomicileInEnglandWales: YesOrNo.NO,
      applicant2DomicileInEnglandWales: YesOrNo.NO,
      jurisdictionResidualEligible: Checkbox.Checked,
      bothLastHabituallyResident: YesOrNo.NO,
    },
    {
      divorceOrDissolution: DivorceOrDissolution.DISSOLUTION,
      applicant1LifeBasedInEnglandAndWales: YesOrNo.YES,
      applicant2LifeBasedInEnglandAndWales: YesOrNo.NO,
      applicant1DomicileInEnglandWales: YesOrNo.NO,
      applicant2DomicileInEnglandWales: YesOrNo.NO,
      jurisdictionResidualEligible: Checkbox.Checked,
      bothLastHabituallyResident: YesOrNo.NO,
    },
  ])('Given there is residual jurisdiction, should find connection G', async body => {
    const connectionAdded = addConnectionsBasedOnQuestions(body);
    expect(connectionAdded).toEqual([JurisdictionConnections.RESIDUAL_JURISDICTION]);
  });

  test('Given applicant 1 is domiciled, should find connection H', async () => {
    const body = { applicant1DomicileInEnglandWales: YesOrNo.YES };

    const connectionAdded = addConnectionsBasedOnQuestions(body);
    expect(connectionAdded).toEqual([JurisdictionConnections.APP_1_DOMICILED]);
  });

  test('Given applicant 2 is domiciled, should find connection I', async () => {
    const body = { applicant2DomicileInEnglandWales: YesOrNo.YES };

    const connectionAdded = addConnectionsBasedOnQuestions(body);
    expect(connectionAdded).toEqual([JurisdictionConnections.APP_2_DOMICILED]);
  });

  test('Given both were last habitually resident in England or Wales and applicant 2 is domiciled, should find connection B and I', async () => {
    const body = { bothLastHabituallyResident: YesOrNo.YES, applicant2DomicileInEnglandWales: YesOrNo.YES };

    const connectionAdded = addConnectionsBasedOnQuestions(body);
    expect(connectionAdded).toEqual([
      JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT,
      JurisdictionConnections.APP_2_DOMICILED,
    ]);
  });

  test('Given only applicant 1 is habitually resident in a joint application, should find connection J', async () => {
    const body = {
      applicant1LifeBasedInEnglandAndWales: YesOrNo.YES,
      applicant2LifeBasedInEnglandAndWales: YesOrNo.NO,
      applicationType: ApplicationType.JOINT_APPLICATION,
    };

    const connectionAdded = addConnectionsBasedOnQuestions(body);
    expect(connectionAdded).toEqual([JurisdictionConnections.APP_1_RESIDENT_JOINT]);
  });

  test('Given previous connection made up to last habitually resident and connection B made, should return true', async () => {
    const body = {
      connections: [JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT, JurisdictionConnections.APP_2_DOMICILED],
    };
    const connections = [JurisdictionConnections.RESIDUAL_JURISDICTION];
    expect(previousConnectionMadeUptoLastHabituallyResident(body, connections)).toEqual(true);
  });

  test('Given no previous connection made up to last habitually resident and connection B made, should return false', async () => {
    const body = {
      connections: [JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT],
    };
    const connections = [];
    expect(previousConnectionMadeUptoLastHabituallyResident(body, connections)).toEqual(false);
  });

  test('Given previous connection made up to last habitually resident, should return true', async () => {
    const body = {
      connections: [JurisdictionConnections.APP_2_DOMICILED],
    };
    const connections = [JurisdictionConnections.RESIDUAL_JURISDICTION];
    expect(previousConnectionMadeUptoLastHabituallyResident(body, connections)).toEqual(true);
  });

  test('Given no previous connection made up to last habitually resident, should return false', async () => {
    const body = {
      connections: [],
    };
    const connections = [];
    expect(previousConnectionMadeUptoLastHabituallyResident(body, connections)).toEqual(false);
  });
});
