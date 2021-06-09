import { Checkbox } from './case';
import { CaseData, DivorceOrDissolution, Gender, YesOrNo } from './definition';
import { fromApiFormat } from './from-api-format';

describe('from-api-format', () => {
  const results: Partial<Record<keyof CaseData, string | null>> = {
    divorceOrDissolution: 'divorce',
    marriageIsSameSexCouple: 'Yes',
    applicant2Gender: 'male',
    applicant1Gender: 'male',
    screenHasMarriageBroken: 'Yes',
    helpWithFeesReferenceNumber: 'HWF-ABC-123',
    applicant1AgreedToReceiveEmails: 'Yes',
    applicant1ContactDetailsConfidential: 'keep',
    applicant1KnowsApplicant2EmailAddress: 'NO',
    applicant1WantsToHavePapersServedAnotherWay: null,
  };

  test('Should convert results from api to nfdiv fe format', async () => {
    const nfdivFormat = fromApiFormat(results as unknown as CaseData);

    expect(nfdivFormat).toStrictEqual({
      divorceOrDissolution: DivorceOrDissolution.DIVORCE,
      sameSex: Checkbox.Checked,
      gender: Gender.MALE,
      screenHasUnionBroken: YesOrNo.YES,
      applicant1HelpWithFeesRefNo: 'HWF-ABC-123',
      applicant1AgreeToReceiveEmails: Checkbox.Checked,
      applicant1AddressPrivate: YesOrNo.YES,
      applicant1DoesNotKnowApplicant2EmailAddress: Checkbox.Checked,
      iWantToHavePapersServedAnotherWay: undefined,
    });
  });

  test('convert results including the union date from api to nfdiv fe format', async () => {
    const nfdivFormat = fromApiFormat({ ...results, marriageDate: '2000-09-02' } as unknown as CaseData);

    expect(nfdivFormat).toStrictEqual({
      divorceOrDissolution: DivorceOrDissolution.DIVORCE,
      gender: Gender.MALE,
      sameSex: Checkbox.Checked,
      screenHasUnionBroken: YesOrNo.YES,
      relationshipDate: {
        day: '2',
        month: '9',
        year: '2000',
      },
      applicant1HelpWithFeesRefNo: 'HWF-ABC-123',
      applicant1AgreeToReceiveEmails: Checkbox.Checked,
      applicant1AddressPrivate: YesOrNo.YES,
      applicant1DoesNotKnowApplicant2EmailAddress: Checkbox.Checked,
      iWantToHavePapersServedAnotherWay: undefined,
    });
  });

  describe('converting your address between UK and international', () => {
    test('converts to UK format', () => {
      const nfdivFormat = fromApiFormat({
        ...results,
        applicant1HomeAddress: {
          AddressLine1: 'Line 1',
          AddressLine2: 'Line 2',
          PostTown: 'Town',
          County: 'County',
          PostCode: 'Postcode',
        },
      } as unknown as CaseData);

      expect(nfdivFormat).toMatchObject({
        applicant1Address1: 'Line 1',
        applicant1Address2: 'Line 2',
        applicant1AddressTown: 'Town',
        applicant1AddressCounty: 'County',
        applicant1AddressPostcode: 'Postcode',
      });
    });

    test('converts to an international format', () => {
      const nfdivFormat = fromApiFormat({
        ...results,
        applicant1HomeAddress: {
          AddressLine1: 'Line 1',
          AddressLine2: 'Line 2',
          AddressLine3: 'Line 3',
          PostTown: 'Town',
          County: 'State',
          PostCode: 'Zip code',
          Country: 'Country',
        },
      } as unknown as CaseData);

      expect(nfdivFormat).toMatchObject({});
    });
  });

  test('adds read only fields', () => {
    expect(
      fromApiFormat({
        payments: [
          {
            id: 'mock-payment',
          },
        ],
      } as unknown as CaseData)
    ).toStrictEqual({
      payments: [
        {
          id: 'mock-payment',
        },
      ],
    });
  });
});
