import { Checkbox } from './case';
import { CaseData, DivorceOrDissolution, Gender, YesOrNo } from './definition';
import { fromApiFormat } from './from-api-format';

describe('from-api-format', () => {
  const results: Partial<Record<keyof CaseData, string | null>> = {
    divorceOrDissolution: 'divorce',
    marriageIsSameSexCouple: 'YES',
    inferredRespondentGender: 'male',
    inferredPetitionerGender: 'male',
    screenHasMarriageBroken: 'YES',
    helpWithFeesReferenceNumber: 'HWF-ABC-123',
    petitionerAgreedToReceiveEmails: 'YES',
    petitionerContactDetailsConfidential: 'keep',
    petitionerKnowsRespondentsEmailAddress: 'NO',
    petitionerWantsToHavePapersServedAnotherWay: null,
  };

  test('Should convert results from api to nfdiv fe format', async () => {
    const nfdivFormat = fromApiFormat(results as unknown as CaseData);

    expect(nfdivFormat).toStrictEqual({
      divorceOrDissolution: DivorceOrDissolution.DIVORCE,
      sameSex: Checkbox.Checked,
      gender: Gender.MALE,
      screenHasUnionBroken: YesOrNo.YES,
      helpWithFeesRefNo: 'HWF-ABC-123',
      agreeToReceiveEmails: Checkbox.Checked,
      addressPrivate: YesOrNo.YES,
      doNotKnowRespondentEmailAddress: Checkbox.Checked,
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
      helpWithFeesRefNo: 'HWF-ABC-123',
      agreeToReceiveEmails: Checkbox.Checked,
      addressPrivate: YesOrNo.YES,
      doNotKnowRespondentEmailAddress: Checkbox.Checked,
      iWantToHavePapersServedAnotherWay: undefined,
    });
  });

  describe('converting your address between UK and international', () => {
    test('works correctly when not set', () => {
      const nfdivFormat = fromApiFormat({
        ...results,
        derivedPetitionerHomeAddress: undefined,
      } as unknown as CaseData);

      expect(nfdivFormat.isYourAddressInternational).toBeUndefined();
      expect(nfdivFormat.isTheirAddressInternational).toBeUndefined();
    });

    test('converts to UK format', () => {
      const nfdivFormat = fromApiFormat({
        ...results,
        applicantHomeAddress: {
          AddressLine1: 'Line 1',
          AddressLine2: 'Line 2',
          PostTown: 'Town',
          County: 'County',
          PostCode: 'Postcode',
        },
        petitionerHomeAddressIsInternational: YesOrNo.NO,
      } as unknown as CaseData);

      expect(nfdivFormat).toMatchObject({
        isYourAddressInternational: YesOrNo.NO,
        yourAddress1: 'Line 1',
        yourAddress2: 'Line 2',
        yourAddressTown: 'Town',
        yourAddressCounty: 'County',
        yourAddressPostcode: 'Postcode',
      });
    });

    test('converts to an international format', () => {
      const nfdivFormat = fromApiFormat({
        ...results,
        applicantHomeAddress: {
          AddressLine1: 'Line 1',
          AddressLine2: 'Line 2',
          AddressLine3: 'Line 3',
          PostTown: 'Town',
          County: 'State',
          PostCode: 'Zip code',
          Country: 'Country',
        },
        petitionerHomeAddressIsInternational: YesOrNo.YES,
      } as unknown as CaseData);

      expect(nfdivFormat).toMatchObject({
        isYourAddressInternational: YesOrNo.YES,
        yourInternationalAddress: 'Line 1\nLine 2\nLine 3\nTown\nState\nZip code\nCountry',
      });
    });
  });
});
