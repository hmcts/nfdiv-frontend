import { isInvalidHelpWithFeesRef } from '../form/validation';

import { Case, CaseDate, Checkbox, LanguagePreference, formFieldsToCaseMapping, formatCase } from './case';
import { CaseData, ConfidentialAddress, DivorceOrDissolution, Gender, YesOrNo } from './definition';
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
    applicant1LanguagePreferenceWelsh:
      data.applicant1EnglishOrWelsh === LanguagePreference.Welsh ? YesOrNo.YES : YesOrNo.NO,
  }),
  applicant2EnglishOrWelsh: data => ({
    applicant2LanguagePreferenceWelsh:
      data.applicant2EnglishOrWelsh === LanguagePreference.Welsh ? YesOrNo.YES : YesOrNo.NO,
  }),
  applicant1AddressPostcode: applicant1AddressToApi,
  applicant1AgreeToReceiveEmails: data => ({
    applicant1AgreedToReceiveEmails: checkboxConverter(data.applicant1AgreeToReceiveEmails),
  }),
  applicant2AgreeToReceiveEmails: data => ({
    applicant2AgreedToReceiveEmails: checkboxConverter(data.applicant2AgreeToReceiveEmails),
  }),
  applicant1AddressPrivate: data => ({
    applicant1ContactDetailsConfidential:
      data.applicant1AddressPrivate === YesOrNo.YES ? ConfidentialAddress.KEEP : ConfidentialAddress.SHARE,
  }),
  applicant2AddressPrivate: data => ({
    applicant2ContactDetailsConfidential:
      data.applicant2AddressPrivate === YesOrNo.YES
        ? ConfidentialAddress.KEEP
        : data.applicant2AddressPrivate === null
        ? null
        : ConfidentialAddress.SHARE,
  }),
  applicant2AddressPostcode: applicant2AddressToApi,
  applicant1DoesNotKnowApplicant2EmailAddress: data => ({
    applicant1KnowsApplicant2EmailAddress:
      data.applicant1DoesNotKnowApplicant2EmailAddress === Checkbox.Checked ? YesOrNo.NO : YesOrNo.YES,
  }),
  iWantToHavePapersServedAnotherWay: data => ({
    applicant1WantsToHavePapersServedAnotherWay: checkboxConverter(data.iWantToHavePapersServedAnotherWay),
  }),
  legalProceedingsRelated: data => ({
    legalProceedingsRelated: data.legalProceedings === YesOrNo.YES ? data.legalProceedingsRelated : [],
  }),
  applicant1NameChangedHow: data => ({
    applicant1NameChangedHow:
      data.applicant1NameChangedSinceRelationshipFormed === YesOrNo.YES ||
      data.applicant1LastNameChangedWhenRelationshipFormed === YesOrNo.YES
        ? data.applicant1NameChangedHow
        : [],
  }),
  applicant2NameChangedHow: data => ({
    applicant2NameChangedHow:
      data.applicant2NameChangedSinceRelationshipFormed === YesOrNo.YES ||
      data.applicant2LastNameChangedWhenRelationshipFormed === YesOrNo.YES
        ? data.applicant2NameChangedHow
        : [],
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
  iConfirmPrayer: data => ({
    prayerHasBeenGiven: checkboxConverter(data.iConfirmPrayer),
  }),
  iBelieveApplicationIsTrue: data => ({
    statementOfTruth: checkboxConverter(data.iBelieveApplicationIsTrue),
  }),
};

const toApiDate = (date: CaseDate | undefined) => {
  if (!date?.year || !date?.month || !date?.day) {
    return '';
  }
  return date.year + '-' + date.month.padStart(2, '0') + '-' + date.day.padStart(2, '0');
};

export const toApiFormat = (data: Partial<Case>): CaseData => formatCase(fields, data);
