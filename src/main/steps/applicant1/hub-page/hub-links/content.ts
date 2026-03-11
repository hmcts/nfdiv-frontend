import { TranslationFn } from '../../../../app/controller/GetController';
import { canStartNewGeneralApplication } from '../../../../app/utils/general-application-utils';
import { CommonContent, getRootRedirectPath } from '../../../common/common.content';
import {
  APPLICANT_2,
  CHECK_CONTACT_DETAILS,
  HUB_PAGE_DOWNLOADS,
  MAKE_AN_APPLICATION,
  WITHDRAW_THIS_APPLICATION,
} from '../../../urls';
import { areDownloadsAvailable } from '../../downloads/content';

const en = ({ isDivorce, isApplicant2 }: CommonContent, app2OrRespondent: string) => ({
  reviewContactDetails: {
    url: app2OrRespondent + CHECK_CONTACT_DETAILS,
    text: 'Review your contact details',
  },
  hubPageDownloads: {
    url: app2OrRespondent + HUB_PAGE_DOWNLOADS,
    text: 'View all documents',
  },
  genAppMakeAnApplication: {
    url: app2OrRespondent + MAKE_AN_APPLICATION,
    text: 'Make an application to the court',
  },
  withdrawApplication: {
    url: `${(isApplicant2 ? APPLICANT_2 : '') + WITHDRAW_THIS_APPLICATION}`,
    text: `Withdraw this ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}`,
  },
});

// @TODO translations
const cy: typeof en = ({ isDivorce, isApplicant2 }: CommonContent, app2OrRespondent) => ({
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
    url: `${(isApplicant2 ? APPLICANT_2 : '') + WITHDRAW_THIS_APPLICATION}`,
    text: `Withdraw this ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}`,
  },
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const showGenApplicationLink = canStartNewGeneralApplication(content.isApplicant2, content.userCase);
  const showWithdrawLink =
    !content.caseHasBeenIssued && (!content.isApplicant2 || (content.isApplicant2 && content.isJointApplication));

  return {
    ...languages[content.language](content, getRootRedirectPath(content.isApplicant2, content.userCase)),
    caseHasBeenIssued: content.caseHasBeenIssued,
    showDownloadLink: areDownloadsAvailable(content),
    showWithdrawLink,
    showGenApplicationLink,
  };
};
