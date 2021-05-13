import { isInvalidHelpWithFeesRef } from '../form/validation';

import { Case, CaseDate, Checkbox, LanguagePreference, formFieldsToCaseMapping, formatCase } from './case';
import { CaseData, ConfidentialAddress, DivorceOrDissolution, Gender, YesOrNo } from './definition';
import { theirAddressToApi, yourAddressToApi } from './formatter/address';

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
    let inferredApplicant1Gender = data.gender;

    // Applicant 2 receives the request
    let inferredApplicant2Gender = data.gender;

    if (data.sameSex !== Checkbox.Checked) {
      if (data.divorceOrDissolution === DivorceOrDissolution.DISSOLUTION) {
        inferredApplicant1Gender = data.gender;
        inferredApplicant2Gender = data.gender === Gender.MALE ? Gender.FEMALE : Gender.MALE;
      } else {
        inferredApplicant1Gender = data.gender === Gender.MALE ? Gender.FEMALE : Gender.MALE;
        inferredApplicant2Gender = data.gender;
      }
    }

    return { inferredApplicant1Gender, inferredApplicant2Gender };
  },
  relationshipDate: data => ({
    marriageDate: toApiDate(data.relationshipDate),
  }),
  helpWithFeesRefNo: data => ({
    helpWithFeesReferenceNumber: !isInvalidHelpWithFeesRef(data.helpWithFeesRefNo) ? data.helpWithFeesRefNo : '',
  }),
  englishOrWelsh: data => ({
    languagePreferenceWelsh: data.englishOrWelsh === LanguagePreference.Welsh ? YesOrNo.YES : YesOrNo.NO,
  }),
  yourAddressPostcode: yourAddressToApi,
  agreeToReceiveEmails: data => ({
    applicant1AgreedToReceiveEmails: checkboxConverter(data.agreeToReceiveEmails),
  }),
  addressPrivate: data => ({
    applicant1ContactDetailsConfidential:
      data.addressPrivate === YesOrNo.YES ? ConfidentialAddress.KEEP : ConfidentialAddress.SHARE,
  }),
  theirAddressPostcode: theirAddressToApi,
  doNotKnowApplicant2EmailAddress: data => ({
    applicant1KnowsApplicant2EmailAddress:
      data.doNotKnowApplicant2EmailAddress === Checkbox.Checked ? YesOrNo.NO : YesOrNo.YES,
  }),
  iWantToHavePapersServedAnotherWay: data => ({
    applicant1WantsToHavePapersServedAnotherWay: checkboxConverter(data.iWantToHavePapersServedAnotherWay),
  }),
  legalProceedingsRelated: data => ({
    legalProceedingsRelated: data.legalProceedings === YesOrNo.YES ? data.legalProceedingsRelated : [],
  }),
  cannotUploadDocuments: data => ({
    cannotUploadSupportingDocument: data.cannotUploadDocuments
      ? !Array.isArray(data.cannotUploadDocuments)
        ? [data.cannotUploadDocuments]
        : data.cannotUploadDocuments
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
