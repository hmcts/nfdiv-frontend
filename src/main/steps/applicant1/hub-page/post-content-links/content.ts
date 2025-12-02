import { ApplicationType } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { CommonContent } from '../../../common/common.content';
import {
  APPLICANT_2,
  CHECK_CONTACT_DETAILS,
  HUB_PAGE_DOWNLOADS,
  PRE_ISSUE_MAKE_AN_APPLICATION,
  RESPONDENT,
  WITHDRAW_APPLICATION,
  WITHDRAW_THIS_APPLICATION,
} from '../../../urls';

const en = ({ isApplicant2, isDivorce, userCase }: CommonContent, isPreIssue: boolean) => ({
  reviewContactDetails: `<a class="govuk-link" href="${
    (isApplicant2 ? (userCase?.applicationType === ApplicationType.SOLE_APPLICATION ? RESPONDENT : APPLICANT_2) : '') +
    CHECK_CONTACT_DETAILS
  }">Review your contact details</a>`,
  hubPageDownloads: `<a class="govuk-link" href="${HUB_PAGE_DOWNLOADS}">View all documents</a>`,
  preIssueMakeAnApplication: `<a class="govuk-link" href="${PRE_ISSUE_MAKE_AN_APPLICATION}">Make an application to the court</a>`,
  withdrawApplication: `<a class="govuk-link" href="${
    isPreIssue ? WITHDRAW_THIS_APPLICATION : WITHDRAW_APPLICATION
  }">Withdraw this ${isDivorce ? 'divorce' : 'dissolution'} application</a>`,
});

// @TODO translations
const cy: typeof en = ({ isApplicant2, isDivorce, userCase }: CommonContent, isPreIssue: boolean) => ({
  reviewContactDetails: `<a class="govuk-link" href="${
    (isApplicant2 ? (userCase?.applicationType === ApplicationType.SOLE_APPLICATION ? RESPONDENT : APPLICANT_2) : '') +
    CHECK_CONTACT_DETAILS
  }">Adolygu eich manylion cyswllt</a>`,
  hubPageDownloads: `<a class="govuk-link" href="${HUB_PAGE_DOWNLOADS}">View all documents</a>`,
  preIssueMakeAnApplication: `<a class="govuk-link" href="${PRE_ISSUE_MAKE_AN_APPLICATION}">Make an application to the court</a>`,
  withdrawApplication: `<a class="govuk-link" href="${isPreIssue ? WITHDRAW_THIS_APPLICATION : WITHDRAW_APPLICATION}">${
    isPreIssue ? 'Withdraw this' : 'Apply to withdraw this '
  }${isDivorce ? 'divorce' : 'dissolution'} application</a>`,
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const isPreIssue = content.userCase.issueDate === undefined || content.userCase.issueDate === null;
  return {
    ...languages[content.language](content, isPreIssue),
    isPreIssue,
  };
};
