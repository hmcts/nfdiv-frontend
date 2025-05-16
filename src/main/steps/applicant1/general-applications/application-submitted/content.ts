import config from 'config';
import { TranslationFn } from '../../../../app/controller/GetController';
import type { CommonContent } from '../../../common/common.content';
import { GeneralApplicationLabels, GeneralApplicationType } from '../../../../app/case/definition';

const en = ({
  userCase,
}: CommonContent) => ({
  title: 'Application submitted',
  line1: `You have submitted your application for ${GeneralApplicationLabels[userCase.applicant1GeneralApplicationType as GeneralApplicationType]}.`,
  subHeading1: 'What happens next',
  line2: 'The court will review your application and any evidence you have submitted. If your application is successful, your divorce will proceed withour a response from your partner. We will then tell you when you can apply for your conditional order.',
  line3: `We will email you within the next ${config.get('dates.applicationSubmittedOffsetDays')} days to let you know whether your application has been successful.`,
  returnToHub: 'Return to hub screen',
});

// @TODO Welsh
const cy: typeof en = ({
  userCase,
}: CommonContent) => ({
  title: 'Application submitted',
  line1: `You have submitted your application for ${GeneralApplicationLabels[userCase.applicant1GeneralApplicationType  as GeneralApplicationType]}.`,
  subHeading1: 'What happens next',
  line2: 'The court will review your application and any evidence you have submitted. If your application is successful, your divorce will proceed withour a response from your partner. We will then tell you when you can apply for your conditional order.',
  line3: `We will email you within the next ${config.get('dates.applicationSubmittedOffsetDays')} days to let you know whether your application has been successful.`,
  returnToHub: 'Return to hub screen',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);

  return { ...translations };
};
