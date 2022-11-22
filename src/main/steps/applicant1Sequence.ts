import { CaseWithId, Checkbox } from '../app/case/case';
import {
  Applicant2Represented,
  ApplicationType,
  JurisdictionConnections,
  State,
  YesOrNo,
} from '../app/case/definition';
import { isLessThanAYear } from '../app/form/validation';
import {
  allowedToAnswerResidualJurisdiction,
  previousConnectionMadeUptoLastHabituallyResident,
} from '../app/jurisdiction/connections';

import { isApplicant2EmailUpdatePossible } from './common/content.utils';
import {
  ADDRESS_PRIVATE,
  APPLICATION_ENDED,
  APPLICATION_SUBMITTED,
  APPLY_FINANCIAL_ORDER,
  APPLY_FINANCIAL_ORDER_DETAILS,
  CERTIFICATE_IN_ENGLISH,
  CERTIFICATE_NAME,
  CERTIFICATE_URL,
  CERTIFIED_TRANSLATION,
  CHANGES_TO_YOUR_NAME_URL,
  CHANGING_TO_SOLE_APPLICATION,
  CHECK_ANSWERS_URL,
  CHECK_CONDITIONAL_ORDER_ANSWERS_URL,
  CHECK_CONTACT_DETAILS,
  CHECK_JURISDICTION,
  CHECK_PHONE_NUMBER,
  CONFIRM_JOINT_APPLICATION,
  CONTINUE_WITH_YOUR_APPLICATION,
  COUNTRY_AND_PLACE,
  DETAILS_OTHER_PROCEEDINGS,
  DO_THEY_HAVE_A_SOLICITOR,
  DO_YOU_HAVE_ADDRESS,
  EMAIL_RESENT,
  ENGLISH_OR_WELSH,
  ENTER_SOLICITOR_DETAILS,
  ENTER_THEIR_ADDRESS,
  ENTER_YOUR_ADDRESS,
  ENTER_YOUR_NAME,
  ENTER_YOUR_NAMES,
  EQUALITY,
  EXPLAIN_THE_DELAY,
  FINALISING_YOUR_APPLICATION,
  GET_CERTIFIED_TRANSLATION,
  HABITUALLY_RESIDENT_ENGLAND_WALES,
  HAS_RELATIONSHIP_BROKEN_URL,
  HELP_PAYING_HAVE_YOU_APPLIED,
  HELP_PAYING_NEED_TO_APPLY,
  HELP_WITH_YOUR_FEE_URL,
  HOME_URL,
  HOW_DID_YOU_CHANGE_YOUR_NAME,
  HOW_DO_YOU_WANT_TO_APPLY,
  HOW_THE_COURTS_WILL_CONTACT_YOU,
  HOW_TO_APPLY_TO_SERVE,
  HOW_TO_FINALISE_APPLICATION,
  HOW_YOU_CAN_PROCEED,
  HUB_PAGE,
  IN_THE_UK,
  JOINT_APPLICATION_SUBMITTED,
  JURISDICTION_DOMICILE,
  JURISDICTION_INTERSTITIAL_URL,
  JURISDICTION_LAST_TWELVE_MONTHS,
  JURISDICTION_MAY_NOT_BE_ABLE_TO,
  LIVING_ENGLAND_WALES_SIX_MONTHS,
  MONEY_PROPERTY,
  NEED_TO_GET_ADDRESS,
  NO_CERTIFICATE_URL,
  OTHER_COURT_CASES,
  PAYMENT_CALLBACK_URL,
  PAY_AND_SUBMIT,
  PAY_YOUR_FEE,
  PROVIDE_INFORMATION_TO_THE_COURT,
  PageLink,
  READ_THE_RESPONSE,
  RELATIONSHIP_DATE_URL,
  RELATIONSHIP_NOT_BROKEN_URL,
  RELATIONSHIP_NOT_LONG_ENOUGH_URL,
  RESIDUAL_JURISDICTION,
  REVIEW_THE_APPLICATION,
  REVIEW_YOUR_APPLICATION,
  REVIEW_YOUR_JOINT_APPLICATION,
  SENT_TO_APPLICANT2_FOR_REVIEW,
  THEIR_EMAIL_ADDRESS,
  THEIR_NAME,
  UPLOAD_YOUR_DOCUMENTS,
  WHERE_YOUR_LIVES_ARE_BASED_URL,
  WITHDRAWING_YOUR_APPLICATION,
  YOUR_DETAILS_URL,
  YOU_CANNOT_UPDATE_THEIR_EMAIL,
  YOU_NEED_THEIR_EMAIL_ADDRESS,
  YOU_NEED_TO_SERVE,
} from './urls';

export interface Step {
  url: string;
  getNextStep: (data: Partial<CaseWithId>) => PageLink;
}

export const applicant1PreSubmissionSequence: Step[] = [
  {
    url: YOUR_DETAILS_URL,
    getNextStep: () => HAS_RELATIONSHIP_BROKEN_URL,
  },
  {
    url: HAS_RELATIONSHIP_BROKEN_URL,
    getNextStep: data =>
      data.applicant1ScreenHasUnionBroken === YesOrNo.NO ? RELATIONSHIP_NOT_BROKEN_URL : RELATIONSHIP_DATE_URL,
  },
  {
    url: RELATIONSHIP_NOT_BROKEN_URL,
    getNextStep: () => HAS_RELATIONSHIP_BROKEN_URL,
  },
  {
    url: RELATIONSHIP_DATE_URL,
    getNextStep: data =>
      isLessThanAYear(data.relationshipDate) === 'lessThanAYear' ? RELATIONSHIP_NOT_LONG_ENOUGH_URL : CERTIFICATE_URL,
  },
  {
    url: RELATIONSHIP_NOT_LONG_ENOUGH_URL,
    getNextStep: () => RELATIONSHIP_DATE_URL,
  },
  {
    url: CERTIFICATE_URL,
    getNextStep: data => (data.hasCertificate === YesOrNo.NO ? NO_CERTIFICATE_URL : HELP_WITH_YOUR_FEE_URL),
  },
  {
    url: NO_CERTIFICATE_URL,
    getNextStep: () => CERTIFICATE_URL,
  },
  {
    url: HELP_WITH_YOUR_FEE_URL,
    getNextStep: data =>
      data.applicant1HelpPayingNeeded === YesOrNo.YES ? HELP_PAYING_HAVE_YOU_APPLIED : HOW_DO_YOU_WANT_TO_APPLY,
  },
  {
    url: HELP_PAYING_HAVE_YOU_APPLIED,
    getNextStep: data =>
      data.applicant1AlreadyAppliedForHelpPaying === YesOrNo.NO ? HELP_PAYING_NEED_TO_APPLY : HOW_DO_YOU_WANT_TO_APPLY,
  },
  {
    url: HELP_PAYING_NEED_TO_APPLY,
    getNextStep: () => HELP_PAYING_HAVE_YOU_APPLIED,
  },
  {
    url: HOW_DO_YOU_WANT_TO_APPLY,
    getNextStep: data => (data.applicationType === ApplicationType.JOINT_APPLICATION ? THEIR_EMAIL_ADDRESS : IN_THE_UK),
  },
  {
    url: IN_THE_UK,
    getNextStep: data => (data.inTheUk === YesOrNo.NO ? CERTIFICATE_IN_ENGLISH : CHECK_JURISDICTION),
  },
  {
    url: CERTIFICATE_IN_ENGLISH,
    getNextStep: data => (data.certificateInEnglish === YesOrNo.NO ? CERTIFIED_TRANSLATION : COUNTRY_AND_PLACE),
  },
  {
    url: CERTIFIED_TRANSLATION,
    getNextStep: data => (data.certifiedTranslation === YesOrNo.NO ? GET_CERTIFIED_TRANSLATION : COUNTRY_AND_PLACE),
  },
  {
    url: GET_CERTIFIED_TRANSLATION,
    getNextStep: () => CERTIFIED_TRANSLATION,
  },
  {
    url: COUNTRY_AND_PLACE,
    getNextStep: () => CHECK_JURISDICTION,
  },
  {
    url: CHECK_JURISDICTION,
    getNextStep: () => WHERE_YOUR_LIVES_ARE_BASED_URL,
  },
  {
    url: WHERE_YOUR_LIVES_ARE_BASED_URL,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      const YES = YesOrNo.YES;
      const NO = YesOrNo.NO;
      switch (`${data.applicant1LifeBasedInEnglandAndWales}${data.applicant2LifeBasedInEnglandAndWales}`) {
        case `${YES}${YES}`:
          return JURISDICTION_INTERSTITIAL_URL;
        case `${NO}${YES}`:
          return data.sameSex === Checkbox.Checked ? JURISDICTION_DOMICILE : JURISDICTION_INTERSTITIAL_URL;
        case `${YES}${NO}`:
          return data.applicationType === ApplicationType.JOINT_APPLICATION
            ? JURISDICTION_INTERSTITIAL_URL
            : JURISDICTION_LAST_TWELVE_MONTHS;
        default:
          return JURISDICTION_DOMICILE;
      }
    },
  },
  {
    url: JURISDICTION_DOMICILE,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      const YES = YesOrNo.YES;
      const NO = YesOrNo.NO;
      switch (`${data.applicant1DomicileInEnglandWales}${data.applicant2DomicileInEnglandWales}`) {
        case `${YES}${YES}`:
          return data.sameSex === Checkbox.Checked ? HABITUALLY_RESIDENT_ENGLAND_WALES : JURISDICTION_INTERSTITIAL_URL;
        case `${YES}${NO}`:
          return data.applicant1LifeBasedInEnglandAndWales === YES
            ? LIVING_ENGLAND_WALES_SIX_MONTHS
            : HABITUALLY_RESIDENT_ENGLAND_WALES;
        default:
          return HABITUALLY_RESIDENT_ENGLAND_WALES;
      }
    },
  },
  {
    url: HABITUALLY_RESIDENT_ENGLAND_WALES,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      if (allowedToAnswerResidualJurisdiction(data, data.connections as JurisdictionConnections[])) {
        return RESIDUAL_JURISDICTION;
      } else if (
        previousConnectionMadeUptoLastHabituallyResident(data, data.connections as JurisdictionConnections[]) ||
        data.bothLastHabituallyResident === YesOrNo.YES
      ) {
        return JURISDICTION_INTERSTITIAL_URL;
      } else {
        return JURISDICTION_MAY_NOT_BE_ABLE_TO;
      }
    },
  },
  {
    url: JURISDICTION_LAST_TWELVE_MONTHS,
    getNextStep: data =>
      data.applicant1LivingInEnglandWalesTwelveMonths === YesOrNo.NO
        ? JURISDICTION_DOMICILE
        : JURISDICTION_INTERSTITIAL_URL,
  },
  {
    url: LIVING_ENGLAND_WALES_SIX_MONTHS,
    getNextStep: () => HABITUALLY_RESIDENT_ENGLAND_WALES,
  },
  {
    url: RESIDUAL_JURISDICTION,
    getNextStep: data =>
      data.jurisdictionResidualEligible === YesOrNo.YES
        ? JURISDICTION_INTERSTITIAL_URL
        : JURISDICTION_MAY_NOT_BE_ABLE_TO,
  },
  {
    url: JURISDICTION_MAY_NOT_BE_ABLE_TO,
    getNextStep: () => CHECK_JURISDICTION,
  },
  {
    url: JURISDICTION_INTERSTITIAL_URL,
    getNextStep: data =>
      data.applicationType === ApplicationType.JOINT_APPLICATION ? ENTER_YOUR_NAMES : ENTER_YOUR_NAME,
  },
  {
    url: ENTER_YOUR_NAMES,
    getNextStep: () => CERTIFICATE_NAME,
  },
  {
    url: ENTER_YOUR_NAME,
    getNextStep: () => THEIR_NAME,
  },
  {
    url: THEIR_NAME,
    getNextStep: () => CERTIFICATE_NAME,
  },
  {
    url: CERTIFICATE_NAME,
    getNextStep: () => CHANGES_TO_YOUR_NAME_URL,
  },
  {
    url: CHANGES_TO_YOUR_NAME_URL,
    getNextStep: data =>
      data.applicant1LastNameChangedWhenRelationshipFormed === YesOrNo.YES ||
      data.applicant1NameChangedSinceRelationshipFormed === YesOrNo.YES
        ? HOW_DID_YOU_CHANGE_YOUR_NAME
        : HOW_THE_COURTS_WILL_CONTACT_YOU,
  },
  {
    url: HOW_DID_YOU_CHANGE_YOUR_NAME,
    getNextStep: () => HOW_THE_COURTS_WILL_CONTACT_YOU,
  },
  {
    url: HOW_THE_COURTS_WILL_CONTACT_YOU,
    getNextStep: () => ENGLISH_OR_WELSH,
  },
  {
    url: ENGLISH_OR_WELSH,
    getNextStep: () => ADDRESS_PRIVATE,
  },
  {
    url: ADDRESS_PRIVATE,
    getNextStep: data => (hasApp1Confirmed(data) ? CHECK_CONTACT_DETAILS : ENTER_YOUR_ADDRESS),
  },
  {
    url: ENTER_YOUR_ADDRESS,
    getNextStep: data =>
      hasApp1Confirmed(data)
        ? ADDRESS_PRIVATE
        : data.applicationType === ApplicationType.JOINT_APPLICATION
        ? OTHER_COURT_CASES
        : DO_THEY_HAVE_A_SOLICITOR,
  },
  {
    url: DO_THEY_HAVE_A_SOLICITOR,
    getNextStep: data =>
      data.applicant1IsApplicant2Represented === Applicant2Represented.YES
        ? ENTER_SOLICITOR_DETAILS
        : THEIR_EMAIL_ADDRESS,
  },
  {
    url: ENTER_SOLICITOR_DETAILS,
    getNextStep: () => THEIR_EMAIL_ADDRESS,
  },
  {
    url: THEIR_EMAIL_ADDRESS,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      if (data.applicationType === ApplicationType.JOINT_APPLICATION) {
        return data.applicant1DoesNotKnowApplicant2EmailAddress
          ? YOU_NEED_THEIR_EMAIL_ADDRESS
          : isApplicant2EmailUpdatePossible(data)
          ? EMAIL_RESENT
          : IN_THE_UK;
      } else {
        return DO_YOU_HAVE_ADDRESS;
      }
    },
  },
  {
    url: YOU_NEED_THEIR_EMAIL_ADDRESS,
    getNextStep: () => THEIR_EMAIL_ADDRESS,
  },
  {
    url: DO_YOU_HAVE_ADDRESS,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      if (
        data.applicant1KnowsApplicant2Address === YesOrNo.NO &&
        !(
          data.applicant2SolicitorEmail ||
          (data.applicant2SolicitorAddressPostcode && data.applicant2SolicitorFirmName) ||
          (data.applicant2SolicitorAddressPostcode && data.applicant2SolicitorAddress1)
        )
      ) {
        return NEED_TO_GET_ADDRESS;
      } else if (data.applicant1KnowsApplicant2Address === YesOrNo.NO) {
        return OTHER_COURT_CASES;
      } else {
        return ENTER_THEIR_ADDRESS;
      }
    },
  },
  {
    url: NEED_TO_GET_ADDRESS,
    getNextStep: () => HOW_TO_APPLY_TO_SERVE,
  },
  {
    url: ENTER_THEIR_ADDRESS,
    getNextStep: data => (isCountryUk(data.applicant2AddressCountry) ? OTHER_COURT_CASES : YOU_NEED_TO_SERVE),
  },
  {
    url: HOW_TO_APPLY_TO_SERVE,
    getNextStep: () => OTHER_COURT_CASES,
  },
  {
    url: OTHER_COURT_CASES,
    getNextStep: data => (data.applicant1LegalProceedings === YesOrNo.YES ? DETAILS_OTHER_PROCEEDINGS : MONEY_PROPERTY),
  },
  {
    url: YOU_NEED_TO_SERVE,
    getNextStep: () => OTHER_COURT_CASES,
  },
  {
    url: DETAILS_OTHER_PROCEEDINGS,
    getNextStep: () => MONEY_PROPERTY,
  },
  {
    url: MONEY_PROPERTY,
    getNextStep: () => APPLY_FINANCIAL_ORDER,
  },
  {
    url: APPLY_FINANCIAL_ORDER,
    getNextStep: data =>
      data.applicant1ApplyForFinancialOrder === YesOrNo.YES ? APPLY_FINANCIAL_ORDER_DETAILS : UPLOAD_YOUR_DOCUMENTS,
  },
  {
    url: APPLY_FINANCIAL_ORDER_DETAILS,
    getNextStep: () => UPLOAD_YOUR_DOCUMENTS,
  },
  {
    url: UPLOAD_YOUR_DOCUMENTS,
    getNextStep: () => EQUALITY,
  },
  {
    url: EQUALITY,
    getNextStep: () => CHECK_ANSWERS_URL,
  },
  {
    url: CHECK_ANSWERS_URL,
    getNextStep: data =>
      data.applicationType === ApplicationType.JOINT_APPLICATION
        ? SENT_TO_APPLICANT2_FOR_REVIEW
        : data.applicant1HelpWithFeesRefNo
        ? APPLICATION_SUBMITTED
        : PAY_YOUR_FEE,
  },
  {
    url: SENT_TO_APPLICANT2_FOR_REVIEW,
    getNextStep: () => HOME_URL,
  },
  {
    url: CONFIRM_JOINT_APPLICATION,
    getNextStep: () => PAY_AND_SUBMIT,
  },
  {
    url: APPLICATION_ENDED,
    getNextStep: () => HOME_URL,
  },
  {
    url: EMAIL_RESENT,
    getNextStep: () => HOME_URL,
  },
  {
    url: YOU_CANNOT_UPDATE_THEIR_EMAIL,
    getNextStep: () => HOME_URL,
  },
];

export const applicant1PostSubmissionSequence: Step[] = [
  {
    url: PAY_YOUR_FEE,
    getNextStep: () => PAYMENT_CALLBACK_URL,
  },
  {
    url: PAY_AND_SUBMIT,
    getNextStep: () => PAYMENT_CALLBACK_URL,
  },
  {
    url: PAYMENT_CALLBACK_URL,
    getNextStep: data =>
      data.applicationType === ApplicationType.JOINT_APPLICATION ? JOINT_APPLICATION_SUBMITTED : APPLICATION_SUBMITTED,
  },
  {
    url: APPLICATION_SUBMITTED,
    getNextStep: () => HOME_URL,
  },
  {
    url: JOINT_APPLICATION_SUBMITTED,
    getNextStep: () => HOME_URL,
  },
  {
    url: HUB_PAGE,
    getNextStep: () => HOME_URL,
  },
  {
    url: REVIEW_THE_APPLICATION,
    getNextStep: () => HOME_URL,
  },
  {
    url: HOW_YOU_CAN_PROCEED,
    getNextStep: () => HOME_URL,
  },
  {
    url: CHECK_CONTACT_DETAILS,
    getNextStep: () => HOME_URL,
  },
  {
    url: ADDRESS_PRIVATE,
    getNextStep: () => CHECK_CONTACT_DETAILS,
  },
  {
    url: ENTER_YOUR_ADDRESS,
    getNextStep: () => ADDRESS_PRIVATE,
  },
  {
    url: CHECK_PHONE_NUMBER,
    getNextStep: () => ADDRESS_PRIVATE,
  },
  {
    url: READ_THE_RESPONSE,
    getNextStep: () => CONTINUE_WITH_YOUR_APPLICATION,
  },
  {
    url: CONTINUE_WITH_YOUR_APPLICATION,
    getNextStep: data =>
      data.applicant1ApplyForConditionalOrder === YesOrNo.YES
        ? data.applicationType === ApplicationType.JOINT_APPLICATION
          ? REVIEW_YOUR_JOINT_APPLICATION
          : REVIEW_YOUR_APPLICATION
        : WITHDRAWING_YOUR_APPLICATION,
  },
  {
    url: REVIEW_YOUR_APPLICATION,
    getNextStep: () => CHECK_CONDITIONAL_ORDER_ANSWERS_URL,
  },
  {
    url: REVIEW_YOUR_JOINT_APPLICATION,
    getNextStep: () => CHECK_CONDITIONAL_ORDER_ANSWERS_URL,
  },
  {
    url: WITHDRAWING_YOUR_APPLICATION,
    getNextStep: () => CONTINUE_WITH_YOUR_APPLICATION,
  },
  {
    url: CHECK_CONDITIONAL_ORDER_ANSWERS_URL,
    getNextStep: () => HUB_PAGE,
  },
  {
    url: FINALISING_YOUR_APPLICATION,
    getNextStep: data => (data.previousState === State.FinalOrderOverdue ? EXPLAIN_THE_DELAY : HUB_PAGE),
  },
  {
    url: EXPLAIN_THE_DELAY,
    getNextStep: () => HUB_PAGE,
  },
  {
    url: PROVIDE_INFORMATION_TO_THE_COURT,
    getNextStep: () => HUB_PAGE,
  },
  {
    url: CHANGING_TO_SOLE_APPLICATION,
    getNextStep: () => HUB_PAGE,
  },
  {
    url: HOW_TO_FINALISE_APPLICATION,
    getNextStep: () => HUB_PAGE,
  },
  {
    url: HUB_PAGE,
    getNextStep: () => HOME_URL,
  },
];

const hasApp1Confirmed = (data: Partial<CaseWithId>): boolean =>
  ![State.AwaitingApplicant1Response, State.AwaitingApplicant2Response, State.Draft].includes(data.state as State) &&
  data.applicant1IConfirmPrayer === Checkbox.Checked &&
  data.applicant1StatementOfTruth === Checkbox.Checked;

export const isCountryUk = (value: string | undefined): boolean => {
  const ukTerms = ['uk', 'unitedkingdom', 'u.k', 'u.k.'];
  const country = value || '';
  return ukTerms.includes(country.replace(' ', '').toLowerCase());
};
