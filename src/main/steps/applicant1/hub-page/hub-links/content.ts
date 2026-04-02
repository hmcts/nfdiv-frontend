import { TranslationFn } from '../../../../app/controller/GetController';
import {
  canStartNewGeneralApplication,
  canSubmitD11GeneralApplication,
} from '../../../../app/utils/general-application-utils';
import { CommonContent, getRootRedirectPath } from '../../../common/common.content';
import {
  APPLICANT_2,
  CHECK_CONTACT_DETAILS,
  HUB_PAGE_DOWNLOADS,
  MAKE_AN_APPLICATION,
  MAKE_AN_OFFLINE_APPLICATION,
  WITHDRAW_THIS_APPLICATION,
  WITHDRAW_THIS_APPLICATION_POST_ISSUE,
} from '../../../urls';
import { areDownloadsAvailable } from '../../downloads/content';

const en = (
  { isDivorce, isApplicant2, caseHasBeenIssued }: CommonContent,
  app2OrRespondent: string,
  canStartOnlineGenApplication: boolean
) => ({
  reviewContactDetails: {
    url: app2OrRespondent + CHECK_CONTACT_DETAILS,
    text: 'Review your contact details',
  },
  hubPageDownloads: {
    url: app2OrRespondent + HUB_PAGE_DOWNLOADS,
    text: 'View all documents',
  },
  genAppMakeAnApplication: {
    url: app2OrRespondent + (canStartOnlineGenApplication ? MAKE_AN_APPLICATION : MAKE_AN_OFFLINE_APPLICATION),
    text: 'Make an application to the court',
  },
  withdrawApplication: {
    url: `${(isApplicant2 ? APPLICANT_2 : '') + (caseHasBeenIssued ? (canStartOnlineGenApplication ? WITHDRAW_THIS_APPLICATION_POST_ISSUE : MAKE_AN_OFFLINE_APPLICATION) : WITHDRAW_THIS_APPLICATION)}`,
    text: `Withdraw this ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}`,
  },
});

// @TODO translations
const cy: typeof en = (
  { isDivorce, isApplicant2, caseHasBeenIssued }: CommonContent,
  app2OrRespondent,
  canStartOnlineGenApplication: boolean
) => ({
  reviewContactDetails: {
    url: app2OrRespondent + CHECK_CONTACT_DETAILS,
    text: 'Adolygu eich manylion cyswllt',
  },
  hubPageDownloads: {
    url: app2OrRespondent + HUB_PAGE_DOWNLOADS,
    text: 'Gweld eich dogfennau',
  },
  genAppMakeAnApplication: {
    url: app2OrRespondent + (canStartOnlineGenApplication ? MAKE_AN_APPLICATION : MAKE_AN_OFFLINE_APPLICATION),
    text: 'Make an application to the court',
  },
  withdrawApplication: {
    url: `${(isApplicant2 ? APPLICANT_2 : '') + (caseHasBeenIssued ? (canStartOnlineGenApplication ? WITHDRAW_THIS_APPLICATION_POST_ISSUE : MAKE_AN_OFFLINE_APPLICATION) : WITHDRAW_THIS_APPLICATION)}`,
    text: `Tynnu’r ${isDivorce ? 'cais hwn am ysgariad' : 'cais hwn i ddod â’ch partneriaeth sifil i ben'} yn ôl`,
  },
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const canStartNewOnlineGenApplication = canStartNewGeneralApplication(content.isApplicant2, content.userCase);
  const cannotSubmitOnlineD11GenApplication = !canSubmitD11GeneralApplication(content.isApplicant2, content.userCase);
  const showGenApplicationLink = canStartNewOnlineGenApplication || cannotSubmitOnlineD11GenApplication;
  const showWithdrawLink =
    (!content.isApplicant2 || (content.isApplicant2 && content.isJointApplication)) &&
    (!content.caseHasBeenIssued || canStartNewOnlineGenApplication);

  return {
    ...languages[content.language](
      content,
      getRootRedirectPath(content.isApplicant2, content.userCase),
      canStartNewOnlineGenApplication
    ),
    caseHasBeenIssued: content.caseHasBeenIssued,
    showDownloadLink: areDownloadsAvailable(content),
    showWithdrawLink,
    showGenApplicationLink,
  };
};
