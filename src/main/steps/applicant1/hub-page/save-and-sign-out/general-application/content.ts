import { TranslationFn } from '../../../../../app/controller/GetController';
import {
  hasGenAppAwaitingDocuments,
  hasGenAppPaymentInProgress,
  hasGenAppSaveAndSignOutContent,
} from '../../../../../app/utils/general-application-utils';
import { CommonContent } from '../../../../common/common.content';
import { MAKE_AN_APPLICATION, PAY_YOUR_GENERAL_APPLICATION_FEE } from '../../../../urls';
import { generateContent as generalApplicationSubmittedContent } from '../../../interim-applications/general-application/submitted/content';

const en = ({ isDivorce }: CommonContent, hasPaymentInProgress) => ({
  generalApplication: {
    heading: 'Your draft general application',
    line1: `You have also started a general application to the court as part of your ongoing ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}.`,
    line2:
      'You can continue and complete the application or withdraw the application if you no longer want to continue.',
    line3: `If you withdraw the application, your draft will be deleted. This will not affect your ongoing ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}.`,
    line4: 'You can make another application to the court at any time.',
    continuingTheApplication: 'Progressing your general application',
    continueLinkText: hasPaymentInProgress ? 'Complete payment' : 'Continue application',
    continueLinkUrl: hasPaymentInProgress ? PAY_YOUR_GENERAL_APPLICATION_FEE : MAKE_AN_APPLICATION,
    withdrawLinkText: 'Withdraw application',
    withdrawLinkUrl: '/withdraw',
  },
});

// @TODO translations
const cy: typeof en = ({ isDivorce }: CommonContent, hasPaymentInProgress) => ({
  generalApplication: {
    heading: 'Your draft general application',
    line1: `You have also started a general application to the court as part of your ongoing ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}.`,
    line2:
      'You can continue and complete the application or withdraw the application if you no longer want to continue.',
    line3: `If you withdraw the application, your draft will be deleted. This will not affect your ongoing ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}.`,
    line4: 'You can make another application to the court at any time.',
    continuingTheApplication: 'Progressing your general application',
    continueLinkText: hasPaymentInProgress ? 'Complete payment' : 'Continue application',
    continueLinkUrl: hasPaymentInProgress ? PAY_YOUR_GENERAL_APPLICATION_FEE : MAKE_AN_APPLICATION,
    withdrawLinkText: 'Withdraw application',
    withdrawLinkUrl: '/withdraw',
  },
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const { isApplicant2, userCase } = content;
  const hasPaymentInProgress = hasGenAppPaymentInProgress(isApplicant2, userCase);
  const awaitingDocuments = hasGenAppAwaitingDocuments(isApplicant2, userCase);

  return {
    ...languages[content.language](content, hasGenAppPaymentInProgress(isApplicant2, userCase)),
    hasGenAppSaveAndSignOutContent: hasGenAppSaveAndSignOutContent(isApplicant2, userCase),
    generalApplicationSubmitted: generalApplicationSubmittedContent(content),
    hasPaymentInProgress,
    awaitingDocuments,
  };
};
