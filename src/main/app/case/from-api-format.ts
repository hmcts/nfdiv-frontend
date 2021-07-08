import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { invert } from 'lodash';

import {
  Case,
  Checkbox,
  LanguagePreference,
  formFieldsToCaseMapping,
  formatCase,
  readOnlyFormFieldsToCaseMapping,
} from './case';
import { CaseData, ConfidentialAddress, YesOrNo } from './definition';
import { fromApi as formatAddress } from './formatter/address';
import { fromApi as uploadedFilesFromApi } from './formatter/uploaded-files';

dayjs.extend(advancedFormat);

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
  applicant1LanguagePreferenceWelsh: data => ({
    englishOrWelsh:
      data.applicant1LanguagePreferenceWelsh === YesOrNo.YES ? LanguagePreference.Welsh : LanguagePreference.English,
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
  applicant2ContactDetailsConfidential: data => ({
    applicant2AddressPrivate:
      data.applicant2ContactDetailsConfidential === ConfidentialAddress.KEEP ? YesOrNo.YES : YesOrNo.NO,
  }),
  applicant2HomeAddress: data => formatAddress(data, 'applicant2'),
  documentsUploaded: uploadedFilesFromApi,
  cannotUploadSupportingDocument: uploadedFilesFromApi,
  prayerHasBeenGiven: data => ({
    iConfirmPrayer: checkboxConverter(data.prayerHasBeenGiven),
  }),
  statementOfTruth: data => ({
    iBelieveApplicationIsTrue: checkboxConverter(data.statementOfTruth),
  }),
  dateSubmitted: data => ({
    dateSubmitted: new Date(data.dateSubmitted as string),
  }),
  dueDate: data => ({
    dueDate: dayjs(data.dueDate).format('MMMM Do YYYY'),
  }),
};

const fromApiDate = date => {
  if (!date) {
    return;
  }

  const [y, m, d] = date.split('-');
  return { year: `${+y}`, month: `${+m}`, day: `${+d}` };
};

export const fromApiFormat = (data: CaseData): Case =>
  formatCase({ ...fields, ...readOnlyFormFieldsToCaseMapping }, data);
