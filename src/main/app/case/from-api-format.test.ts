import { Checkbox } from './case';
import { CaseData, DivorceOrDissolution, Gender, YesOrNo } from './definition';
import { fromApiFormat } from './from-api-format';

describe('from-api-format', () => {
  const results: Partial<Record<keyof CaseData, string>> = {
    divorceOrDissolution: 'divorce',
    marriageIsSameSexCouple: 'YES',
    inferredRespondentGender: 'male',
    inferredPetitionerGender: 'male',
    screenHasMarriageBroken: 'YES',
    helpWithFeesReferenceNumber: 'HWF-ABC-123',
    petitionerAgreedToReceiveEmails: 'YES',
    petitionerContactDetailsConfidential: 'keep',
    petitionerWantsToHavePapersServedAnotherWay: 'YES',
  };

  test('Should convert results from api to nfdiv fe format', async () => {
    const nfdivFormat = fromApiFormat((results as unknown) as CaseData);

    expect(nfdivFormat).toStrictEqual({
      divorceOrDissolution: DivorceOrDissolution.DIVORCE,
      sameSex: Checkbox.Checked,
      gender: Gender.MALE,
      screenHasUnionBroken: YesOrNo.YES,
      helpWithFeesRefNo: 'HWF-ABC-123',
      agreeToReceiveEmails: Checkbox.Checked,
      addressPrivate: YesOrNo.YES,
      iWantToHavePapersServedAnotherWay: Checkbox.Checked,
    });
  });

  test('convert results including the union date from api to nfdiv fe format', async () => {
    const nfdivFormat = fromApiFormat(({ ...results, marriageDate: '2000-09-02' } as unknown) as CaseData);

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
      iWantToHavePapersServedAnotherWay: Checkbox.Checked,
    });
  });

  describe('converting your address between UK and international', () => {
    test('works correctly when not set', () => {
      const nfdivFormat = fromApiFormat(({
        ...results,
        derivedPetitionerHomeAddress: undefined,
      } as unknown) as CaseData);

      expect(nfdivFormat).toMatchObject({
        isInternationalAddress: undefined,
        yourInternationalAddress: undefined,
      });
    });

    test('converts to UK format', () => {
      const nfdivFormat = fromApiFormat(({
        ...results,
        derivedPetitionerHomeAddress: 'Line 1\nLine 2\nTown\nCounty\nPostcode',
      } as unknown) as CaseData);

      expect(nfdivFormat).toMatchObject({
        yourAddress1: 'Line 1',
        yourAddress2: 'Line 2',
        yourAddressTown: 'Town',
        yourAddressCounty: 'County',
        yourAddressPostcode: 'Postcode',
        isInternationalAddress: YesOrNo.NO,
      });
    });

    test('converts to an international format', () => {
      const nfdivFormat = fromApiFormat(({
        ...results,
        derivedPetitionerHomeAddress: 'Line 1\nLine 2\nTown\nState\nZip code\nCountry',
      } as unknown) as CaseData);

      expect(nfdivFormat).toMatchObject({
        yourInternationalAddress: 'Line 1\nLine 2\nTown\nState\nZip code\nCountry',
        isInternationalAddress: YesOrNo.YES,
      });
    });
  });
});
