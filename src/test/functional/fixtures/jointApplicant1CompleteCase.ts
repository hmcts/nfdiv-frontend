import { Checkbox, LanguagePreference } from '../../../main/app/case/case';
import {
  ApplicationType,
  DivorceOrDissolution,
  DocumentType,
  Gender,
  YesOrNo,
} from '../../../main/app/case/definition';
import { BrowserCase } from '../../steps/common';

export const jointApplicant1CompleteCase: Partial<BrowserCase> = {
  applicant1Address1: 'BUCKINGHAM PALACE',
  applicant1Address2: '',
  applicant1Address3: '',
  applicant1AddressCountry: 'UK',
  applicant1AddressCounty: 'CITY OF WESTMINSTER',
  applicant1AddressPostcode: 'SW1A 1AA',
  applicant1AddressPrivate: YesOrNo.NO,
  applicant1AddressTown: 'LONDON',
  applicant1AgreeToReceiveEmails: Checkbox.Checked,
  applicant1DoesNotKnowApplicant2EmailAddress: Checkbox.Unchecked,
  applicant1FirstNames: 'Test your name',
  applicant1FullNameOnCertificate: 'First name Last name',
  applicant1HelpPayingNeeded: YesOrNo.NO,
  applicant1KnowsApplicant2Address: YesOrNo.YES,
  applicant1LastNameChangedWhenRelationshipFormed: YesOrNo.NO,
  applicant1LastNames: 'Test your last name',
  applicant1LifeBasedInEnglandAndWales: YesOrNo.YES,
  applicant1MiddleNames: '',
  applicant1NameChangedSinceRelationshipFormed: YesOrNo.NO,
  applicant1PhoneNumber: '',
  applicant2EmailAddress: 'husband@example.com',
  applicant2FullNameOnCertificate: 'Husbands name',
  applicant2LifeBasedInEnglandAndWales: YesOrNo.YES,
  applicationType: ApplicationType.JOINT_APPLICATION,
  applyForFinancialOrder: YesOrNo.NO,
  applicant1CannotUpload: Checkbox.Checked,
  applicant1CannotUploadDocuments: [DocumentType.MARRIAGE_CERTIFICATE],
  divorceOrDissolution: DivorceOrDissolution.DIVORCE,
  applicant1EnglishOrWelsh: LanguagePreference.English,
  gender: Gender.MALE,
  hasCertificate: YesOrNo.YES,
  inTheUk: YesOrNo.YES,
  applicant1LegalProceedings: YesOrNo.NO,
  applicant1LegalProceedingsRelated: [],
  'relationshipDate-day': 31,
  'relationshipDate-month': 12,
  'relationshipDate-year': 1999,
  sameSex: Checkbox.Unchecked,
  applicant1ScreenHasUnionBroken: YesOrNo.YES,
  applicant1UploadedFiles: [],
};
