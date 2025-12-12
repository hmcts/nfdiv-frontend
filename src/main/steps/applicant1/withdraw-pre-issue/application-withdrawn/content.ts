import { TranslationFn } from '../../../../app/controller/GetController';

const en = ({ isDivorce }) => ({
  title: 'Application Withdrawn',
  line1: `You have successfully withdrawn your ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  }.`,
  whatHappensNext: 'What happens next',
  whatHappensNextLine1:
    'We will refund the application fee within the next 30 days if the court confirms that you are due a refund.',
});

const cy: typeof en = ({ isDivorce }) => ({
  title: 'Application Withdrawn',
  line1: `You have successfully withdrawn your ${
    isDivorce ? 'divorce application' : 'application to end your civil partnership'
  }.`,
  whatHappensNext: 'What happens next',
  whatHappensNextLine1:
    'We will refund the application fee within the next 30 days if the court confirms that you are due a refund.',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language](content);
};
