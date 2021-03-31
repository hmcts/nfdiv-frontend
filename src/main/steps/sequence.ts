import { CaseWithId, Checkbox } from '../app/case/case';
import { YesOrNo } from '../app/case/definition';
import { isLessThanAYear } from '../app/form/validation';

import {
  CERTIFICATE_IN_ENGLISH,
  CERTIFICATE_NAME,
  CERTIFICATE_URL,
  CERTIFIED_TRANSLATION,
  CHECK_ANSWERS_URL,
  CHECK_JURISDICTION,
  COUNTRY_AND_PLACE,
  ENGLISH_OR_WELSH,
  GET_CERTIFIED_TRANSLATION,
  HABITUALLY_RESIDENT_ENGLAND_WALES,
  HAS_RELATIONSHIP_BROKEN_URL,
  HELP_PAYING_HAVE_YOU_APPLIED,
  HELP_PAYING_NEED_TO_APPLY,
  HELP_WITH_YOUR_FEE_URL,
  HOW_THE_COURTS_WILL_CONTACT_YOU,
  IN_THE_UK,
  JURISDICTION_DOMICILE,
  JURISDICTION_INTERSTITIAL_URL,
  JURISDICTION_LAST_TWELVE_MONTHS,
  JURISDICTION_MAY_NOT_BE_ABLE_TO,
  LIVING_ENGLAND_WALES_SIX_MONTHS,
  NO_CERTIFICATE_URL,
  PageLink,
  RELATIONSHIP_DATE_URL,
  RELATIONSHIP_NOT_BROKEN_URL,
  RELATIONSHIP_NOT_LONG_ENOUGH_URL,
  RESIDUAL_JURISDICTION,
  WHERE_YOUR_LIVES_ARE_BASED_URL,
  YOUR_DETAILS_URL,
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
          return LIVING_ENGLAND_WALES_SIX_MONTHS;

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
    getNextStep: () => HOW_THE_COURTS_WILL_CONTACT_YOU,
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
    url: HOW_THE_COURTS_WILL_CONTACT_YOU,
    showInSection: Sections.ContactYou,
    getNextStep: () => ENGLISH_OR_WELSH,
  },
  {
    url: ENGLISH_OR_WELSH,
    showInSection: Sections.Documents,
    getNextStep: () => CHECK_ANSWERS_URL,
  },
  {
    url: CERTIFICATE_NAME,
    showInSection: Sections.Documents,
    getNextStep: () => CHECK_ANSWERS_URL,
  },
  {
    url: CHECK_ANSWERS_URL,
    getNextStep: () => CHECK_ANSWERS_URL,
  },
  {
    url: JURISDICTION_MAY_NOT_BE_ABLE_TO,
    getNextStep: () => CHECK_ANSWERS_URL,
  },
];
