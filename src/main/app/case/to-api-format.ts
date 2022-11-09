import { isInvalidHelpWithFeesRef } from '../form/validation';

import { Case, CaseDate, Checkbox, LanguagePreference, formFieldsToCaseMapping, formatCase } from './case';
import {
  Applicant2Represented,
  ApplicationType,
  CaseData,
  ChangedNameHow,
  ContactDetailsType,
  DissolveDivorce,
  DivorceOrDissolution,
  EndCivilPartnership,
  FinancialOrderFor,
  FinancialOrdersChild,
  FinancialOrdersThemselves,
  Gender,
  HowToRespondApplication,
  MarriageFormation,
  YesOrNo,
} from './definition';
import { applicant1AddressToApi, applicant2AddressToApi } from './formatter/address';

export type OrNull<T> = { [K in keyof T]: T[K] | null };

type ToApiConverters = Partial<Record<keyof Case, string | ((data: Case) => OrNull<Partial<CaseData>>)>>;

const checkboxConverter = (value: string | undefined) => {
  if (value === null) {
    return null;
  }

  return value === Checkbox.Checked ? YesOrNo.YES : YesOrNo.NO;
};

const prayerConverter = (applicant: 'applicant1' | 'applicant2') => {
  return data => {
    const isDivorce = data.divorceOrDissolution === DivorceOrDissolution.DIVORCE;
    const confirmPrayer = data[`${applicant}IConfirmPrayer`];
    const orderFor = data[`${applicant}WhoIsFinancialOrderFor`];
    const dissolveDivorce = confirmPrayer && isDivorce ? [DissolveDivorce.DISSOLVE_DIVORCE] : [];
    const endCivil = confirmPrayer && !isDivorce ? [EndCivilPartnership.END_CIVIL_PARTNERSHIP] : [];
    const orderForThemselves =
      confirmPrayer && orderFor?.includes(FinancialOrderFor.APPLICANT)
        ? [FinancialOrdersThemselves.FINANCIAL_ORDERS_THEMSELVES]
        : [];
    const orderForChild =
      confirmPrayer && orderFor?.includes(FinancialOrderFor.CHILDREN)
        ? [FinancialOrdersChild.FINANCIAL_ORDERS_CHILD]
        : [];

    return {
      [`${applicant}PrayerDissolveDivorce`]: dissolveDivorce,
      [`${applicant}PrayerEndCivilPartnership`]: endCivil,
      [`${applicant}PrayerFinancialOrdersThemselves`]: orderForThemselves,
      [`${applicant}PrayerFinancialOrdersChild`]: orderForChild,
    };
  };
};

const fields: ToApiConverters = {
  ...formFieldsToCaseMapping,
  sameSex: ({ sameSex }) => ({
    marriageFormationType:
      sameSex === Checkbox.Checked ? MarriageFormation.SAME_SEX_COUPLE : MarriageFormation.OPPOSITE_SEX_COUPLE,
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
  applicationType: data => ({
    applicationType: data.applicationType,
    ...(data.applicationType === ApplicationType.JOINT_APPLICATION
      ? setUnreachableAnswersToNull([
          'applicant1IsApplicant2Represented',
          'applicant2SolicitorRepresented',
          'applicant2SolicitorName',
          'applicant2SolicitorEmail',
          'applicant2SolicitorFirmName',
          'applicant2SolicitorAddress',
        ])
      : {}),
  }),
  relationshipDate: data => ({
    marriageDate: toApiDate(data.relationshipDate),
  }),
  doesApplicant1WantToApplyForFinalOrder: data => ({
    doesApplicant1WantToApplyForFinalOrder: checkboxConverter(data.doesApplicant1WantToApplyForFinalOrder),
  }),
  doesApplicant2WantToApplyForFinalOrder: data => ({
    doesApplicant2WantToApplyForFinalOrder: checkboxConverter(data.doesApplicant2WantToApplyForFinalOrder),
  }),
  applicant1FinalOrderStatementOfTruth: data => ({
    applicant1FinalOrderStatementOfTruth: checkboxConverter(data.applicant1FinalOrderStatementOfTruth),
  }),
  applicant1HelpWithFeesRefNo: data => ({
    applicant1HWFReferenceNumber: !isInvalidHelpWithFeesRef(data.applicant1HelpWithFeesRefNo)
      ? data.applicant1HelpWithFeesRefNo
      : '',
  }),
  applicant2HelpWithFeesRefNo: data => ({
    applicant2HWFReferenceNumber: !isInvalidHelpWithFeesRef(data.applicant2HelpWithFeesRefNo)
      ? data.applicant2HelpWithFeesRefNo
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
  applicant1AddressPrivate: ({ applicant1AddressPrivate }) => ({
    applicant1ContactDetailsType:
      applicant1AddressPrivate === YesOrNo.YES ? ContactDetailsType.PRIVATE : ContactDetailsType.PUBLIC,
  }),
  applicant2AddressPrivate: ({ applicant2AddressPrivate }) => ({
    applicant2ContactDetailsType:
      applicant2AddressPrivate === YesOrNo.YES ? ContactDetailsType.PRIVATE : ContactDetailsType.PUBLIC,
  }),
  applicant2AddressPostcode: applicant2AddressToApi,
  applicant1DoesNotKnowApplicant2EmailAddress: data => ({
    applicant1KnowsApplicant2EmailAddress:
      data.applicant1DoesNotKnowApplicant2EmailAddress === Checkbox.Checked ? YesOrNo.NO : YesOrNo.YES,
  }),
  iWantToHavePapersServedAnotherWay: data => ({
    applicant1WantsToHavePapersServedAnotherWay: checkboxConverter(data.iWantToHavePapersServedAnotherWay),
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
    applicant1CannotUpload: data.applicant1CannotUploadDocuments?.length ? YesOrNo.YES : YesOrNo.NO,
  }),
  applicant2CannotUploadDocuments: data => ({
    applicant2CannotUploadSupportingDocument: data.applicant2CannotUploadDocuments
      ? !Array.isArray(data.applicant2CannotUploadDocuments)
        ? [data.applicant2CannotUploadDocuments]
        : data.applicant2CannotUploadDocuments
      : [],
    applicant2CannotUpload: data.applicant2CannotUploadDocuments?.length ? YesOrNo.YES : YesOrNo.NO,
  }),
  applicant1IConfirmPrayer: prayerConverter('applicant1'),
  applicant2IConfirmPrayer: prayerConverter('applicant2'),
  applicant1StatementOfTruth: data => ({
    applicant1StatementOfTruth: checkboxConverter(data.applicant1StatementOfTruth),
  }),
  applicant2StatementOfTruth: data => ({
    applicant2StatementOfTruth: checkboxConverter(data.applicant2StatementOfTruth),
  }),
  aosStatementOfTruth: data => ({
    statementOfTruth: checkboxConverter(data.aosStatementOfTruth),
  }),
  applicant1UploadedFiles: () => ({}),
  coClarificationUploadedFiles: () => ({}),
  applicant2UploadedFiles: () => ({}),
  confirmReadPetition: data => ({
    confirmReadPetition: checkboxConverter(data.confirmReadPetition),
  }),
  applicant1LastNameChangedWhenRelationshipFormed: data => ({
    applicant1LastNameChangedWhenMarried: data.applicant1LastNameChangedWhenRelationshipFormed,
    ...(data.applicant1LastNameChangedWhenRelationshipFormed === YesOrNo.NO &&
    data.applicant1NameChangedSinceRelationshipFormed === YesOrNo.NO
      ? setUnreachableAnswersToNull(['applicant1NameChangedHow', 'applicant1NameChangedHowOtherDetails'])
      : {}),
  }),
  applicant2LastNameChangedWhenRelationshipFormed: data => ({
    applicant2LastNameChangedWhenMarried: data.applicant2LastNameChangedWhenRelationshipFormed,
    ...(data.applicant2LastNameChangedWhenRelationshipFormed === YesOrNo.NO &&
    data.applicant2NameChangedSinceRelationshipFormed === YesOrNo.NO
      ? setUnreachableAnswersToNull(['applicant2NameChangedHow', 'applicant2NameChangedHowOtherDetails'])
      : {}),
  }),
  applicant1HelpPayingNeeded: data => ({
    applicant1HWFNeedHelp: data.applicant1HelpPayingNeeded,
    ...(data.applicant1HelpPayingNeeded === YesOrNo.NO
      ? setUnreachableAnswersToNull(['applicant1HWFAppliedForFees', 'applicant1HWFReferenceNumber'])
      : {}),
  }),
  applicant2HelpPayingNeeded: data => ({
    applicant2HWFNeedHelp: data.applicant2HelpPayingNeeded,
    ...(data.applicant2HelpPayingNeeded === YesOrNo.NO
      ? setUnreachableAnswersToNull(['applicant2HWFAppliedForFees', 'applicant2HWFReferenceNumber'])
      : {}),
  }),
  applicant1IsApplicant2Represented: data => ({
    applicant1IsApplicant2Represented: data.applicant1IsApplicant2Represented,
    ...(data.applicant1IsApplicant2Represented !== Applicant2Represented.YES
      ? setUnreachableAnswersToNull([
          'applicant2SolicitorName',
          'applicant2SolicitorEmail',
          'applicant2SolicitorFirmName',
          'applicant2SolicitorAddress',
        ])
      : {}),
  }),
  applicant1KnowsApplicant2Address: data => ({
    applicant1KnowsApplicant2Address: data.applicant1KnowsApplicant2Address,
    ...(data.applicant1KnowsApplicant2Address === YesOrNo.NO
      ? applicant2AddressToApi(
          setUnreachableAnswersToNull([
            'applicant2Address1',
            'applicant2Address2',
            'applicant2Address3',
            'applicant2AddressCountry',
            'applicant2AddressCounty',
            'applicant2AddressPostcode',
            'applicant2AddressTown',
          ])
        )
      : setUnreachableAnswersToNull(['applicant1WantsToHavePapersServedAnotherWay'])),
  }),
  inTheUk: data => ({
    marriageMarriedInUk: data.inTheUk,
    ...(data.inTheUk === YesOrNo.YES
      ? setUnreachableAnswersToNull([
          'marriageCertificateInEnglish',
          'marriageCertifiedTranslation',
          'marriageCountryOfMarriage',
          'marriagePlaceOfMarriage',
        ])
      : {}),
  }),
  certificateInEnglish: data => ({
    marriageCertificateInEnglish: data.certificateInEnglish,
    ...(data.certificateInEnglish !== YesOrNo.NO ? setUnreachableAnswersToNull(['marriageCertifiedTranslation']) : {}),
  }),
  applicant1LegalProceedings: data => ({
    applicant1LegalProceedings: data.applicant1LegalProceedings,
    ...(data.applicant1LegalProceedings !== YesOrNo.YES
      ? setUnreachableAnswersToNull(['applicant1LegalProceedingsDetails'])
      : {}),
  }),
  applicant2LegalProceedings: data => ({
    applicant2LegalProceedings: data.applicant2LegalProceedings,
    ...(data.applicant2LegalProceedings !== YesOrNo.YES
      ? setUnreachableAnswersToNull(['applicant2LegalProceedingsDetails'])
      : {}),
  }),
  disputeApplication: ({ disputeApplication }) => ({
    howToRespondApplication:
      disputeApplication === YesOrNo.YES
        ? HowToRespondApplication.DISPUTE_DIVORCE
        : HowToRespondApplication.WITHOUT_DISPUTE_DIVORCE,
  }),
  coApplicant1StatementOfTruth: data => ({
    coApplicant1StatementOfTruth: checkboxConverter(data.coApplicant1StatementOfTruth),
  }),
  coApplicant2StatementOfTruth: data => ({
    coApplicant2StatementOfTruth: checkboxConverter(data.coApplicant2StatementOfTruth),
  }),
  applicant1WhoIsFinancialOrderFor: data => ({
    applicant1FinancialOrdersFor:
      data.applicant1ApplyForFinancialOrder === YesOrNo.YES ? data.applicant1WhoIsFinancialOrderFor : [],
  }),
  applicant2WhoIsFinancialOrderFor: data => ({
    applicant2FinancialOrdersFor:
      data.applicant2ApplyForFinancialOrder === YesOrNo.YES ? data.applicant2WhoIsFinancialOrderFor : [],
  }),
  coCannotUploadClarificationDocuments: data => ({
    coCannotUploadClarificationDocuments: checkboxConverter(data.coCannotUploadClarificationDocuments),
  }),
  coClarificationResponses: data => ({
    coClarificationResponses: data.coClarificationResponses
      ? [
          {
            id: '1',
            value: data.coClarificationResponses,
          },
        ]
      : [],
  }),
  applicant2SolicitorAddress1: data => ({
    applicant2SolicitorAddress: addressConverter([
      data.applicant2SolicitorAddress1,
      data.applicant2SolicitorAddress2,
      data.applicant2SolicitorAddress3,
      data.applicant2SolicitorAddressTown,
      data.applicant2SolicitorAddressCounty,
      data.applicant2SolicitorAddressPostcode,
      data.applicant2SolicitorAddressCountry,
    ]),
  }),
  applicant1IntendsToSwitchToSole: data => ({
    applicant1IntendsToSwitchToSole: checkboxConverter(data.applicant1IntendsToSwitchToSole),
  }),
  applicant2IntendsToSwitchToSole: data => ({
    applicant2IntendsToSwitchToSole: checkboxConverter(data.applicant2IntendsToSwitchToSole),
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

const addressConverter = (address: (string | undefined)[]) => (address.some(Boolean) ? address.join('\n') : '');

const setUnreachableAnswersToNull = (properties: string[]): Record<string, null> =>
  properties.reduce((arr: Record<string, null>, property: string) => ({ ...arr, [property]: null }), {});

export const toApiFormat = (data: Partial<Case>): CaseData => formatCase(fields, data);
