import { GeneralApplicationType } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { hasGenAppPaymentInProgress, hasGenAppSaveAndSignOutContent } from '../../../../../app/utils/general-application-utils';
import { CommonContent, getRootRedirectPath } from '../../../../common/common.content';
import { GEN_APP_INTERRUPTION, GEN_APP_WITHDRAW_APPLICATION, PAY_YOUR_GENERAL_APPLICATION_FEE } from '../../../../urls';
import { generateContent as generalApplicationSubmittedContent } from '../../../interim-applications/general-application/submitted/content';
const en = ({ isDivorce }: CommonContent, hasPaymentInProgress, continueLinkUrl, withdrawLinkUrl) => ({
  generalApplication: {
    heading: 'Your Draft General Application',
    line1: `You have started a general application to the court as part of your ongoing ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}.`,
    line1Withdraw: `You have started a general application to the court to withdraw ${isDivorce ? 'your divorce application' : 'the application to end your civil partnership'}.`,
    line2:
      'You can continue and complete the application or withdraw the application if you no longer want to continue.',
    line2Withdraw: `You can continue and complete the application or withdraw it if you want to continue ${isDivorce ? 'with your divorce' : 'to end your civil partnership'}.`,
    line3: `If you withdraw the application, your draft will be deleted. This will not affect your ongoing ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}.`,
    line4: 'You can make another general application to the court at any time.',
    continuingTheApplication: 'Progressing your general application',
    continueLinkText: hasPaymentInProgress ? 'Complete payment' : 'Continue application',
    continueLinkUrl,
    withdrawLinkText: 'Withdraw application',
    withdrawLinkUrl,
  },
});

// @TODO translations
const cy: typeof en = ({ isDivorce }: CommonContent, hasPaymentInProgress, continueLinkUrl, withdrawLinkUrl) => ({
  generalApplication: {
    heading: 'Your Draft General Application',
    line1: `You have started a general application to the court as part of your ongoing ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}.`,
    line1Withdraw: `You have started a general application to the court to withdraw ${isDivorce ? 'your divorce application' : 'the application to end your civil partnership'}.`,
    line2:
      'You can continue and complete the application or withdraw the application if you no longer want to continue.',
    line2Withdraw: `You can continue and complete the application or withdraw it if you want to continue ${isDivorce ? 'with your divorce' : 'to end your civil partnership'}.`,
    line3: `If you withdraw the application, your draft will be deleted. This will not affect your ongoing ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}.`,
    line4: 'You can make another general application to the court at any time.',
    continuingTheApplication: 'Progressing your general application',
    continueLinkText: hasPaymentInProgress ? 'Complete payment' : 'Continue application',
    continueLinkUrl,
    withdrawLinkText: 'Withdraw application',
    withdrawLinkUrl,
  },
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const { isApplicant2, userCase } = content;
  const hasPaymentInProgress = hasGenAppPaymentInProgress(isApplicant2, userCase);
  const rootPath = getRootRedirectPath(isApplicant2, userCase);
  const continueLinkUrl = hasPaymentInProgress
    ? rootPath + PAY_YOUR_GENERAL_APPLICATION_FEE
    : rootPath + GEN_APP_INTERRUPTION;
  const withdrawLinkUrl = rootPath + GEN_APP_WITHDRAW_APPLICATION;

  const generalApplicationType = isApplicant2 ? userCase?.applicant2GenAppType : userCase?.applicant1GenAppType;
  const isDraftingWithdraw =
    !hasPaymentInProgress && generalApplicationType === GeneralApplicationType.WITHDRAW_POST_ISSUE;

  return {
    ...languages[content.language](content, hasPaymentInProgress, continueLinkUrl, withdrawLinkUrl),
    hasGenAppSaveAndSignOutContent: hasGenAppSaveAndSignOutContent(isApplicant2, userCase),
    generalApplicationSubmitted: generalApplicationSubmittedContent(content),
    hasPaymentInProgress,
    isDraftingWithdraw,
  };
};
