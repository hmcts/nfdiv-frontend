import { Step } from '../../../steps/applicant1Sequence';
import { Case, Checkbox, LanguagePreference } from '../case';
import { ApplicationType, ChangedNameHow, DocumentType, Gender, JurisdictionConnections, YesOrNo } from '../definition';

import { getUnreachableAnswersAsNull, omitUnreachableAnswers } from './possibleAnswers';

describe('omitUnreachableAnswers()', () => {
  test('omits unreachable answers', () => {
    const caseStateWithUnreachableAnswers = {
      valid1: 'pick-me',
      valid2: 'pick-me',
      invalid1: 'dont-pick-me',
    } as unknown as Partial<Case>;

    const mockSteps = [
      {
        getNextStep: () => 'next-url',
        form: { fields: { valid1: {} } },
      },
      {
        url: 'next-url',
        getNextStep: () => '',
        form: { fields: { valid2: {} } },
      },
    ] as unknown as Step[];

    const actual = omitUnreachableAnswers(caseStateWithUnreachableAnswers, mockSteps);

    expect(actual).toEqual({ valid1: 'pick-me', valid2: 'pick-me' });
  });

  test('omits unreachable answers with checkboxes', () => {
    const caseStateWithUnreachableAnswers = {
      valid1: 'pick-me',
      invalid1: 'dont-pick-me',
    } as unknown as Partial<Case>;

    const mockSteps = [
      {
        getNextStep: () => '',
        form: { fields: { someCheckboxes: { type: 'checkboxes', values: [{ name: 'valid1' }] } } },
      },
      {
        url: 'not-this-one',
        getNextStep: () => '',
        form: { fields: { someCheckboxes: { type: 'checkboxes', values: [{ name: 'invalid1' }] } } },
      },
    ] as unknown as Step[];

    const actual = omitUnreachableAnswers(caseStateWithUnreachableAnswers, mockSteps);

    expect(actual).toEqual({ valid1: 'pick-me' });
  });

  test('omits unreachable answers with subfields', () => {
    const caseStateWithUnreachableAnswers = {
      valid1: 'pick-me',
      valid2: 'pick-me',
      invalid1: 'dont-pick-me',
    } as unknown as Partial<Case>;

    const mockSteps = [
      {
        getNextStep: () => '',
        form: {
          fields: {
            someCheckboxes: {
              type: 'radios',
              values: [{ value: 'Yes', subFields: { valid1: { type: 'text' }, valid2: { type: 'text' } } }],
            },
          },
        },
      },
    ] as unknown as Step[];

    const actual = omitUnreachableAnswers(caseStateWithUnreachableAnswers, mockSteps);

    expect(actual).toEqual({ valid1: 'pick-me', valid2: 'pick-me' });
  });

  test('omits unreachable answers with date', () => {
    const caseStateWithUnreachableAnswers = {
      valid1: 'pick-me',
      invalid1: 'dont-pick-me',
    } as unknown as Partial<Case>;

    const mockSteps = [
      {
        getNextStep: () => '',
        form: { fields: { valid1: { type: 'date', values: [{ name: 'day' }] } } },
      },
    ] as unknown as Step[];

    const actual = omitUnreachableAnswers(caseStateWithUnreachableAnswers, mockSteps);

    expect(actual).toEqual({ valid1: 'pick-me' });
  });

  test('returns unreachable answers as null', async () => {
    const userCase = {
      certificateInEnglish: YesOrNo.NO,
      certifiedTranslation: YesOrNo.YES,
      ceremonyCountry: 'Northern Ireland',
      ceremonyPlace: 'Belfast',
    };

    const actual = getUnreachableAnswersAsNull(userCase);

    expect(actual).toEqual({
      certificateInEnglish: null,
      certifiedTranslation: null,
      ceremonyCountry: null,
      ceremonyPlace: null,
    });
  });

  test('returns document upload answers as null due to change in user case', async () => {
    const userCase: Partial<Case> = {
      applicant1AgreeToReceiveEmails: Checkbox.Checked,
      applicant1AddressPrivate: YesOrNo.NO,
      applicationType: ApplicationType.SOLE_APPLICATION,
      applicant1HelpWithFeesRefNo: 'HWF-ABC-123',
      applicant1FullNameOnCertificate: 'test1',
      applicant2FullNameOnCertificate: 'test2',
      applicant1AlreadyAppliedForHelpPaying: YesOrNo.YES,
      applicant2LifeBasedInEnglandAndWales: YesOrNo.YES,
      applicant1KnowsApplicant2Address: YesOrNo.YES,
      inTheUk: YesOrNo.YES,
      applyForFinancialOrder: YesOrNo.NO,
      gender: Gender.MALE,
      applicant1Address1: '1ST STREET',
      applicant1AddressTown: 'LONDON',
      applicant1AddressPostcode: 'E1 1AB',
      applicant1AddressCountry: 'UK',
      applicant1HelpPayingNeeded: YesOrNo.YES,
      legalProceedingsRelated: [],
      relationshipDate: {
        year: '2020',
        month: '1',
        day: '1',
      },
      applicant2FirstNames: 'test2',
      applicant1NameChangedSinceRelationshipFormed: YesOrNo.NO,
      applicant2LastNames: 'test22',
      applicant2Address1: '2 STREET',
      applicant2AddressTown: 'LONDON',
      applicant2AddressPostcode: 'A1 1AA',
      applicant2AddressCountry: 'UK',
      applicant1LifeBasedInEnglandAndWales: YesOrNo.YES,
      applicant1NameChangedHow: [ChangedNameHow.MARRIAGE_CERTIFICATE],
      hasCertificate: YesOrNo.YES,
      connections: [JurisdictionConnections.APP_1_APP_2_RESIDENT],
      applicant1FirstNames: 'test1',
      applicant2EmailAddress: 'test@test.com',
      screenHasUnionBroken: YesOrNo.YES,
      applicant1UploadedFiles: [],
      applicant1CannotUpload: Checkbox.Checked,
      applicant1CannotUploadDocuments: [DocumentType.MARRIAGE_CERTIFICATE],
      applicant1LastNameChangedWhenRelationshipFormed: YesOrNo.YES,
      legalProceedings: YesOrNo.NO,
      sameSex: Checkbox.Unchecked,
      applicant1LastNames: 'test',
      applicant1EnglishOrWelsh: LanguagePreference.English,
      applicant1DoesNotKnowApplicant2EmailAddress: Checkbox.Unchecked,
    };

    const actual = getUnreachableAnswersAsNull(userCase);

    expect(actual).toEqual({
      applicant1CannotUpload: null,
      applicant1CannotUploadDocuments: null,
    });
  });

  test('does not set document upload answers as null due to no change in user case', async () => {
    const userCase: Partial<Case> = {
      applicant1AgreeToReceiveEmails: Checkbox.Checked,
      applicant1AddressPrivate: YesOrNo.NO,
      applicationType: ApplicationType.SOLE_APPLICATION,
      applicant1HelpWithFeesRefNo: 'HWF-ABC-123',
      applicant1FullNameOnCertificate: 'test1',
      applicant2FullNameOnCertificate: 'test2',
      applicant1AlreadyAppliedForHelpPaying: YesOrNo.YES,
      applicant2LifeBasedInEnglandAndWales: YesOrNo.YES,
      applicant1KnowsApplicant2Address: YesOrNo.YES,
      inTheUk: YesOrNo.YES,
      applyForFinancialOrder: YesOrNo.NO,
      gender: Gender.MALE,
      applicant1Address1: '1ST STREET',
      applicant1AddressTown: 'LONDON',
      applicant1AddressPostcode: 'E1 1AB',
      applicant1AddressCountry: 'UK',
      applicant1HelpPayingNeeded: YesOrNo.YES,
      legalProceedingsRelated: [],
      relationshipDate: {
        year: '2020',
        month: '1',
        day: '1',
      },
      applicant2FirstNames: 'test2',
      applicant1NameChangedSinceRelationshipFormed: YesOrNo.NO,
      applicant2LastNames: 'test22',
      applicant2Address1: '2 STREET',
      applicant2AddressTown: 'LONDON',
      applicant2AddressPostcode: 'A1 1AA',
      applicant2AddressCountry: 'UK',
      applicant1LifeBasedInEnglandAndWales: YesOrNo.YES,
      hasCertificate: YesOrNo.YES,
      connections: [JurisdictionConnections.APP_1_APP_2_RESIDENT],
      applicant1FirstNames: 'test1',
      applicant2EmailAddress: 'test@test.com',
      screenHasUnionBroken: YesOrNo.YES,
      applicant1UploadedFiles: [],
      applicant1CannotUpload: Checkbox.Checked,
      applicant1CannotUploadDocuments: [DocumentType.MARRIAGE_CERTIFICATE],
      applicant1LastNameChangedWhenRelationshipFormed: YesOrNo.NO,
      legalProceedings: YesOrNo.NO,
      sameSex: Checkbox.Unchecked,
      applicant1LastNames: 'test',
      applicant1EnglishOrWelsh: LanguagePreference.English,
      applicant1DoesNotKnowApplicant2EmailAddress: Checkbox.Unchecked,
    };

    const actual = getUnreachableAnswersAsNull(userCase);

    expect(actual).toEqual({
      applicant1CannotUpload: null,
    });
  });
});
