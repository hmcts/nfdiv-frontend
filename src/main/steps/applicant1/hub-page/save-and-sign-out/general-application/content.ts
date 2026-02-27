import { CommonContent } from 'steps/common/common.content';

import { InterimApplicationType, State } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import {
  findUnpaidGeneralApplication,
  getGeneralApplicationServiceRequest,
} from '../../../../../app/utils/general-application-utils';
import { MAKE_AN_APPLICATION, PAY_YOUR_GENERAL_APPLICATION_FEE } from '../../../../urls';

const en = ({ isDivorce }: CommonContent, hasPaymentInProgress) => ({
  generalApplication: {
    heading: 'Your draft general application',
    line1: `You have started an application to the court as part of your ongoing ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}.`,
    subHeading1: 'What you can do next',
    line2:
      'You can continue and complete the application or withdraw the application if you no longer want to continue.',
    line3: `If you withdraw the application, your draft will be deleted. This will not affect your ongoing ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}.`,
    line4: 'You can make another application to the court at any time.',
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
    line1: `You have started an application to the court as part of your ongoing ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}.`,
    subHeading1: 'What you can do next',
    line2:
      'You can continue and complete the application or withdraw the application if you no longer want to continue.',
    line3: `If you withdraw the application, your draft will be deleted. This will not affect your ongoing ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}.`,
    line4: 'You can make another application to the court at any time.',
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

  const interimApplicationType = isApplicant2
    ? userCase.applicant2InterimApplicationType
    : userCase.applicant1InterimApplicationType;

  const hasGeneralApplicationPaymentInProgress = !!findUnpaidGeneralApplication(
    userCase,
    getGeneralApplicationServiceRequest(content.isApplicant2, userCase) as string
  );
  const showGeneralApplicationSaveAndSignOutUpdate =
    interimApplicationType === InterimApplicationType.DIGITISED_GENERAL_APPLICATION_D11 ||
    (hasGeneralApplicationPaymentInProgress && State.AwaitingGeneralApplicationPayment !== userCase.state);

  return {
    ...languages[content.language](content, hasGeneralApplicationPaymentInProgress),
    showGeneralApplicationSaveAndSignOutUpdate,
  };
};
