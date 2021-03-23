import { CaseWithId, Checkbox, YesOrNo } from '../app/case/case';
import { isLessThanAYear } from '../app/form/validation';

import {
  CANT_DIVORCE,
  CERTIFICATE_IN_ENGLISH,
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
  IN_THE_UK,
  JURISDICTION_DOMICILE,
  JURISDICTION_INTERSTITIAL_URL,
  JURISDICTION_LAST_TWELVE_MONTHS,
  LIVING_ENGLAND_WALES_SIX_MONTHS,
  NO_CERTIFICATE_URL,
  PageLink,
  RELATIONSHIP_DATE_URL,
  RELATIONSHIP_NOT_BROKEN_URL,
  RELATIONSHIP_NOT_LONG_ENOUGH_URL,
  RESIDUAL_JURISDICTION,
  WHERE_YOUR_LIVES_ARE_BASED_URL,
  YOUR_DETAILS_URL,
  YOU_CANNOT_APPLY_IN_ENGLAND_OR_WALES,
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
      data.screenHasUnionBroken === YesOrNo.No ? RELATIONSHIP_NOT_BROKEN_URL : RELATIONSHIP_DATE_URL,
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
    getNextStep: data => (data.hasCertificate === YesOrNo.No ? NO_CERTIFICATE_URL : HELP_WITH_YOUR_FEE_URL),
  },
  {
    url: NO_CERTIFICATE_URL,
    getNextStep: () => CERTIFICATE_URL,
  },
  {
    url: HELP_WITH_YOUR_FEE_URL,
    showInSection: Sections.Payment,
    getNextStep: data => (data.helpPayingNeeded === YesOrNo.Yes ? HELP_PAYING_HAVE_YOU_APPLIED : IN_THE_UK),
  },
  {
    url: HELP_PAYING_HAVE_YOU_APPLIED,
    showInSection: Sections.Payment,
    getNextStep: data => (data.alreadyAppliedForHelpPaying === YesOrNo.No ? HELP_PAYING_NEED_TO_APPLY : IN_THE_UK),
  },
  {
    url: HELP_PAYING_NEED_TO_APPLY,
    getNextStep: () => HELP_PAYING_HAVE_YOU_APPLIED,
  },
  {
    url: IN_THE_UK,
    showInSection: Sections.ConnectionsToEnglandWales,
    getNextStep: data => (data.inTheUk === YesOrNo.No ? CERTIFICATE_IN_ENGLISH : CHECK_JURISDICTION),
  },
  {
    url: CERTIFICATE_IN_ENGLISH,
    showInSection: Sections.AboutPartnership,
    getNextStep: data => (data.certificateInEnglish === YesOrNo.No ? CERTIFIED_TRANSLATION : COUNTRY_AND_PLACE),
  },
  {
    url: CERTIFIED_TRANSLATION,
    showInSection: Sections.AboutPartnership,
    getNextStep: data => (data.certifiedTranslation === YesOrNo.No ? GET_CERTIFIED_TRANSLATION : COUNTRY_AND_PLACE),
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
      const { Yes, No } = YesOrNo;
      switch (`${data.yourLifeBasedInEnglandAndWales}${data.partnersLifeBasedInEnglandAndWales}`) {
        case `${Yes}${Yes}`:
        case `${No}${Yes}`:
          return JURISDICTION_INTERSTITIAL_URL;

        case `${Yes}${No}`:
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
      const { Yes, No } = YesOrNo;
      switch (`${data.yourDomicileInEnglandWales}${data.partnersDomicileInEnglandWales}`) {
        case `${Yes}${Yes}`:
          return JURISDICTION_INTERSTITIAL_URL;

        case `${Yes}${No}`:
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
      if (data.lastHabituallyResident === YesOrNo.No && data.sameSex === Checkbox.Checked) {
        return RESIDUAL_JURISDICTION;
      } else if (data.lastHabituallyResident === YesOrNo.No) {
        return CANT_DIVORCE;
      } else {
        return JURISDICTION_INTERSTITIAL_URL;
      }
    },
  },
  {
    url: JURISDICTION_LAST_TWELVE_MONTHS,
    showInSection: Sections.ConnectionsToEnglandWales,
    getNextStep: data =>
      data.livingInEnglandWalesTwelveMonths === YesOrNo.No ? JURISDICTION_DOMICILE : JURISDICTION_INTERSTITIAL_URL,
  },
  {
    url: JURISDICTION_INTERSTITIAL_URL,
    getNextStep: () => ENGLISH_OR_WELSH,
  },
  {
    url: LIVING_ENGLAND_WALES_SIX_MONTHS,
    showInSection: Sections.ConnectionsToEnglandWales,
    getNextStep: data =>
      data.livingInEnglandWalesSixMonths === YesOrNo.No
        ? HABITUALLY_RESIDENT_ENGLAND_WALES
        : JURISDICTION_INTERSTITIAL_URL,
  },
  {
    url: ENGLISH_OR_WELSH,
    showInSection: Sections.Documents,
    getNextStep: () => CHECK_ANSWERS_URL,
  },
  {
    url: YOU_CANNOT_APPLY_IN_ENGLAND_OR_WALES,
    getNextStep: () => CHECK_ANSWERS_URL,
  },
  {
    url: CHECK_ANSWERS_URL,
    getNextStep: () => CHECK_ANSWERS_URL,
  },
];
