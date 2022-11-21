import { Case } from '../case/case';
import { YesOrNo } from '../case/definition';

import { setJurisdictionFieldsAsNull, setUnreachableJurisdictionFieldsAsNull } from './jurisdictionRemovalHelper';

describe('JurisdictionRemovalHelper', () => {
  test('Should set unreachable fields as null', async () => {
    const bodyWithConnection = {
      id: '1234',
      relationshipDate: { day: '01', month: '01', year: '2021' },
      applicant2LifeBasedInEnglandAndWales: YesOrNo.YES,
      applicant1LifeBasedInEnglandAndWales: YesOrNo.YES,
      connections: ['A'],
      applicant1DomicileInEnglandWales: YesOrNo.YES,
      applicant1LivingInEnglandWalesSixMonths: YesOrNo.YES,
      applicant1LivingInEnglandWalesTwelveMonths: YesOrNo.YES,
      applicant2DomicileInEnglandWales: YesOrNo.YES,
      bothLastHabituallyResident: YesOrNo.YES,
      jurisdictionResidualEligible: YesOrNo.YES,
    } as unknown as Partial<Case>;

    const expectedUserCase = {
      id: '1234',
      relationshipDate: { day: '01', month: '01', year: '2021' },
      applicant2LifeBasedInEnglandAndWales: YesOrNo.YES,
      applicant1LifeBasedInEnglandAndWales: YesOrNo.YES,
      connections: ['A'],
      applicant1DomicileInEnglandWales: null,
      applicant1LivingInEnglandWalesSixMonths: null,
      applicant1LivingInEnglandWalesTwelveMonths: null,
      applicant2DomicileInEnglandWales: null,
      bothLastHabituallyResident: null,
      jurisdictionResidualEligible: null,
    };

    const newUserCase = setUnreachableJurisdictionFieldsAsNull(bodyWithConnection);

    expect(newUserCase).toEqual(expectedUserCase);
  });

  test('Should set all fields as null', async () => {
    const bodyWithConnection = {
      id: '1234',
      relationshipDate: { day: '01', month: '01', year: '2021' },
      applicant2LifeBasedInEnglandAndWales: YesOrNo.YES,
      applicant1LifeBasedInEnglandAndWales: YesOrNo.YES,
      connections: ['A'],
      applicant1DomicileInEnglandWales: YesOrNo.YES,
      applicant1LivingInEnglandWalesSixMonths: YesOrNo.YES,
      applicant1LivingInEnglandWalesTwelveMonths: YesOrNo.YES,
      applicant2DomicileInEnglandWales: YesOrNo.YES,
      bothLastHabituallyResident: YesOrNo.YES,
      jurisdictionResidualEligible: YesOrNo.YES,
    } as unknown as Partial<Case>;

    const expectedUserCase = {
      id: '1234',
      applicant2LifeBasedInEnglandAndWales: null,
      applicant1LifeBasedInEnglandAndWales: null,
      connections: null,
      applicant1DomicileInEnglandWales: null,
      applicant1LivingInEnglandWalesSixMonths: null,
      applicant1LivingInEnglandWalesTwelveMonths: null,
      applicant2DomicileInEnglandWales: null,
      bothLastHabituallyResident: null,
      jurisdictionResidualEligible: null,
      relationshipDate: null,
    };

    const newUserCase = setJurisdictionFieldsAsNull(bodyWithConnection);

    expect(newUserCase).toEqual(expectedUserCase);
  });
});
