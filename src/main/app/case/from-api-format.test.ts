import { Checkbox, YesOrNo } from './case';
import { CaseData, DivorceOrDissolution, Gender } from './definition';
import { fromApiFormat } from './from-api-format';

describe('from-api-format', () => {
  const results = {
    divorceOrDissolution: 'divorce',
    D8MarriageIsSameSexCouple: 'YES',
    D8InferredRespondentGender: 'male',
    D8InferredPetitionerGender: 'male',
    D8ScreenHasMarriageBroken: 'YES',
    D8HelpWithFeesReferenceNumber: 'HWF-ABC-123',
    PetitionerAgreedToReceiveEmails: 'YES',
  };

  test('Should convert results from api to nfdiv fe format', async () => {
    const nfdivFormat = fromApiFormat((results as unknown) as CaseData);

    expect(nfdivFormat).toStrictEqual({
      divorceOrDissolution: DivorceOrDissolution.DIVORCE,
      sameSex: Checkbox.Checked,
      gender: Gender.MALE,
      screenHasUnionBroken: YesOrNo.Yes,
      helpWithFeesRefNo: 'HWF-ABC-123',
      agreeToReceiveEmails: Checkbox.Checked,
    });
  });

  test('convert results including the union date from api to nfdiv fe format', async () => {
    const nfdivFormat = fromApiFormat(({ ...results, D8MarriageDate: '2000-09-02' } as unknown) as CaseData);

    expect(nfdivFormat).toStrictEqual({
      divorceOrDissolution: DivorceOrDissolution.DIVORCE,
      gender: Gender.MALE,
      sameSex: Checkbox.Checked,
      screenHasUnionBroken: YesOrNo.Yes,
      relationshipDate: {
        day: '2',
        month: '9',
        year: '2000',
      },
      helpWithFeesRefNo: 'HWF-ABC-123',
      agreeToReceiveEmails: Checkbox.Checked,
    });
  });

  describe('converting your address between UK and international', () => {
    test('converts to UK format', () => {
      const nfdivFormat = fromApiFormat(({
        ...results,
        D8DerivedPetitionerHomeAddress: 'Line 1\nLine 2\nTown\nCounty\nPostcode',
      } as unknown) as CaseData);

      expect(nfdivFormat).toMatchObject({
        yourAddress1: 'Line 1',
        yourAddress2: 'Line 2',
        yourAddressTown: 'Town',
        yourAddressCounty: 'County',
        yourAddressPostcode: 'Postcode',
      });
    });

    test('converts to an international format', () => {
      const nfdivFormat = fromApiFormat(({
        ...results,
        D8DerivedPetitionerHomeAddress: 'Line 1\nLine 2\nTown\nState\nZip code\nCountry international_format',
      } as unknown) as CaseData);

      expect(nfdivFormat).toMatchObject({
        yourFullAddress: 'Line 1\nLine 2\nTown\nState\nZip code\nCountry ',
        myAddressIsInternational: Checkbox.Checked,
      });
    });
  });
});
