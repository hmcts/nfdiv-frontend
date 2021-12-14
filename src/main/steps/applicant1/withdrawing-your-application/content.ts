import { TranslationFn } from '../../../app/controller/GetController';
import { CommonContent } from '../../common/common.content';

const en = ({ isDivorce, partner, isJointApplication }: CommonContent) => ({
  title: `Withdrawing your ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}`,
  line1: `You have said you do not want to continue with your ${
    isDivorce ? 'divorce' : 'application to end your civil partnership'
  }. If you want to withdraw your application then you${
    isJointApplication ? ` and your ${partner}` : ''
  } need to fill out a separate <a class="govuk-link" href="https://www.gov.uk/government/publications/form-d11-application-notice">D11 form</a> and send it to the court. Details of where to send it are on the form.`,
  line2:
    'If you need help then you can contact the court using the details below. The support staff cannot give you legal advice.',
  exitLink: 'Exit service',
});

// @TODO translations
const cy = en;

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
  };
};
