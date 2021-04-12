import { CaseWithId, Checkbox } from '../app/case/case';
import { YesOrNo } from '../app/case/definition';
import { isLessThanAYear } from '../app/form/validation';

import {
  ADDRESS_PRIVATE,
  CERTIFICATE_IN_ENGLISH,
  CERTIFICATE_NAME,
  CERTIFICATE_URL,
  CERTIFIED_TRANSLATION,
  CHANGES_TO_YOUR_NAME_URL,
  CHECK_ANSWERS_URL,
  CHECK_JURISDICTION,
  COUNTRY_AND_PLACE,
  DO_YOU_HAVE_ADDRESS,
  ENGLISH_OR_WELSH,
  ENTER_THEIR_ADDRESS,
  ENTER_YOUR_ADDRESS,
  GET_CERTIFIED_TRANSLATION,
  HABITUALLY_RESIDENT_ENGLAND_WALES,
  HAS_RELATIONSHIP_BROKEN_URL,
  HELP_PAYING_HAVE_YOU_APPLIED,
  HELP_PAYING_NEED_TO_APPLY,
  HELP_WITH_YOUR_FEE_URL,
  HOW_DID_YOU_CHANGE_YOUR_NAME,
  HOW_THE_COURTS_WILL_CONTACT_YOU,
  HOW_TO_APPLY_TO_SERVE,
  IN_THE_UK,
  JURISDICTION_DOMICILE,
  JURISDICTION_INTERSTITIAL_URL,
  JURISDICTION_LAST_TWELVE_MONTHS,
  JURISDICTION_MAY_NOT_BE_ABLE_TO,
  LIVING_ENGLAND_WALES_SIX_MONTHS,
  NEED_TO_GET_ADDRESS,
  NO_CERTIFICATE_URL,
  OTHER_COURT_CASES,
  PageLink,
  RELATIONSHIP_DATE_URL,
  RELATIONSHIP_NOT_BROKEN_URL,
  RELATIONSHIP_NOT_LONG_ENOUGH_URL,
  RESIDUAL_JURISDICTION,
  THEIR_EMAIL_ADDRESS,
  WHERE_YOUR_LIVES_ARE_BASED_URL,
  YOUR_DETAILS_URL,
  YOU_CANNOT_APPLY,
  YOU_NEED_TO_GET_THEIR_ADDRESS,
} from './urls';

export enum Sections {
  AboutPartnership = 'aboutPartnership',
  ConnectionsToEnglandWales = 'connectionsToEnglandWales',
  AboutPartners = 'aboutPartners',
  ContactYou = 'contactYou',
  ContactThem = 'contactThem',
  OtherCourtCases = 'otherCourtCases',
  DividingAssets = 'dividingAssets',
  Costs = 'costs',
  Documents = 'documents',
  Payment = 'payment',
}

export interface Step {
  url: string;
  showInSection?: Sections;
  excludeFromContinueApplication?: boolean;
  getNextStep: (data: Partial<CaseWithId>) => PageLink;
}

export const sequence: Step[] = [
  {
    url: YOUR_DETAILS_URL,
    showInSection: Sections.AboutPartnership,
    getNextStep: () => HAS_RELATIONSHIP_BROKEN_URL,
  },
  {
    url: HAS_RELATIONSHIP_BROKEN_URL,
    showInSection: Sections.AboutPartnership,
    getNextStep: data =>
      data.screenHasUnionBroken === YesOrNo.NO ? RELATIONSHIP_NOT_BROKEN_URL : RELATIONSHIP_DATE_URL,
  },
  {
    url: RELATIONSHIP_NOT_BROKEN_URL,
    getNextStep: () => HAS_RELATIONSHIP_BROKEN_URL,
  },
  {
    url: RELATIONSHIP_DATE_URL,
    showInSection: Sections.AboutPartnership,
    getNextStep: data =>
      isLessThanAYear(data.relationshipDate) === 'lessThanAYear' ? RELATIONSHIP_NOT_LONG_ENOUGH_URL : CERTIFICATE_URL,
  },
  {
    url: RELATIONSHIP_NOT_LONG_ENOUGH_URL,
    getNextStep: () => RELATIONSHIP_DATE_URL,
  },
  {
    url: CERTIFICATE_URL,
    showInSection: Sections.AboutPartnership,
    getNextStep: data => (data.hasCertificate === YesOrNo.NO ? NO_CERTIFICATE_URL : HELP_WITH_YOUR_FEE_URL),
  },
  {
    url: NO_CERTIFICATE_URL,
    getNextStep: () => CERTIFICATE_URL,
  },
  {
    url: HELP_WITH_YOUR_FEE_URL,
    showInSection: Sections.Payment,
    getNextStep: data => (data.helpPayingNeeded === YesOrNo.YES ? HELP_PAYING_HAVE_YOU_APPLIED : IN_THE_UK),
  },
  {
    url: HELP_PAYING_HAVE_YOU_APPLIED,
    showInSection: Sections.Payment,
    getNextStep: data => (data.alreadyAppliedForHelpPaying === YesOrNo.NO ? HELP_PAYING_NEED_TO_APPLY : IN_THE_UK),
  },
  {
    url: HELP_PAYING_NEED_TO_APPLY,
    getNextStep: () => HELP_PAYING_HAVE_YOU_APPLIED,
  },
  {
    url: IN_THE_UK,
    showInSection: Sections.ConnectionsToEnglandWales,
    getNextStep: data => (data.inTheUk === YesOrNo.NO ? CERTIFICATE_IN_ENGLISH : CHECK_JURISDICTION),
  },
  {
    url: CERTIFICATE_IN_ENGLISH,
    showInSection: Sections.AboutPartnership,
    getNextStep: data => (data.certificateInEnglish === YesOrNo.NO ? CERTIFIED_TRANSLATION : COUNTRY_AND_PLACE),
  },
  {
    url: CERTIFIED_TRANSLATION,
    showInSection: Sections.AboutPartnership,
    getNextStep: data => (data.certifiedTranslation === YesOrNo.NO ? GET_CERTIFIED_TRANSLATION : COUNTRY_AND_PLACE),
  },
  {
    url: GET_CERTIFIED_TRANSLATION,
    getNextStep: () => CERTIFIED_TRANSLATION,
  },
  {
    url: COUNTRY_AND_PLACE,
    showInSection: Sections.AboutPartnership,
    getNextStep: () => CHECK_JURISDICTION,
  },
  {
    url: CHECK_JURISDICTION,
    getNextStep: () => WHERE_YOUR_LIVES_ARE_BASED_URL,
  },
  {
    url: WHERE_YOUR_LIVES_ARE_BASED_URL,
    showInSection: Sections.ConnectionsToEnglandWales,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      const YES = YesOrNo.YES;
      const NO = YesOrNo.NO;
      switch (`${data.yourLifeBasedInEnglandAndWales}${data.partnersLifeBasedInEnglandAndWales}`) {
        case `${YES}${YES}`:
        case `${NO}${YES}`:
          return JURISDICTION_INTERSTITIAL_URL;

        case `${YES}${NO}`:
          return JURISDICTION_LAST_TWELVE_MONTHS;

        default:
          return JURISDICTION_DOMICILE;
      }
    },
  },
  {
    url: JURISDICTION_DOMICILE,
    showInSection: Sections.ConnectionsToEnglandWales,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      const YES = YesOrNo.YES;
      const NO = YesOrNo.NO;
      switch (`${data.yourDomicileInEnglandWales}${data.partnersDomicileInEnglandWales}`) {
        case `${YES}${YES}`:
          return JURISDICTION_INTERSTITIAL_URL;

        case `${YES}${NO}`:
          return data.yourLifeBasedInEnglandAndWales === YES
            ? LIVING_ENGLAND_WALES_SIX_MONTHS
            : HABITUALLY_RESIDENT_ENGLAND_WALES;

        default:
          return HABITUALLY_RESIDENT_ENGLAND_WALES;
      }
    },
  },
  {
    url: HABITUALLY_RESIDENT_ENGLAND_WALES,
    showInSection: Sections.ConnectionsToEnglandWales,
    getNextStep: (data: Partial<CaseWithId>): PageLink => {
      if (data.lastHabituallyResident === YesOrNo.NO && data.sameSex === Checkbox.Checked) {
        return RESIDUAL_JURISDICTION;
      } else if (data.lastHabituallyResident === YesOrNo.NO) {
        return JURISDICTION_MAY_NOT_BE_ABLE_TO;
      } else {
        return JURISDICTION_INTERSTITIAL_URL;
      }
    },
  },
  {
    url: JURISDICTION_LAST_TWELVE_MONTHS,
    showInSection: Sections.ConnectionsToEnglandWales,
    getNextStep: data =>
      data.livingInEnglandWalesTwelveMonths === YesOrNo.NO ? JURISDICTION_DOMICILE : JURISDICTION_INTERSTITIAL_URL,
  },
  {
    url: JURISDICTION_INTERSTITIAL_URL,
    getNextStep: () => CERTIFICATE_NAME,
  },
  {
    url: LIVING_ENGLAND_WALES_SIX_MONTHS,
    showInSection: Sections.ConnectionsToEnglandWales,
    getNextStep: data =>
      data.livingInEnglandWalesSixMonths === YesOrNo.NO
        ? HABITUALLY_RESIDENT_ENGLAND_WALES
        : JURISDICTION_INTERSTITIAL_URL,
  },
  {
    url: JURISDICTION_MAY_NOT_BE_ABLE_TO,
    getNextStep: () => CHECK_ANSWERS_URL,
  },
  {
    url: CERTIFICATE_NAME,
    showInSection: Sections.Documents,
    getNextStep: () => CHANGES_TO_YOUR_NAME_URL,
  },
  {
    url: CHANGES_TO_YOUR_NAME_URL,
    showInSection: Sections.Documents,
    getNextStep: data =>
      data.lastNameChangeWhenRelationshipFormed === YesOrNo.YES ||
      data.anyNameChangeSinceRelationshipFormed === YesOrNo.YES
        ? HOW_DID_YOU_CHANGE_YOUR_NAME
        : HOW_THE_COURTS_WILL_CONTACT_YOU,
  },
  {
    url: HOW_DID_YOU_CHANGE_YOUR_NAME,
    showInSection: Sections.Documents,
    getNextStep: () => HOW_THE_COURTS_WILL_CONTACT_YOU,
  },
  {
    url: HOW_THE_COURTS_WILL_CONTACT_YOU,
    showInSection: Sections.ContactYou,
    getNextStep: () => ENGLISH_OR_WELSH,
  },
  {
    url: ENGLISH_OR_WELSH,
    showInSection: Sections.Documents,
    getNextStep: () => ADDRESS_PRIVATE,
  },
  {
    url: ADDRESS_PRIVATE,
    showInSection: Sections.ContactYou,
    getNextStep: () => ENTER_YOUR_ADDRESS,
  },
  {
    url: YOU_CANNOT_APPLY,
    getNextStep: () => CHECK_ANSWERS_URL,
  },
  {
    url: ENTER_YOUR_ADDRESS,
    showInSection: Sections.ContactYou,
    getNextStep: () => THEIR_EMAIL_ADDRESS,
  },
  {
    url: THEIR_EMAIL_ADDRESS,
    showInSection: Sections.Documents,
    getNextStep: () => DO_YOU_HAVE_ADDRESS,
  },
  {
    url: DO_YOU_HAVE_ADDRESS,
    getNextStep: data => (data.knowPartnersAddress === YesOrNo.NO ? NEED_TO_GET_ADDRESS : ENTER_THEIR_ADDRESS),
  },
  {
    url: HOW_DID_YOU_CHANGE_YOUR_NAME,
    showInSection: Sections.Documents,
    getNextStep: () => HOW_THE_COURTS_WILL_CONTACT_YOU,
  },
  {
    url: YOU_NEED_TO_GET_THEIR_ADDRESS,
    showInSection: Sections.Documents,
    excludeFromContinueApplication: true,
    getNextStep: data =>
      data.iWantToHavePapersServedAnotherWay === Checkbox.Checked ? HOW_TO_APPLY_TO_SERVE : ENTER_THEIR_ADDRESS,
  },
  {
    url: ENTER_THEIR_ADDRESS,
    showInSection: Sections.ContactThem,
    getNextStep: () => OTHER_COURT_CASES,
  },
  {
    url: HOW_TO_APPLY_TO_SERVE,
    getNextStep: () => OTHER_COURT_CASES,
  },
  {
    url: CHECK_ANSWERS_URL,
    getNextStep: () => CHECK_ANSWERS_URL,
  },
];
