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
    // Petitioner makes the request
    let inferredPetitionerGender = data.gender;

    // Respondent receives the request
    let inferredRespondentGender = data.gender;

    if (data.sameSex !== Checkbox.Checked) {
      if (data.divorceOrDissolution === DivorceOrDissolution.DISSOLUTION) {
        inferredPetitionerGender = data.gender;
        inferredRespondentGender = data.gender === Gender.MALE ? Gender.FEMALE : Gender.MALE;
      } else {
        inferredPetitionerGender = data.gender === Gender.MALE ? Gender.FEMALE : Gender.MALE;
        inferredRespondentGender = data.gender;
      }
    }

    return { inferredPetitionerGender, inferredRespondentGender };
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
    petitionerAgreedToReceiveEmails: checkboxConverter(data.agreeToReceiveEmails),
  }),
  addressPrivate: data => ({
    petitionerContactDetailsConfidential:
      data.addressPrivate === YesOrNo.YES ? ConfidentialAddress.KEEP : ConfidentialAddress.SHARE,
  }),
  theirAddressPostcode: theirAddressToApi,
  doNotKnowRespondentEmailAddress: data => ({
    petitionerKnowsRespondentsEmailAddress:
      data.doNotKnowRespondentEmailAddress === Checkbox.Checked ? YesOrNo.NO : YesOrNo.YES,
  }),
  iWantToHavePapersServedAnotherWay: data => ({
    petitionerWantsToHavePapersServedAnotherWay: checkboxConverter(data.iWantToHavePapersServedAnotherWay),
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
