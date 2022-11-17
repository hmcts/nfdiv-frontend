import { invert } from 'lodash';

import { Case, Checkbox, LanguagePreference, formFieldsToCaseMapping, formatCase } from './case';
import { CaseData, ContactDetailsType, HowToRespondApplication, MarriageFormation, YesOrNo } from './definition';
import { fromApi as formatAddress } from './formatter/address';
import {
  fromApiApplicant1 as uploadedFilesFromApiApplicant1,
  fromApiApplicant2 as uploadedFilesFromApiApplicant2,
} from './formatter/uploaded-files';

type FromApiConverters = Partial<Record<keyof CaseData, string | ((data: Partial<CaseData>) => Partial<Case>)>>;

const checkboxConverter = (value: string | undefined) => {
  if (!value) {
    return undefined;
  }

  return value === YesOrNo.YES ? Checkbox.Checked : Checkbox.Unchecked;
};

const prayerConverter = (applicant: 'applicant1' | 'applicant2') => {
  return data => ({
    [`${applicant}IConfirmPrayer`]:
      data[`${applicant}PrayerDissolveDivorce`]?.length > 0 ||
      data[`${applicant}PrayerEndCivilPartnership`]?.length > 0 ||
      data[`${applicant}PrayerFinancialOrdersThemselves`]?.length > 0 ||
      data[`${applicant}PrayerFinancialOrdersChild`]?.length > 0
        ? Checkbox.Checked
        : Checkbox.Unchecked,
  });
};

const fields: FromApiConverters = {
  ...invert(formFieldsToCaseMapping),
  marriageFormationType: ({ marriageFormationType }) => ({
    sameSex: marriageFormationType === MarriageFormation.SAME_SEX_COUPLE ? Checkbox.Checked : Checkbox.Unchecked,
  }),
  marriageDate: data => ({
    relationshipDate: fromApiDate(data.marriageDate),
  }),
  doesApplicant1WantToApplyForFinalOrder: data => ({
    doesApplicant1WantToApplyForFinalOrder: checkboxConverter(data.doesApplicant1WantToApplyForFinalOrder),
  }),
  doesApplicant2WantToApplyForFinalOrder: data => ({
    doesApplicant2WantToApplyForFinalOrder: checkboxConverter(data.doesApplicant2WantToApplyForFinalOrder),
  }),
  applicant1LanguagePreferenceWelsh: data => ({
    applicant1EnglishOrWelsh:
      data.applicant1LanguagePreferenceWelsh === YesOrNo.YES ? LanguagePreference.Welsh : LanguagePreference.English,
  }),
  applicant2LanguagePreferenceWelsh: data => ({
    applicant2EnglishOrWelsh:
      data.applicant2LanguagePreferenceWelsh === YesOrNo.YES
        ? LanguagePreference.Welsh
        : data.applicant2LanguagePreferenceWelsh === null
        ? data.applicant2LanguagePreferenceWelsh
        : LanguagePreference.English,
  }),
  applicant1Address: data => formatAddress(data, 'applicant1'),
  applicant1AgreedToReceiveEmails: data => ({
    applicant1AgreeToReceiveEmails: checkboxConverter(data.applicant1AgreedToReceiveEmails),
  }),
  applicant2AgreedToReceiveEmails: data => ({
    applicant2AgreeToReceiveEmails: checkboxConverter(data.applicant2AgreedToReceiveEmails),
  }),
  applicant1KnowsApplicant2EmailAddress: data => ({
    applicant1DoesNotKnowApplicant2EmailAddress:
      data.applicant1KnowsApplicant2EmailAddress === YesOrNo.YES ? Checkbox.Unchecked : Checkbox.Checked,
  }),
  applicant1FinalOrderStatementOfTruth: data => ({
    applicant1FinalOrderStatementOfTruth: checkboxConverter(data.applicant1FinalOrderStatementOfTruth),
  }),
  applicant1ContactDetailsType: ({ applicant1ContactDetailsType }) => ({
    applicant1AddressPrivate: applicant1ContactDetailsType === ContactDetailsType.PRIVATE ? YesOrNo.YES : YesOrNo.NO,
  }),
  applicant1WantsToHavePapersServedAnotherWay: data => ({
    iWantToHavePapersServedAnotherWay: checkboxConverter(data.applicant1WantsToHavePapersServedAnotherWay),
  }),
  applicant2ContactDetailsType: ({ applicant2ContactDetailsType }) => ({
    applicant2AddressPrivate: applicant2ContactDetailsType === ContactDetailsType.PRIVATE ? YesOrNo.YES : YesOrNo.NO,
  }),
  applicant2Address: data => formatAddress(data, 'applicant2'),
  applicant1DocumentsUploaded: uploadedFilesFromApiApplicant1,
  applicant2DocumentsUploaded: uploadedFilesFromApiApplicant2,
  applicant1CannotUploadSupportingDocument: uploadedFilesFromApiApplicant1,
  applicant2CannotUploadSupportingDocument: uploadedFilesFromApiApplicant2,
  applicant1PrayerDissolveDivorce: prayerConverter('applicant1'),
  applicant1PrayerEndCivilPartnership: prayerConverter('applicant1'),
  applicant1PrayerFinancialOrdersThemselves: prayerConverter('applicant1'),
  applicant1PrayerFinancialOrdersChild: prayerConverter('applicant1'),
  applicant2PrayerDissolveDivorce: prayerConverter('applicant2'),
  applicant2PrayerEndCivilPartnership: prayerConverter('applicant2'),
  applicant2PrayerFinancialOrdersThemselves: prayerConverter('applicant2'),
  applicant2PrayerFinancialOrdersChild: prayerConverter('applicant2'),
  applicant1StatementOfTruth: data => ({
    applicant1StatementOfTruth: checkboxConverter(data.applicant1StatementOfTruth),
  }),
  applicant2StatementOfTruth: data => ({
    applicant2StatementOfTruth: checkboxConverter(data.applicant2StatementOfTruth),
  }),
  statementOfTruth: data => ({
    aosStatementOfTruth: checkboxConverter(data.statementOfTruth),
  }),
  confirmReadPetition: data => ({
    confirmReadPetition: checkboxConverter(data.confirmReadPetition),
  }),
  howToRespondApplication: ({ howToRespondApplication }) => ({
    disputeApplication:
      howToRespondApplication === HowToRespondApplication.DISPUTE_DIVORCE
        ? YesOrNo.YES
        : howToRespondApplication === null
        ? howToRespondApplication
        : YesOrNo.NO,
  }),
  coApplicant1StatementOfTruth: data => ({
    coApplicant1StatementOfTruth: checkboxConverter(data.coApplicant1StatementOfTruth),
  }),
  coApplicant2StatementOfTruth: data => ({
    coApplicant2StatementOfTruth: checkboxConverter(data.coApplicant2StatementOfTruth),
  }),
  coCannotUploadClarificationDocuments: data => ({
    coCannotUploadClarificationDocuments: checkboxConverter(data.coCannotUploadClarificationDocuments),
  }),
  coClarificationResponses: data => ({
    coClarificationResponses: data.coClarificationResponses?.length ? data.coClarificationResponses?.[0].value : '',
  }),
  applicant2SolicitorAddress: data => {
    const address = data.applicant2SolicitorAddress ? data.applicant2SolicitorAddress?.split('\n') : Array(7).fill('');
    return {
      applicant2SolicitorAddress: data.applicant2SolicitorAddress,
      applicant2SolicitorAddress1: address?.[0],
      applicant2SolicitorAddress2: address?.[1],
      applicant2SolicitorAddress3: address?.[2],
      applicant2SolicitorAddressTown: address?.[3],
      applicant2SolicitorAddressCounty: address?.[4],
      applicant2SolicitorAddressPostcode: address?.[5],
      applicant2SolicitorAddressCountry: address?.[6],
    };
  },
  previousState: 'previousState',
  applicant1SolicitorRepresented: 'applicant1SolicitorRepresented',
  applicant2Offline: 'applicant2Offline',
  switchedToSoleCo: 'switchedToSoleCo',
  applicant1AppliedForFinalOrderFirst: 'applicant1AppliedForFinalOrderFirst',
  applicant2AppliedForFinalOrderFirst: 'applicant2AppliedForFinalOrderFirst',
  coIsAdminClarificationSubmitted: 'coIsAdminClarificationSubmitted',
};

const fromApiDate = date => {
  if (!date) {
    return;
  }

  const [y, m, d] = date.split('-');
  return { year: `${+y}`, month: `${+m}`, day: `${+d}` };
};

export const fromApiFormat = (data: CaseData): Case => formatCase(fields, data);
