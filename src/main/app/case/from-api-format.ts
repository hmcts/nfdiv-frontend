import { invert } from 'lodash';

import { Case, Checkbox, LanguagePreference, formFieldsToCaseMapping, formatCase } from './case';
import { CaseData, ConfidentialAddress, YesOrNo } from './definition';
import { fromApi as formatAddress } from './formatter/address';

type FromApiConverters = Partial<Record<keyof CaseData, string | ((data: Partial<CaseData>) => Partial<Case>)>>;

const checkboxConverter = (value: string | undefined) => {
  if (!value) {
    return undefined;
  }

  return value === YesOrNo.YES ? Checkbox.Checked : Checkbox.Unchecked;
};

const fields: FromApiConverters = {
  ...invert(formFieldsToCaseMapping),
  marriageIsSameSexCouple: data => ({
    sameSex: checkboxConverter(data.marriageIsSameSexCouple),
  }),
  marriageDate: data => ({
    relationshipDate: fromApiDate(data.marriageDate),
  }),
  languagePreferenceWelsh: data => ({
    englishOrWelsh:
      data.languagePreferenceWelsh === YesOrNo.YES ? LanguagePreference.Welsh : LanguagePreference.English,
  }),
  applicant1HomeAddress: data => formatAddress(data, 'applicant1'),
  applicant1AgreedToReceiveEmails: data => ({
    applicant1AgreeToReceiveEmails: checkboxConverter(data.applicant1AgreedToReceiveEmails),
  }),
  applicant1KnowsApplicant2EmailAddress: data => ({
    applicant1DoesNotKnowApplicant2EmailAddress:
      data.applicant1KnowsApplicant2EmailAddress === YesOrNo.YES ? Checkbox.Unchecked : Checkbox.Checked,
  }),
  applicant1ContactDetailsConfidential: data => ({
    applicant1AddressPrivate:
      data.applicant1ContactDetailsConfidential === ConfidentialAddress.KEEP ? YesOrNo.YES : YesOrNo.NO,
  }),
  applicant1WantsToHavePapersServedAnotherWay: data => ({
    iWantToHavePapersServedAnotherWay: checkboxConverter(data.applicant1WantsToHavePapersServedAnotherWay),
  }),
  applicant2HomeAddress: data => formatAddress(data, 'applicant2'),
  cannotUploadSupportingDocument: data => ({
    uploadedFiles:
      data.documentsUploaded?.map(file => ({
        id: `${file.id}`,
        name: `${file.value?.documentFileName}`,
      })) || [],
    documentsUploaded: data.documentsUploaded,
    cannotUpload: data.cannotUploadSupportingDocument?.length ? Checkbox.Checked : Checkbox.Unchecked,
    cannotUploadDocuments: data.cannotUploadSupportingDocument,
  }),
  prayerHasBeenGiven: data => ({
    iConfirmPrayer: checkboxConverter(data.prayerHasBeenGiven),
  }),
  statementOfTruth: data => ({
    iBelieveApplicationIsTrue: checkboxConverter(data.statementOfTruth),
  }),
};

const fromApiDate = date => {
  if (!date) {
    return;
  }

  const [y, m, d] = date.split('-');
  return { year: `${+y}`, month: `${+m}`, day: `${+d}` };
};

export const fromApiFormat = (data: CaseData): Case => formatCase(fields, data);
