import { isInvalidHelpWithFeesRef } from '../form/validation';

import { Case, CaseDate, Checkbox, LanguagePreference, formFieldsToCaseMapping, formatCase } from './case';
import {
  AlternativeServiceDifferentWays,
  AlternativeServiceMethod,
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
import {
  applicant1AddressToApi,
  applicant1NoResponsePartnerAddressToApi,
  applicant2AddressToApi,
} from './formatter/address';

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
          'applicant2SolicitorAddressOverseas',
        ])
      : {}),
  }),
  relationshipDate: data => ({
    marriageDate: toApiDate(data.relationshipDate),
  }),
  applicant1BailiffPartnersDateOfBirth: data => ({
    applicant1BailiffPartnersDateOfBirth: toApiDate(data.applicant1BailiffPartnersDateOfBirth),
  }),
  applicant1BailiffKnowPartnersDateOfBirth: data => ({
    applicant1BailiffKnowPartnersDateOfBirth: data.applicant1BailiffKnowPartnersDateOfBirth,
    ...setUnreachableAnswersToNull([
      data.applicant1BailiffKnowPartnersDateOfBirth === YesOrNo.YES
        ? 'applicant1BailiffPartnersApproximateAge'
        : 'applicant1BailiffPartnersDateOfBirth',
    ]),
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
  applicant2FinalOrderStatementOfTruth: data => ({
    applicant2FinalOrderStatementOfTruth: checkboxConverter(data.applicant2FinalOrderStatementOfTruth),
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
  applicant1InRefuge: ({ applicant1InRefuge }) => ({
    applicant1InRefuge: applicant1InRefuge ?? YesOrNo.NO, // Default to YesOrNo.NO if undefined
  }),
  applicant1AddressOverseas: ({ applicant1AddressOverseas }) => ({
    applicant1AddressOverseas: applicant1AddressOverseas ?? YesOrNo.NO,
  }),
  applicant2AddressPrivate: ({ applicant2AddressPrivate }) => ({
    applicant2ContactDetailsType:
      applicant2AddressPrivate === YesOrNo.YES ? ContactDetailsType.PRIVATE : ContactDetailsType.PUBLIC,
  }),
  applicant2InRefuge: ({ applicant2InRefuge }) => ({
    applicant2InRefuge: applicant2InRefuge ?? YesOrNo.NO, // Default to YesOrNo.NO if undefined
  }),
  applicant2AddressPostcode: applicant2AddressToApi,
  applicant1DoesNotKnowApplicant2EmailAddress: data => ({
    applicant1KnowsApplicant2EmailAddress:
      data.applicant1DoesNotKnowApplicant2EmailAddress === Checkbox.Checked ? YesOrNo.NO : YesOrNo.YES,
  }),
  iWantToHavePapersServedAnotherWay: data => ({
    applicant1WantsToHavePapersServedAnotherWay: checkboxConverter(data.iWantToHavePapersServedAnotherWay),
  }),
  applicant1NameChangedHowOtherDetails: data => ({
    applicant1NameChangedHowOtherDetails: data.applicant1NameChangedHow?.includes(ChangedNameHow.OTHER)
      ? data.applicant1NameChangedHowOtherDetails
      : '',
  }),
  applicant2NameChangedHowOtherDetails: data => ({
    applicant2NameChangedHowOtherDetails: data.applicant2NameChangedHow?.includes(ChangedNameHow.OTHER)
      ? data.applicant2NameChangedHowOtherDetails
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
  applicant1LastNameChangedWhenMarriedMethod: data => ({
    applicant1LastNameChangedWhenMarriedMethod:
      data.applicant1LastNameChangedWhenMarried === YesOrNo.YES ? data.applicant1LastNameChangedWhenMarriedMethod : [],
  }),
  applicant1LastNameChangedWhenMarriedOtherDetails: data => ({
    applicant1LastNameChangedWhenMarriedOtherDetails: data.applicant1LastNameChangedWhenMarriedMethod?.includes(
      ChangedNameHow.OTHER
    )
      ? data.applicant1LastNameChangedWhenMarriedOtherDetails
      : '',
  }),
  applicant2LastNameChangedWhenMarriedMethod: data => ({
    applicant2LastNameChangedWhenMarriedMethod:
      data.applicant2LastNameChangedWhenMarried === YesOrNo.YES ? data.applicant2LastNameChangedWhenMarriedMethod : [],
  }),
  applicant2LastNameChangedWhenMarriedOtherDetails: data => ({
    applicant2LastNameChangedWhenMarriedOtherDetails: data.applicant2LastNameChangedWhenMarriedMethod?.includes(
      ChangedNameHow.OTHER
    )
      ? data.applicant2LastNameChangedWhenMarriedOtherDetails
      : '',
  }),
  applicant1NameDifferentToMarriageCertificateMethod: data => ({
    applicant1NameDifferentToMarriageCertificateMethod:
      data.applicant1NameDifferentToMarriageCertificate === YesOrNo.YES
        ? data.applicant1NameDifferentToMarriageCertificateMethod
        : [],
  }),
  applicant1NameDifferentToMarriageCertificateOtherDetails: data => ({
    applicant1NameDifferentToMarriageCertificateOtherDetails:
      data.applicant1NameDifferentToMarriageCertificateMethod?.includes(ChangedNameHow.OTHER)
        ? data.applicant1NameDifferentToMarriageCertificateOtherDetails
        : '',
  }),
  applicant2NameDifferentToMarriageCertificateMethod: data => ({
    applicant2NameDifferentToMarriageCertificateMethod:
      data.applicant2NameDifferentToMarriageCertificate === YesOrNo.YES
        ? data.applicant2NameDifferentToMarriageCertificateMethod
        : [],
  }),
  applicant2NameDifferentToMarriageCertificateOtherDetails: data => ({
    applicant2NameDifferentToMarriageCertificateOtherDetails:
      data.applicant2NameDifferentToMarriageCertificateMethod?.includes(ChangedNameHow.OTHER)
        ? data.applicant2NameDifferentToMarriageCertificateOtherDetails
        : '',
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
  applicant2FoHelpPayingNeeded: data => ({
    applicant2FoHWFNeedHelp: data.applicant2FoHelpPayingNeeded,
    ...(data.applicant2FoHelpPayingNeeded === YesOrNo.NO
      ? setUnreachableAnswersToNull(['applicant2FoHWFAppliedForFees', 'applicant2FoHWFReferenceNumber'])
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
          'applicant2SolicitorAddressOverseas',
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
  applicant2AddressOverseas: ({ applicant2AddressOverseas }) => ({
    applicant2AddressOverseas: applicant2AddressOverseas ?? YesOrNo.NO,
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
      ? setUnreachableAnswersToNull(['applicant2LegalProceedingsDetails', 'applicant2LegalProceedingsConcluded'])
      : {}),
  }),
  applicant2UnableToUploadEvidence: data => ({
    applicant2UnableToUploadEvidence: checkboxConverter(data.applicant2UnableToUploadEvidence),
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
  applicant2SolicitorAddressOverseas: ({ applicant2SolicitorAddressOverseas }) => ({
    applicant2SolicitorAddressOverseas: applicant2SolicitorAddressOverseas ?? YesOrNo.NO,
  }),
  applicant1IntendsToSwitchToSole: data => ({
    applicant1IntendsToSwitchToSole: [checkboxConverter(data.applicant1IntendsToSwitchToSole)],
  }),
  applicant2IntendsToSwitchToSole: data => ({
    applicant2IntendsToSwitchToSole: [checkboxConverter(data.applicant2IntendsToSwitchToSole)],
  }),
  app1RfiDraftResponseCannotUploadDocs: data => ({
    app1RfiDraftResponseCannotUploadDocs: checkboxConverter(data.app1RfiDraftResponseCannotUploadDocs),
  }),
  app1RfiDraftResponseDetails: data => ({
    app1RfiDraftResponseDetails: data.app1RfiDraftResponseDetails,
  }),
  app1RfiDraftResponseUploadedFiles: () => ({}),
  app2RfiDraftResponseCannotUploadDocs: data => ({
    app2RfiDraftResponseCannotUploadDocs: checkboxConverter(data.app2RfiDraftResponseCannotUploadDocs),
  }),
  app2RfiDraftResponseDetails: data => ({
    app2RfiDraftResponseDetails: data.app2RfiDraftResponseDetails,
  }),
  app2RfiDraftResponseUploadedFiles: () => ({}),
  applicant1NoResponseCheckContactDetails: data => ({
    applicant1NoResponseCheckContactDetails: data.applicant1NoResponseCheckContactDetails,
  }),
  applicant1NoResponseProvidePartnerNewEmailOrAlternativeService: data => ({
    applicant1NoResponseProvidePartnerNewEmailOrAlternativeService:
      data.applicant1NoResponseProvidePartnerNewEmailOrAlternativeService,
  }),
  applicant1NoResponsePartnerNewEmailOrPostalAddress: data => ({
    applicant1NoResponsePartnerNewEmailOrPostalAddress: data.applicant1NoResponsePartnerNewEmailOrPostalAddress,
  }),
  applicant1NoResponsePartnerHasReceivedPapers: data => ({
    applicant1NoResponsePartnerHasReceivedPapers: data.applicant1NoResponsePartnerHasReceivedPapers,
  }),
  applicant1NoResponseNoNewAddressDetails: data => ({
    applicant1NoResponseNoNewAddressDetails: data.applicant1NoResponseNoNewAddressDetails,
  }),
  applicant1NoResponseProcessServerOrBailiff: data => ({
    applicant1NoResponseProcessServerOrBailiff: data.applicant1NoResponseProcessServerOrBailiff,
  }),
  applicant1NoResponsePartnerEmailAddress: data => ({
    applicant1NoResponsePartnerEmailAddress: data.applicant1NoResponsePartnerEmailAddress,
  }),
  applicant1InterimAppsIUnderstand: data => ({
    applicant1InterimAppsIUnderstand: checkboxConverter(data.applicant1InterimAppsIUnderstand),
  }),
  applicant1InterimAppsUseHelpWithFees: data => ({
    applicant1InterimAppsUseHelpWithFees: data.applicant1InterimAppsUseHelpWithFees,
    ...(data.applicant1InterimAppsUseHelpWithFees === YesOrNo.NO
      ? setUnreachableAnswersToNull(['applicant1InterimAppsHaveHwfReference', 'applicant1InterimAppsHwfRefNumber'])
      : {}),
  }),
  applicant1InterimAppsHwfRefNumber: data => ({
    applicant1InterimAppsHwfRefNumber: !isInvalidHelpWithFeesRef(data.applicant1InterimAppsHwfRefNumber)
      ? data.applicant1InterimAppsHwfRefNumber
      : '',
    applicant1InterimAppsHaveHwfReference:
      data.applicant1InterimAppsHwfRefNumber === '' ? data.applicant1InterimAppsHaveHwfReference : YesOrNo.YES,
  }),
  applicant1InterimAppsEvidenceUploadedFiles: () => ({}),
  applicant1InterimAppsCannotUploadDocs: data => ({
    applicant1InterimAppsCannotUploadDocs: checkboxConverter(data.applicant1InterimAppsCannotUploadDocs),
  }),
  applicant1InterimAppsCanUploadEvidence: data => ({
    applicant1InterimAppsCanUploadEvidence: data.applicant1InterimAppsCanUploadEvidence,
    ...(data.applicant1InterimAppsCanUploadEvidence === YesOrNo.YES
      ? setUnreachableAnswersToNull(['applicant1DeemedNoEvidenceStatement'])
      : setUnreachableAnswersToNull(['applicant1DeemedEvidenceDetails', 'applicant1InterimAppsCannotUploadDocs'])),
  }),
  applicant1InterimAppsStatementOfTruth: data => ({
    applicant1InterimAppsStatementOfTruth: checkboxConverter(data.applicant1InterimAppsStatementOfTruth),
  }),
  applicant1NoResponseRespondentAddressInEnglandWales: data => ({
    applicant1NoResponseRespondentAddressInEnglandWales: checkboxConverter(
      data.applicant1NoResponseRespondentAddressInEnglandWales
    ),
  }),
  applicant2LegalProceedingUploadedFiles: () => ({}),
  applicant1NoResponsePartnerAddressPostcode: applicant1NoResponsePartnerAddressToApi,
  applicant1NoResponsePartnerAddressOverseas: ({ applicant1NoResponsePartnerAddressOverseas }) => ({
    applicant1NoResponsePartnerAddressOverseas: applicant1NoResponsePartnerAddressOverseas ?? YesOrNo.NO,
  }),
  applicant1SearchGovRecordsWhichDepartments: data => ({
    applicant1SearchGovRecordsWhichDepartments: data.applicant1SearchGovRecordsWhichDepartments,
  }),
  applicant1SearchGovRecordsWhyTheseDepartments: data => ({
    applicant1SearchGovRecordsWhyTheseDepartments: data.applicant1SearchGovRecordsWhyTheseDepartments,
  }),
  applicant1AltServicePartnerEmail: data => ({
    applicant1AltServicePartnerEmail:
      data.applicant1AltServiceMethod === AlternativeServiceMethod.EMAIL
        ? data.applicant1AltServicePartnerEmail
        : data.applicant1AltServiceMethod === AlternativeServiceMethod.EMAIL_AND_DIFFERENT
          ? data.applicant1AltServicePartnerEmailWhenDifferent
          : null,
  }),
  applicant1AltServicePartnerEmailWhenDifferent: data => ({
    applicant1AltServicePartnerEmail:
      data.applicant1AltServiceMethod === AlternativeServiceMethod.EMAIL
        ? data.applicant1AltServicePartnerEmail
        : data.applicant1AltServiceMethod === AlternativeServiceMethod.EMAIL_AND_DIFFERENT
          ? data.applicant1AltServicePartnerEmailWhenDifferent
          : null,
  }),
  applicant1AltServicePartnerPhone: data => ({
    applicant1AltServicePartnerPhone: data.applicant1AltServiceDifferentWays?.includes(
      AlternativeServiceDifferentWays.TEXT_MESSAGE
    )
      ? data.applicant1AltServicePartnerPhone
      : null,
  }),
  applicant1AltServicePartnerWANum: data => ({
    applicant1AltServicePartnerWANum: data.applicant1AltServiceDifferentWays?.includes(
      AlternativeServiceDifferentWays.WHATSAPP
    )
      ? data.applicant1AltServicePartnerWANum
      : null,
  }),
  applicant1AltServicePartnerSocialDetails: data => ({
    applicant1AltServicePartnerSocialDetails: data.applicant1AltServiceDifferentWays?.includes(
      AlternativeServiceDifferentWays.SOCIAL_MEDIA
    )
      ? data.applicant1AltServicePartnerSocialDetails
      : null,
  }),
  applicant1AltServicePartnerOtherDetails: data => ({
    applicant1AltServicePartnerOtherDetails: data.applicant1AltServiceDifferentWays?.includes(
      AlternativeServiceDifferentWays.OTHER
    )
      ? data.applicant1AltServicePartnerOtherDetails
      : null,
  }),
};

const toApiDate = (date: CaseDate | undefined | string) => {
  if (typeof date === 'string') {
    return date || undefined;
  }

  if (!date?.year || !date?.month || !date?.day) {
    return undefined;
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

const setUnreachableAnswersToNull = (
  properties: (keyof Partial<Case> | keyof Partial<CaseData>)[]
): Record<string, null> =>
  properties.reduce((arr: Record<string, null>, property: string) => ({ ...arr, [property]: null }), {});

export const toApiFormat = (data: Partial<Case>): CaseData => formatCase(fields, data);
