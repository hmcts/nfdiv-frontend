import { ApplicationType } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { CommonContent } from '../../../common/common.content';
import {
  APPLICANT_2,
  CHECK_CONTACT_DETAILS,
  HUB_PAGE_DOWNLOADS,
  MAKE_AN_APPLICATION,
  RESPONDENT,
  WITHDRAW_APPLICATION,
  WITHDRAW_THIS_APPLICATION,
} from '../../../urls';
import { downloadsAvailable } from '../../downloads/content';

const en = ({ caseHasBeenIssued, isDivorce }: CommonContent, app2OrRespondent: string) => ({
  reviewContactDetails: {
    url: app2OrRespondent + CHECK_CONTACT_DETAILS,
    text: 'Review your contact details',
  },
  hubPageDownloads: {
    url: HUB_PAGE_DOWNLOADS,
    text: 'View all documents',
  },
  genAppMakeAnApplication: {
    url: MAKE_AN_APPLICATION,
    text: 'Make an application to the court',
  },
  withdrawApplication: {
    url: `${caseHasBeenIssued ? WITHDRAW_THIS_APPLICATION : WITHDRAW_APPLICATION}`,
    text: `Withdraw this ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}`,
  },
});

// @TODO translations
const cy: typeof en = ({ caseHasBeenIssued, isDivorce }: CommonContent, app2OrRespondent) => ({
  reviewContactDetails: {
    url: app2OrRespondent + CHECK_CONTACT_DETAILS,
    text: 'Adolygu eich manylion cyswllt',
  },
  hubPageDownloads: {
    url: HUB_PAGE_DOWNLOADS,
    text: 'Gweld eich dogfennau',
  },
  genAppMakeAnApplication: {
    url: MAKE_AN_APPLICATION,
    text: 'Make an application to the court',
  },
  withdrawApplication: {
    url: `${caseHasBeenIssued ? WITHDRAW_THIS_APPLICATION : WITHDRAW_APPLICATION}`,
    text: `Withdraw this ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}`,
  },
});

const languages = {
  en,
  cy,
};

const getApp2OrRespondent = (content: CommonContent): string => {
  if (content.isApplicant2) {
    return content.userCase?.applicationType === ApplicationType.SOLE_APPLICATION ? RESPONDENT : APPLICANT_2;
  }
  return '';
};

export const generateContent: TranslationFn = content => {
  return {
    ...languages[content.language](content, getApp2OrRespondent(content)),
    caseHasBeenIssued: content.caseHasBeenIssued,
    showDownloadLink: downloadsAvailable(content),
  };
};
