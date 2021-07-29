import { isInvalidHelpWithFeesRef } from '../form/validation';

import { Case, CaseDate, Checkbox, LanguagePreference, formFieldsToCaseMapping, formatCase } from './case';
import { CaseData, ChangedNameHow, ConfidentialAddress, DivorceOrDissolution, Gender, YesOrNo } from './definition';
import { applicant1AddressToApi, applicant2AddressToApi } from './formatter/address';

export type OrNull<T> = { [K in keyof T]: T[K] | null };

type ToApiConverters = Partial<Record<keyof Case, string | ((data: Case) => OrNull<Partial<CaseData>>)>>;

const checkboxConverter = (value: string | undefined) => {
  if (value === null) {
    return null;
  }

  return value === Checkbox.Checked ? YesOrNo.YES : YesOrNo.NO;
};

const fields: ToApiConverters = {
  ...formFieldsToCaseMapping,
  sameSex: data => ({
    marriageIsSameSexCouple: checkboxConverter(data.sameSex),
  }),
  gender: data => {
    // Applicant 1 makes the request
    let applicant1Gender = data.gender;

    // Applicant 2 receives the request
    let applicant2Gender = data.gender;

    if (data.sameSex !== Checkbox.Checked) {
      if (data.divorceOrDissolution === DivorceOrDissolution.DISSOLUTION) {
        applicant1Gender = data.gender;
        applicant2Gender = data.gender === Gender.MALE ? Gender.FEMALE : Gender.MALE;
      } else {
        applicant1Gender = data.gender === Gender.MALE ? Gender.FEMALE : Gender.MALE;
        applicant2Gender = data.gender;
      }
    }

    return { applicant1Gender, applicant2Gender };
  },
  relationshipDate: data => ({
    marriageDate: toApiDate(data.relationshipDate),
  }),
  applicant1HelpWithFeesRefNo: data => ({
    helpWithFeesReferenceNumber: !isInvalidHelpWithFeesRef(data.applicant1HelpWithFeesRefNo)
      ? data.applicant1HelpWithFeesRefNo
      : '',
  }),
  applicant1EnglishOrWelsh: data => ({
    applicant1LanguagePreferenceWelsh: languagePreferenceYesNoOrNull(data.applicant1EnglishOrWelsh),
  }),
  applicant2EnglishOrWelsh: data => ({
    applicant2LanguagePreferenceWelsh: languagePreferenceYesNoOrNull(data.applicant2EnglishOrWelsh),
  }),
  applicant1AddressPostcode: applicant1AddressToApi,
  applicant1AgreeToReceiveEmails: data => ({
    applicant1AgreedToReceiveEmails: checkboxConverter(data.applicant1AgreeToReceiveEmails),
  }),
  applicant2AgreeToReceiveEmails: data => ({
    applicant2AgreedToReceiveEmails: checkboxConverter(data.applicant2AgreeToReceiveEmails),
  }),
  applicant1AddressPrivate: data => ({
    applicant1ContactDetailsConfidential: addressPrivateYesNoOrNull(data.applicant1AddressPrivate),
  }),
  applicant2AddressPrivate: data => ({
    applicant2ContactDetailsConfidential: addressPrivateYesNoOrNull(data.applicant2AddressPrivate),
  }),
  applicant2AddressPostcode: applicant2AddressToApi,
  applicant1DoesNotKnowApplicant2EmailAddress: data => ({
    applicant1KnowsApplicant2EmailAddress:
      data.applicant1DoesNotKnowApplicant2EmailAddress === Checkbox.Checked ? YesOrNo.NO : YesOrNo.YES,
  }),
  iWantToHavePapersServedAnotherWay: data => ({
    applicant1WantsToHavePapersServedAnotherWay: checkboxConverter(data.iWantToHavePapersServedAnotherWay),
  }),
  applicant1LegalProceedingsRelated: data => ({
    applicant1LegalProceedingsRelated:
      data.applicant1LegalProceedings === YesOrNo.YES ? data.applicant1LegalProceedingsRelated : [],
  }),
  applicant2LegalProceedingsRelated: data => ({
    applicant2LegalProceedingsRelated:
      data.applicant2LegalProceedings === YesOrNo.YES ? data.applicant2LegalProceedingsRelated : [],
  }),
  applicant1ChangedNameHowAnotherWay: data => ({
    applicant1NameChangedHowOtherDetails: data.applicant1NameChangedHow?.includes(ChangedNameHow.OTHER)
      ? data.applicant1ChangedNameHowAnotherWay
      : '',
  }),
  applicant2ChangedNameHowAnotherWay: data => ({
    applicant2NameChangedHowOtherDetails: data.applicant2NameChangedHow?.includes(ChangedNameHow.OTHER)
      ? data.applicant2ChangedNameHowAnotherWay
      : '',
  }),
  applicant1CannotUploadDocuments: data => ({
    applicant1CannotUploadSupportingDocument: data.applicant1CannotUploadDocuments
      ? !Array.isArray(data.applicant1CannotUploadDocuments)
        ? [data.applicant1CannotUploadDocuments]
        : data.applicant1CannotUploadDocuments
      : [],
  }),
  applicant2CannotUploadDocuments: data => ({
    applicant2CannotUploadSupportingDocument: data.applicant2CannotUploadDocuments
      ? !Array.isArray(data.applicant2CannotUploadDocuments)
        ? [data.applicant2CannotUploadDocuments]
        : data.applicant2CannotUploadDocuments
      : [],
  }),
  applicant1IConfirmPrayer: data => ({
    applicant1PrayerHasBeenGiven: checkboxConverter(data.applicant1IConfirmPrayer),
  }),
  applicant2IConfirmPrayer: data => ({
    applicant2PrayerHasBeenGiven: checkboxConverter(data.applicant2IConfirmPrayer),
  }),
  applicant1IBelieveApplicationIsTrue: data => ({
    applicant1StatementOfTruth: checkboxConverter(data.applicant1IBelieveApplicationIsTrue),
  }),
  applicant2IBelieveApplicationIsTrue: data => ({
    applicant2StatementOfTruth: checkboxConverter(data.applicant2IBelieveApplicationIsTrue),
  }),
};

const toApiDate = (date: CaseDate | undefined) => {
  if (!date?.year || !date?.month || !date?.day) {
    return '';
  }
  return date.year + '-' + date.month.padStart(2, '0') + '-' + date.day.padStart(2, '0');
};

const languagePreferenceYesNoOrNull = (value: LanguagePreference | undefined) => {
  if (!value) {
    return null;
  }
  return value === LanguagePreference.Welsh ? YesOrNo.YES : YesOrNo.NO;
};

const addressPrivateYesNoOrNull = (value: YesOrNo) => {
  if (!value) {
    return null;
  }
  return value === YesOrNo.YES ? ConfidentialAddress.KEEP : ConfidentialAddress.SHARE;
};

export const toApiFormat = (data: Partial<Case>): CaseData => formatCase(fields, data);
