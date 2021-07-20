import { Checkbox, LanguagePreference } from '../../../main/app/case/case';
import {
  ApplicationType,
  DivorceOrDissolution,
  DocumentType,
  Gender,
  YesOrNo,
} from '../../../main/app/case/definition';
import { BrowserCase } from '../../steps/common';

export const completeCase: Partial<BrowserCase> = {
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
  applicant2Address1: '102 MINISTRY OF JUSTICE, SEVENTH FLOOR, PETTY FRANCE',
  applicant2Address2: '',
  applicant2Address3: '',
  applicant2AddressCountry: 'UK',
  applicant2AddressCounty: 'CITY OF WESTMINSTER',
  applicant2AddressPostcode: 'SW1H 9AJ',
  applicant2AddressTown: 'LONDON',
  applicant2EmailAddress: 'husband@example.com',
  applicant2FirstNames: 'Test their name',
  applicant2FullNameOnCertificate: 'Husbands name',
  applicant2LastNames: 'Test their last name',
  applicant2LifeBasedInEnglandAndWales: YesOrNo.YES,
  applicant2MiddleNames: '',
  applicationType: ApplicationType.SOLE_APPLICATION,
  applyForFinancialOrder: YesOrNo.NO,
  applicant1CannotUpload: Checkbox.Checked,
  applicant1CannotUploadDocuments: [DocumentType.MARRIAGE_CERTIFICATE],
  divorceOrDissolution: DivorceOrDissolution.DIVORCE,
  applicant1EnglishOrWelsh: LanguagePreference.English,
  applicant2EnglishOrWelsh: LanguagePreference.English,
  gender: Gender.MALE,
  hasCertificate: YesOrNo.YES,
  iBelieveApplicationIsTrue: Checkbox.Checked,
  iConfirmPrayer: Checkbox.Checked,
  inTheUk: YesOrNo.YES,
  applicant1LegalProceedings: YesOrNo.NO,
  applicant1LegalProceedingsRelated: [],
  'relationshipDate-day': 31,
  'relationshipDate-month': 12,
  'relationshipDate-year': 1999,
  sameSex: Checkbox.Unchecked,
  screenHasUnionBroken: YesOrNo.YES,
  applicant1UploadedFiles: [],
  whoIsFinancialOrderFor: [],
};
